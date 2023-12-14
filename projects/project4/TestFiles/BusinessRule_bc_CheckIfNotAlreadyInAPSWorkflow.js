/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "bc_CheckIfNotAlreadyInAPSWorkflow",
  "type" : "BusinessCondition",
  "setupGroups" : [ "brg_AssetRelatedConditions" ],
  "name" : "Check If Not Already In APS Workflow",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article", "prd_BundleArticle", "prd_GiftBoxArticle" ],
  "allObjectTypesValid" : false,
  "runPrivileged" : false,
  "onApprove" : "Never",
  "dependencies" : [ ]
}
*/
/*===== business rule plugin definition =====
{
  "pluginId" : "JavaScriptBusinessConditionWithBinds",
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
if (!(node.isInWorkflow('wf_CreateArticle') || node.isInWorkflow('wf_CreateArticleOther') ||node.isInWorkflow('wf_RejectAsset')||node.isInWorkflow('wf_AddPrimaryAsset'))) {
	return true;
}
return false;
}