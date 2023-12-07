/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "bc_HideRejectAndRemove",
  "type" : "BusinessCondition",
  "setupGroups" : [ "brg_WebUIConditions" ],
  "name" : "Hide Reject and Remove button in Workflow",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ ],
  "allObjectTypesValid" : true,
  "runPrivileged" : true,
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
// in any create workflow for these states return true, so the button is visible
var workflows = ["wf_CreateArticle", "wf_CreateArticleOther"];
var states = ["WaitForTradeItem", "CreatePUHierarchy", "CommercialEnrichment"]
var valid = true;
workflows.forEach(function (workflowId){
	states.forEach(function (stateId) {
		if (node.isInState(workflowId, stateId)) {
			valid = false;	
		}
	})
})
return false;
}