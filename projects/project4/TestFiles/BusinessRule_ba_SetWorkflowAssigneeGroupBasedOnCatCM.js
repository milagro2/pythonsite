/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SetWorkflowAssigneeGroupBasedOnCatCM",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_WorkflowProcessing" ],
  "name" : "Set Workflow Assignee Group Based on Category (Category Manager)",
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
    "contract" : "ManagerBindContract",
    "alias" : "manager",
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
    "alias" : "att_CategoryManagerAssigneeGroup",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_CategoryManagerAssigneeGroup",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,manager,workflow,att_CategoryManagerAssigneeGroup) {
/*This functionality will set the workflow task to the correct user group, as stated on the product category
 * Bindings:
 * commercialAssistentAssigneeGroupAtt --> Commercial Assistent Assignee Group (att_CommercialAssistentAssigneeGroup)
 */
//Get the user group using the attribute value 'att_CommercialAssistentAssigneeGroup', where the LOV value ID is equal to the user group ID
var userGroupID = node.getValue(att_CategoryManagerAssigneeGroup.getID()).getLOVValue().getID();
var group = manager.getGroupHome().getGroupByID(userGroupID);
//Article creation - Sales price enrichment
if (node.getTaskByID(workflow.getID(),'SalesPriceEnrichment')) {
	node.getTaskByID(workflow.getID(),'SalesPriceEnrichment').reassign(group);
}
}