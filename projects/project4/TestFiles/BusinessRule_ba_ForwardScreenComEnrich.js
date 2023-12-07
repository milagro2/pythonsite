/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_ForwardScreenComEnrich",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_AssetRelatedActions" ],
  "name" : "Forward Screen Commercial Enrichment",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ ],
  "allObjectTypesValid" : true,
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
    "contract" : "WebUiContextBind",
    "alias" : "web",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,web) {
var parent = node.getParent();
	if (parent.isInWorkflow('wf_CreateArticle')) {
		var workflowInstance = parent.getWorkflowInstanceByID('wf_CreateArticle');
		var workflow = workflowInstance.getWorkflow();
		var state = workflow.getStateByID('CommercialEnrichment');
		web.navigate('Workflow_CreateArticle_CommercialEnrichment', parent, state);
	} else if (parent.isInWorkflow('wf_CreateArticleOther')) {
		var workflowInstance = parent.getWorkflowInstanceByID('wf_CreateArticleOther');
		var workflow = workflowInstance.getWorkflow();
		var state = workflow.getStateByID('CommercialEnrichment');
		web.navigate('Workflow_CreateArticle_CommercialEnrichment', parent, state);
	}
}