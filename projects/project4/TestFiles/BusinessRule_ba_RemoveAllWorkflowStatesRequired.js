/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_RemoveAllWorkflowStatesRequired",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Remove All Workflow States Required",
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
    "contract" : "AttributeBindContract",
    "alias" : "att_RejectedForUserGroups",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_RejectedForUserGroups",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_WorkRequiredFromUserGroups",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_WorkRequiredFromUserGroups",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_WorkflowInstructions",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_WorkflowInstructions",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,att_RejectedForUserGroups,att_WorkRequiredFromUserGroups,att_WorkflowInstructions) {
/*On the creation of a new article all states are required this needs to be added to the attribute
 * Bindings:
 * rejectedForUserGroupsAtt --> Rejected For User Groups (att_RejectedForUserGroups)
 * workRequiredFromUserGroupsAtt --> Work Required From User Groups (att_WorkRequiredFromUserGroups)
 * workflowInstructionsAtt --> Workflow Instructions (att_WorkflowInstructions)
 */
node.getValue(att_RejectedForUserGroups.getID()).deleteCurrent();
node.getValue(att_WorkRequiredFromUserGroups.getID()).deleteCurrent();
node.getValue(att_WorkflowInstructions.getID()).deleteCurrent();
}