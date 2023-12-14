/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_ChangeTradeItemGLNUpdates",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Change Trade Item for GLN Updates",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article", "prd_GiftBoxArticle" ],
  "allObjectTypesValid" : false,
  "runPrivileged" : false,
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
    "contract" : "BusinessFunctionBindContract",
    "alias" : "bfGetAllPackgingUnits",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>bfGetAllPackgingUnits</BusinessFunction>\n</BusinessFunctionReference>\n",
    "description" : null
  }, {
    "contract" : "BusinessActionBindContract",
    "alias" : "ba_CreateNewTradeItem",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessActionImpl",
    "value" : "ba_CreateNewTradeItem",
    "description" : null
  }, {
    "contract" : "BusinessActionBindContract",
    "alias" : "ba_CreateTIOnPUWorkflowCreatePU",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessActionImpl",
    "value" : "ba_CreateTIOnPUWorkflowCreatePU",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ptp_PartnerArticle",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ptp_PartnerArticle",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,bfGetAllPackgingUnits,ba_CreateNewTradeItem,ba_CreateTIOnPUWorkflowCreatePU,ptp_PartnerArticle) {
var tiReferences = node.queryReferences(ptp_PartnerArticle).asList(10);
if (tiReferences.size() > 0){
	node.queryReferences(ptp_PartnerArticle).forEach(function(tiReference){
		tiReference.delete();
		return true;
	});
}
ba_CreateNewTradeItem.execute(node);
var packagingUnits = bfGetAllPackgingUnits.evaluate({node:node}).toArray();
for (var x in packagingUnits){
	var packagingUnit = packagingUnits[x];
	var tiPUReferences = packagingUnit.queryReferences(ptp_PartnerArticle).asList(10);
	if (tiPUReferences.size() > 0){
		packagingUnit.queryReferences(ptp_PartnerArticle).forEach(function(tiPUReference){
			tiPUReference.delete();
			return true;
		});
	}
	ba_CreateTIOnPUWorkflowCreatePU.execute(packagingUnit);
}
}