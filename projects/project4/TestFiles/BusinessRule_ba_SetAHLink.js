/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SetAHLink",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_SetValuesAndLinkes" ],
  "name" : "Set AH Link",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article", "prd_BundleArticle", "prd_GiftBoxArticle", "prd_PackagingUnitCase", "prd_PackagingUnitPack", "prd_PackagingUnitPallet" ],
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
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node) {
// Get article
var article;
if (node.getObjectType().getID() == 'prd_PackagingUnitPack' ||
    node.getObjectType().getID() == 'prd_PackagingUnitCase' ||
    node.getObjectType().getID() == 'prd_PackagingUnitPallet') {
    article = node.getParent();
} else {
    article = node;
}
	
// If Bundle, early exit
if (article.getObjectType().getID() == 'prd_BundleArticle') {
	article.getValue("att_AHLink").setLOVValueByID('0');
	return;
}

// Get packagingUnits
var packagingUnits = article.getChildren().toArray();

// For each packagingUnit
packagingUnits.forEach((packagingUnit) => {
    logger.info('Checking ' + packagingUnit.getID())

    // Always set AH link to false
    packagingUnit.getValue("att_AHLink").setLOVValueByID('0');
   
    // If not Wine/Sparklink/Port/Sherry, ignore
    var productType = article.getValue("att_ProductType").getSimpleValue();
    if (productType != 'Wijn' && productType != 'Mousserend' && productType != 'Port' && productType != 'Sherry') {
        logger.info('Not a Wine/Sparklink/Port/Sherry');
        return;
    }

    // If not DC, ignore
    if (packagingUnit.getValue('att_Stroom').getSimpleValue() != 'DC') {
        logger.info('Not DC. Ignoring');
        return;
    }

    // If not consumer unit, ignore
    var operationalPackingRoles = packagingUnit.getValue("att_OperationalPackagingRoles").getValues().toArray();
    var isConsumerUnit = false;
    operationalPackingRoles.forEach((operationalRole) => {
        if (operationalRole.getID().equals('isTradeItemAConsumerUnit')) {
            isConsumerUnit = true;
        }
    });
    if (!isConsumerUnit) {
        logger.info('Not consumer. Ignoring');
        return;
    }

    // Set AH link true
    logger.info('Set AH Link true');
    packagingUnit.getValue("att_AHLink").setLOVValueByID('-1');
});
}