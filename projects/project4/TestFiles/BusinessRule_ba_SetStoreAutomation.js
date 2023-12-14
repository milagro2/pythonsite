/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SetStoreAutomation",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Set Store Automation",
  "description" : "Set store automation attribute to yes when conditions apply",
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
    "alias" : "att_StoreAutomation",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_StoreAutomation",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_OperationalPackagingRoles",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_OperationalPackagingRoles",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,att_GlobalTradeIdentificationNumber,att_PriceLookUp,att_StoreAutomation,att_OperationalPackagingRoles) {
var article;
if (node.getObjectType().getID() == 'prd_PackagingUnitPack' || 
	node.getObjectType().getID() == 'prd_PackagingUnitCase'||
	node.getObjectType().getID() == 'prd_PackagingUnitPallet') {
	article = node.getParent();
} else {
	article = node;
}

// Set VVLV Roles
article.queryChildren().forEach(function(packagingUnit){
	var gtin = article.getValue(att_GlobalTradeIdentificationNumber.getID()).getSimpleValue();
	var plu =  article.getValue(att_PriceLookUp.getID()).getSimpleValue();

	var isConsumerUnit = false;
	var operationalRoles = packagingUnit.getValue(att_OperationalPackagingRoles.getID()).getValues().toArray();
	for (var x in operationalRoles){
		if (operationalRoles[x].getID().equals('isTradeItemAConsumerUnit')){
			isConsumerUnit = true; 
		}
	}

	var storeAutomationValue = (gtin != null || plu != null) && isConsumerUnit ? "-1" : "0";
	packagingUnit.getValue(att_StoreAutomation.getID()).setLOVValueByID(storeAutomationValue);
	return true;
});
}