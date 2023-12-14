/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_StartRejectWorkflowAPS",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_AssetRelatedActions" ],
  "name" : "Start Reject Workflow APS",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article", "prd_GiftBoxArticle", "prd_PackagingUnitCase", "prd_PackagingUnitPack", "prd_PackagingUnitPallet" ],
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
    "contract" : "TransitionEvaluationBindContract",
    "alias" : "transition",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "LoggerBindContract",
    "alias" : "log",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "CurrentWorkflowBindContract",
    "alias" : "wf",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,transition,log,manager,wf) {
var message = transition.getMessage();
var rejectWf = node.startWorkflowByID('wf_RejectAsset', message);

if (message) {
	var rejectWfi = node.getWorkflowInstanceByID('wf_RejectAsset').setSimpleVariable('comment', message);
} else {
	var rejectWfi = node.getWorkflowInstanceByID('wf_RejectAsset').setSimpleVariable('comment', 'No rejection notes entered');
}
}
/*===== business rule plugin definition =====
{
  "pluginId" : "SetWorkflowVariableBusinessAction",
  "parameters" : [ {
    "id" : "FromAttribute",
    "type" : "com.stibo.core.domain.Attribute",
    "value" : null
  }, {
    "id" : "FromWorkflow",
    "type" : "com.stibo.core.domain.state.unstable.stateflow.StateFlow",
    "value" : null
  }, {
    "id" : "FromWorkflowVariableName",
    "type" : "java.lang.String",
    "value" : ""
  }, {
    "id" : "TextValue",
    "type" : "java.lang.String",
    "value" : "APS"
  }, {
    "id" : "ToWorkflow",
    "type" : "com.stibo.core.domain.state.unstable.stateflow.StateFlow",
    "value" : "wf_RejectAsset"
  }, {
    "id" : "ToWorkflowVariableName",
    "type" : "java.lang.String",
    "value" : "RejectedBy"
  } ],
  "pluginType" : "Operation"
}
*/

/*===== business rule plugin definition =====
{
  "pluginId" : "RemoveObjectFromWorkflowAction",
  "parameters" : [ {
    "id" : "Workflow",
    "type" : "com.stibo.core.domain.state.Workflow",
    "value" : null
  }, {
    "id" : "Message",
    "type" : "java.lang.String",
    "value" : "Removed from APS workflow"
  } ],
  "pluginType" : "Operation"
}
*/
