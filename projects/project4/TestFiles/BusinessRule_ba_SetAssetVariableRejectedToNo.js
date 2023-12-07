/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SetAssetVariableRejectedToNo",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_AssetRelatedActions" ],
  "name" : "Set Asset Variable Rejected To No",
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
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,manager) {
if (node.isInWorkflow('wf_CreateArticle')) {
	 var wf = manager.getWorkflowHome().getWorkflowByID('wf_CreateArticle');
		node.getWorkflowInstance(wf).setSimpleVariable('ImageRejected','YES');
}

if (node.isInWorkflow('wf_CreateArticleOther')) {
	var wf = manager.getWorkflowHome().getWorkflowByID('wf_CreateArticleOther');
		node.getWorkflowInstance(wf).setSimpleVariable('ImageRejected','YES');
}
}