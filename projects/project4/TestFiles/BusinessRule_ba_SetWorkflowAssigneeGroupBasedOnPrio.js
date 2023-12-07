/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SetWorkflowAssigneeGroupBasedOnPrio",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_WorkflowProcessing" ],
  "name" : "Set Workflow Assignee Group Based on Workflow Priority",
  "description" : null,
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
    "contract" : "CurrentWorkflowBindContract",
    "alias" : "workflow",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_WorkflowPriority",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_WorkflowPriority",
    "description" : null
  }, {
    "contract" : "UserGroupBindContract",
    "alias" : "Wine_Specialist",
    "parameterClass" : "com.stibo.core.domain.impl.GroupImpl",
    "value" : "Wine_Specialist",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,workflow,att_WorkflowPriority,Wine_Specialist) {
/*
 * The functionality sets the assignee of the workflow task when the state commercial enrichment to the wine specialist
 * if the workflow priority is "promotion"
 *
 */
var priority = node.getValue(att_WorkflowPriority.getID()).getSimpleValue();
if (priority == 'Promotion') {
	node.getTaskByID(workflow.getID(),'AddCommercialText').reassign(Wine_Specialist);
}
}