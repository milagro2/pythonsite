/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_DeleteVisualValidationRequiredLog",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_SetValuesAndLinkes" ],
  "name" : "Delete Visual Validation Required Log",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article", "prd_GiftBoxArticle" ],
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
    "alias" : "att_InformationToBeValidated",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_InformationToBeValidated",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_TIIVisualCheckGroupArticle",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_TIIVisualCheckGroupArticle",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_TIIVisualCheckGroupPack",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_TIIVisualCheckGroupPack",
    "description" : null
  }, {
    "contract" : "BusinessFunctionBindContract",
    "alias" : "bf_GetAllObjectsForAnArticle",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>bf_GetAllObjectsForAnArticle</BusinessFunction>\n</BusinessFunctionReference>\n",
    "description" : null
  }, {
    "contract" : "LoggerBindContract",
    "alias" : "log",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ptp_PartnerArticle",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ptp_PartnerArticle",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_InformationToBeValidatedLog",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_InformationToBeValidatedLog",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,att_InformationToBeValidated,att_TIIVisualCheckGroupArticle,att_TIIVisualCheckGroupPack,bf_GetAllObjectsForAnArticle,log,ptp_PartnerArticle,att_InformationToBeValidatedLog) {
var timsDataContainer = "dct_TIMSUpdateLog";
var allObjects = bf_GetAllObjectsForAnArticle.evaluate({"node" : node});
allObjects.add(node);
allObjects = allObjects.toArray();


function deleteDct(object,datacontainertype) {
	object.getDataContainerByTypeID(datacontainertype).getDataContainers().forEach(function(dct) {
		dct.deleteLocal();
		return true;
	});
}


node.getValue(att_InformationToBeValidated.getID()).deleteCurrent();
node.getValue(att_InformationToBeValidatedLog.getID()).deleteCurrent();
node.getValue(att_TIIVisualCheckGroupArticle.getID()).deleteCurrent();
node.getValue(att_TIIVisualCheckGroupPack.getID()).deleteCurrent();

for(var i in allObjects) {
	deleteDct(allObjects[i], timsDataContainer);
	allObjects[i].queryReferences(ptp_PartnerArticle).forEach(function(tradeItemRef) {
		var tradeItem = tradeItemRef.getTarget();
		deleteDct(tradeItem, timsDataContainer);
		return true;	
	});
}




}