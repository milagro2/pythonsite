/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "bc_ShowRetryTIButton",
  "type" : "BusinessCondition",
  "setupGroups" : [ "brg_WebUIConditions" ],
  "name" : "Shows retry TIMS connection button on wait for TI state in UI",
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
// in any create Workflow for these states return true, so the button is visible
var workflows = ["wf_CreateArticle", "wf_CreateArticleOther"];
var states = ["WaitForTradeItem"]
var valid = false;
workflows.forEach(function (workflowId){
	states.forEach(function (stateId) {
		if (node.isInState(workflowId, stateId)) {
			valid = true;	
		}
	})
})
return valid;
}