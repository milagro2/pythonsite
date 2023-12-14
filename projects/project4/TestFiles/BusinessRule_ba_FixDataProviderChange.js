/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_FixDataProviderChange",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Fix Data Provider Change",
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
    "alias" : "ba_CreateTIOnPUWorkflowCreatePU",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessActionImpl",
    "value" : "ba_CreateTIOnPUWorkflowCreatePU",
    "description" : null
  }, {
    "contract" : "BusinessActionBindContract",
    "alias" : "ba_CreateNewTradeItem",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessActionImpl",
    "value" : "ba_CreateNewTradeItem",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,bfGetAllPackgingUnits,ba_CreateTIOnPUWorkflowCreatePU,ba_CreateNewTradeItem) {
var packagingUnits = bfGetAllPackgingUnits.evaluate({node:node}).toArray();
ba_CreateNewTradeItem.execute(node);
for (var x in packagingUnits){
	ba_CreateTIOnPUWorkflowCreatePU.execute(packagingUnits[x]);
}
}