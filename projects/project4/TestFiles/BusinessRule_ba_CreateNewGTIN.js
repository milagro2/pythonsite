/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_CreateNewGTIN",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Create New GTIN",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article", "prd_GiftBoxArticle", "prd_PackagingUnitCase", "prd_PackagingUnitEach", "prd_PackagingUnitPack", "prd_PackagingUnitPallet", "prd_TradeItem" ],
  "allObjectTypesValid" : false,
  "runPrivileged" : true,
  "onApprove" : "Never",
  "dependencies" : [ ]
}
*/
/*===== business rule plugin definition =====
{
  "pluginId" : "JavaScriptBusinessActionWithBinds",
  "binds" : [ {
    "contract" : "CurrentObjectBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_GlobalTradeIdentificationNumber",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_GlobalTradeIdentificationNumber",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_PriceLookUp",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_PriceLookUp",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_MainIndicator",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_MainIndicator",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_ValidityStartDate",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ValidityStartDate",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_GlobalTradeIdentificationNumbers",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_GlobalTradeIdentificationNumbers",
    "description" : null
  }, {
    "contract" : "EntityBindContract",
    "alias" : "ExternalGTINS",
    "parameterClass" : "com.stibo.core.domain.impl.entity.FrontEntityImpl$$Generated$$12",
    "value" : "ExternalGTINS",
    "description" : null
  }, {
    "contract" : "EntityBindContract",
    "alias" : "InternalGTINS",
    "parameterClass" : "com.stibo.core.domain.impl.entity.FrontEntityImpl$$Generated$$12",
    "value" : "InternalGTINS",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "ent_GTIN",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "ent_GTIN",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_PackagingUnitPallet",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_PackagingUnitPallet",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,manager,att_GlobalTradeIdentificationNumber,att_PriceLookUp,att_MainIndicator,att_ValidityStartDate,ref_GlobalTradeIdentificationNumbers,ExternalGTINS,InternalGTINS,ent_GTIN,prd_PackagingUnitPallet) {
/**
 * This business rule should can be used to create a
 * new GTIN entity for any node that has a GTIN attribute.
 * Examples are : Article, Giftbox, Pack, Case, Pallet etc..
 *
 * There is a typescript version of this rule at
 * https://github.com/RoyalAholdDelhaize/gall-step/blob/main/step-leap/src/business-rules/ba_CreateNewGTIN.ts
 * please let Kobus know if you make changes to this rule.
 */
var nodeType = node.getObjectType().getID();
var gtin = node.getValue(att_GlobalTradeIdentificationNumber.getID()).getSimpleValue();
var plu = node.getValue(att_PriceLookUp.getID()).getSimpleValue();
if (!gtin) {
    if (plu) {
        // If a PLU is used fail silently.
        return;
    }
    else {
        // Otherwise throw an error
        throw new Error('Business action was run without a GTIN or PLU attribute.');
    }
}
var gtinEntityID = 'GTIN_' + gtin;
// Pad GTIN & update attribute
gtin = gtin.padStart(14, '0');
node.getValue(att_GlobalTradeIdentificationNumber.getID()).setSimpleValue(gtin);
// Find GTIN entity
var gtinEntity = manager.getEntityHome().getEntityByID(gtinEntityID);
// If entity does not exist, create it
if (!gtinEntity) {
    logger.info('No entity found, creating new entity with id : ' + gtinEntityID);
    var root = nodeType.equals(prd_PackagingUnitPallet.getID()) ? InternalGTINS : ExternalGTINS;
    gtinEntity = root.createEntity(gtinEntityID, ent_GTIN);
    gtinEntity.setName(gtin);
    gtinEntity.getValue(att_GlobalTradeIdentificationNumber.getID()).setSimpleValue(gtin);
}
// Collect all the existing GTIN references
//Bob - 30-10-23: 
// If we have the time we should expand this to ignore the entitiies references that are false. They could be reused.
// also i think this else statement is incorrect: the node gets here when the gtin of the gtinobject is not the same as the gtin of the tradeitem that were trying to create a Pu for.
// error should be something like: GTIN entity is linked improperly: please contact your favorite tech person

gtinEntity.queryReferencedBy(ref_GlobalTradeIdentificationNumbers).forEach(function (reference) {
    var sourceObject = reference.getSource().getObjectType().getID();
    var sourceEan = reference.getSource().getValue(att_GlobalTradeIdentificationNumber.getID()).getSimpleValue();
    if (sourceEan == gtin) {
        if ((nodeType == 'prd_Article' && (sourceObject != 'prd_PackagingUnitEach' || sourceObject != 'prd_TradeItem')) ||
        	  (nodeType == 'prd_GiftboxArticle' && (sourceObject != 'prd_PackagingUnitEach' || sourceObject != 'prd_TradeItem')) ||
            (nodeType == 'prd_PackagingUnitEach' && (sourceObject != 'prd_Article' || sourceObject != 'prd_TradeItem')) ||
            (nodeType == 'prd_PackagingUnitCase' && sourceObject != 'prd_TradeItem') ||
            (nodeType == 'prd_PackagingUnitPack' && sourceObject != 'prd_TradeItem') ||
            (nodeType == 'prd_PackagingUnitPallet' && sourceObject != 'prd_TradeItem')) {
            throw new Error("This GTIN (".concat(gtin, ") is not allowed to be created on this node (").concat(nodeType, "). Because it is already used by an ").concat(sourceObject));
        }
    }
    else {
        throw new Error("This GTIN (".concat(gtin, ") is not allowed to be created on this node (").concat(nodeType, "). Because it is already used by an ").concat(sourceObject));
    }
    return true;
});
// Reference GTIN
try {
    var reference = node.createReference(gtinEntity, ref_GlobalTradeIdentificationNumbers);
    reference.getValue(att_MainIndicator.getID()).setSimpleValue(true);
    var today = new Date().toISOString().split('T')[0];
    reference.getValue(att_ValidityStartDate.getID()).setSimpleValue(today);
}
catch (error) {
    if (error.toString().includes('TargetAlreadyReferencedException')) {
        logger.info('Target Already Referenced..');
    }
    else {
        throw error;
    }
}
}