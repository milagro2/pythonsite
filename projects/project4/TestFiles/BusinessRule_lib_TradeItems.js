/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "lib_TradeItems",
  "type" : "BusinessLibrary",
  "setupGroups" : [ "brg_Libraries" ],
  "name" : "TradeItems",
  "description" : null,
  "scope" : null,
  "validObjectTypes" : [ ],
  "allObjectTypesValid" : false,
  "runPrivileged" : false,
  "onApprove" : null,
  "dependencies" : [ ]
}
*/
/*===== business rule plugin definition =====
{
  "pluginId" : "JavaScriptBusinessLibrary",
  "binds" : [ ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
function getObjectTypeFromDescriptor(descriptor) {
  var map = {
    'BASE_UNIT_OR_EACH': 'prd_PackagingUnitEach',
    'PACK_OR_INNER_PACK': 'prd_PackagingUnitPack',
    'CASE': 'prd_PackagingUnitCase',
    'DISPLAY_SHIPPER': 'prd_PackagingUnitPallet',
    'PALLET': 'prd_PackagingUnitPallet',
  }

  var result = map[descriptor];
  if (!result) {
    throw new Error('No object type found for descriptor : ' + descriptor);
  }
  return result;
}
const internalUtils = {
  getObjectTypeFromDescriptor: getObjectTypeFromDescriptor
}

function init(manager) {
  // Homes
  var homeBusinessRuleHome = manager.getHome(com.stibo.core.domain.businessrule.BusinessRuleHome);
  var homeReferenceTypeHome = manager.getReferenceTypeHome();

  // Business Actions
  var ba_SetShelfCard = homeBusinessRuleHome.getBusinessActionByID('ba_SetShelfCard');
  var ba_SetCreationDate = homeBusinessRuleHome.getBusinessActionByID('ba_SetCreationDate');
  var ba_CreateNewGTIN = homeBusinessRuleHome.getBusinessActionByID('ba_CreateNewGTIN');
  var ba_CopyTIInformation = homeBusinessRuleHome.getBusinessActionByID('ba_CopyTIInformation');

  // Store required binds here
  var ptp_PartnerArticle = homeReferenceTypeHome.getReferenceTypeByID('ptp_PartnerArticle');
  var ref_NextLowerLevel = homeReferenceTypeHome.getReferenceTypeByID('ref_NextLowerLevel');
  var att_TradeItemUnitDescriptor = 'att_TradeItemUnitDescriptor';
  var att_QuantityOfNextLowerLevel = 'att_QuantityOfNextLowerLevel';
  var att_POSDescription = 'att_POSDescription';
  var att_GlobalTradeIdentificationNumber = 'att_GlobalTradeIdentificationNumber';
  var prd_Article = 'prd_Article';
  var prd_GiftBoxArticle = 'prd_GiftBoxArticle';

  /**
   * Given a trade item, return the smallest packaging unit in the trade item hierarchy.
   *
   * @param {any} tradeItem - The trade item for which to retrieve the hierarchy.
   * @returns {any} Trade item representing the smallest packaging unit.
   */
  function getSmallestPackagingUnit(tradeItem) {
    var packagingUnitNext = tradeItem;
    var packagingUnitSmallest = tradeItem;
    var safety = 1000;
    while (packagingUnitNext && safety > 0) {
      safety -= 1;

      packagingUnitSmallest = packagingUnitNext;
      packagingUnitNext = null;

      packagingUnitSmallest.queryReferencedBy(ref_NextLowerLevel).forEach((reference) => {
        var source = reference.getTarget();
        packagingUnitNext = source;
        return true;
      });
    }

    return packagingUnitSmallest;
  }

  /**
   * Retrieves the TIMS (Trade Item Management System) hierarchy for a given trade item.
   *
   * @param {any} tradeItem - The trade item for which to retrieve the hierarchy.
   * @returns {any} An object representing the TIMS hierarchy, containing the trade item node and its parents.
   */
  function getTIMSHierarchyForTradeItem(tradeItem) {
    // Get smallest packaging unit
    var packagingUnitSmallest = getSmallestPackagingUnit(tradeItem);

    logger.info(packagingUnitSmallest)

    // Define function for building hierarchy
    function getParentTree(tradeItem) {
      var parents = [];
      tradeItem.queryReferencedBy(ref_NextLowerLevel).forEach((reference) => {
        var source = reference.getSource();
        parents.push(getParentTree(source));
        return true;
      });

      return {
        node: tradeItem,
        node_type: tradeItem.getValue(att_TradeItemUnitDescriptor).getSimpleValue(),
        parents: parents
      };
    }

    return getParentTree(packagingUnitSmallest);
  }


  /**
   * Retrieves the trade item associated with an article.
   *
   * @param {any} article - The article object for which to retrieve the trade item.
   * @returns {any} - The trade item object associated with the article.
   * @throws {Error} - Throws an error if no trade item is found or if the trade item is not an "each".
   */
  function getTradeItemForArticle(article) {
    var tradeItem = null;
    article.getReferences(ptp_PartnerArticle).forEach((reference) => {
      tradeItem = reference.getTarget();
      return false;
    });

    return tradeItem;
  }


  /**
   * Retrieves the trade item associated with an article.
   *
   * @param {any} tradeItem - The tradeItem for which to create a PU the trade item.
   * @returns {void} - The trade item object associated with the article.
   */
  function createPUFromTradeItem(tradeItem, article) {
    var tradeItemUnitDescriptor = tradeItem.getValue(att_TradeItemUnitDescriptor).getSimpleValue();
    var tradeItemGTIN = tradeItem.getValue(att_GlobalTradeIdentificationNumber).getSimpleValue();
    var objectType = internalUtils.getObjectTypeFromDescriptor(tradeItemUnitDescriptor);
    var packagingUnit = article.createProduct('', objectType);

    packagingUnit.setName(tradeItem.getName());
    packagingUnit.getValue(att_GlobalTradeIdentificationNumber).setSimpleValue(tradeItemGTIN);
    packagingUnit.getValue(att_POSDescription).setSimpleValue(tradeItem.getName().toUpperCase().substring(0, 24));
    packagingUnit.createReference(tradeItem, ptp_PartnerArticle);
    ba_SetShelfCard.execute(packagingUnit);
    ba_SetCreationDate.execute(packagingUnit);
    ba_CreateNewGTIN.execute(packagingUnit);
    ba_CopyTIInformation.execute(tradeItem);

    // Relinking code
    tradeItem.queryReferences(ref_NextLowerLevel).forEach(function (reference) {
      var puLowerLevel = null;
      reference.getTarget().queryReferencedBy(ptp_PartnerArticle).forEach(function (referenceTradeItem) {
        if (referenceTradeItem.getSource().getObjectType().getID() != prd_Article && referenceTradeItem.getSource().getObjectType().getID() != prd_GiftBoxArticle) {
          puLowerLevel = referenceTradeItem.getSource();
        }
        return true;
      });

      if (puLowerLevel) {
        var quantity = reference.getValue(att_QuantityOfNextLowerLevel).getSimpleValue();
        var nextLowerLevel = packagingUnit.createReference(puLowerLevel, ref_NextLowerLevel);
        nextLowerLevel.getValue(att_QuantityOfNextLowerLevel).setSimpleValue(quantity);
      }
      return true;
    });
  }


  return {
    getTIMSHierarchyForTradeItem: getTIMSHierarchyForTradeItem,
    getTradeItemForArticle: getTradeItemForArticle,
    createPUFromTradeItem: createPUFromTradeItem
  }
}

/*===== business library exports - this part will not be imported to STEP =====*/
exports.getObjectTypeFromDescriptor = getObjectTypeFromDescriptor
exports.internalUtils = internalUtils
exports.getObjectTypeFromDescriptor = getObjectTypeFromDescriptor
exports.getObjectTypeFromDescriptor = getObjectTypeFromDescriptor
exports.init = init