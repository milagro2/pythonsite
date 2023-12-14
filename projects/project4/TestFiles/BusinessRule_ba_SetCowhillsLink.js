/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SetCowhillsLink",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Set Cowhills Link",
  "description" : "Set to yes for all PU's with operational role \"verkoop\" when att_StoreAutomation is set to yes and GTIN or PLU is available",
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article", "prd_BundleArticle", "prd_GiftBoxArticle" ],
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
    "alias" : "att_OperationalPackagingRoles",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_OperationalPackagingRoles",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_CowhillsLink",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_CowhillsLink",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_StoreAutomation",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_StoreAutomation",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,att_GlobalTradeIdentificationNumber,att_PriceLookUp,att_OperationalPackagingRoles,att_CowhillsLink,att_StoreAutomation) {
var ObjectType= node.getObjectType().getID();

if (ObjectType == 'prd_Article' || ObjectType == 'prd_GiftBoxArticle'){
	node.queryChildren().forEach(function(child){
	setCowhillsLink(child);
	return true;		
	});
return;
}

//If Bundle
setCowhillsLink(node);




 
 function setCowhillsLink(node){
	var storeAutomation = node.getValue(att_StoreAutomation.getID()).getLOVValue();
		if (!storeAutomation){
			return logger.info("There is no Store Automation set for " + node.getID());
		}
	 	
	 	var storeAutomationID = storeAutomation.getID()
		if (storeAutomationID == "-1") {
			node.getValue(att_CowhillsLink.getID()).setLOVValueByID("-1");	
			logger.info('Setting Cowhillslink to Yes');			
		} 	else {
			node.getValue(att_CowhillsLink.getID()).setLOVValueByID("0");
			logger.info('Setting Cowhillslink to No');	
	 	}
 }
}