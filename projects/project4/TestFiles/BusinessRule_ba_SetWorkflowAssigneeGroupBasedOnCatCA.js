/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SetWorkflowAssigneeGroupBasedOnCatCA",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_WorkflowProcessing" ],
  "name" : "Set Workflow Assignee Group Based on Category (Commercial Assistant)",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article", "prd_BundleArticle", "prd_GiftBoxArticle", "prd_PackagingUnitCase", "prd_PackagingUnitPack", "prd_PackagingUnitPallet" ],
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
    "alias" : "att_CommercialAssistentAssigneeGroup",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_CommercialAssistentAssigneeGroup",
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
exports.operation0 = function (node,workflow,att_CommercialAssistentAssigneeGroup,manager) {
/*This functionality will set the workflow task to the correct user group, as stated on the product category
 * Bindings:
 * commercialAssistentAssigneeGroupAtt --> Commercial Assistent Assignee Group (att_CommercialAssistentAssigneeGroup)
 */
//Get the user group using the attribute value 'att_CommercialAssistentAssigneeGroup', where the LOV value ID is equal to the user group ID
var userGroupID = node.getValue(att_CommercialAssistentAssigneeGroup.getID()).getLOVValue().getID();
var group = manager.getGroupHome().getGroupByID(userGroupID);
//Article creation - Create Packaging Hierarchy
if (node.getTaskByID(workflow.getID(),'CreatePUHierarchy')) {
	node.getTaskByID(workflow.getID(),'CreatePUHierarchy').reassign(group);
}
//Article creation - Populate Article from Trade Item Information
if (node.getTaskByID(workflow.getID(),'PupolateArticleFromTradeItemInformation')) {
	node.getTaskByID(workflow.getID(),'PupolateArticleFromTradeItemInformation').reassign(group);
}
//Article creation - Populate Packaging Unit from Trade Item Information
if (node.getTaskByID(workflow.getID(),'PopulatePUfromTradeItemInformation')) {
	node.getTaskByID(workflow.getID(),'PopulatePUfromTradeItemInformation').reassign(group);
}
//Article creation - Commercial enrichment
if (node.getTaskByID(workflow.getID(),'CommercialEnrichment')) {
	node.getTaskByID(workflow.getID(),'CommercialEnrichment').reassign(group);
}
//Article creation - Final Validation merchandising
if (node.getTaskByID(workflow.getID(),'FinalValidationMerchandising')) {
	node.getTaskByID(workflow.getID(),'FinalValidationMerchandising').reassign(group);
}

//Article maintenance - Manual Validation Commercial Assistant
if (node.getTaskByID(workflow.getID(),'ManualValidationCA')) {
	node.getTaskByID(workflow.getID(),'ManualValidationCA').reassign(group);
}
///Article maintenance - Validation of Trade Item changes
if (node.getTaskByID(workflow.getID(),'ValidationOfTradeItemChanges')) {
	node.getTaskByID(workflow.getID(),'ValidationOfTradeItemChanges').reassign(group);
}

///Packaging Unit creation - Populate Packaging Unit from Trade Item Information
if (node.getTaskByID(workflow.getID(),'PopulatePUfromTradeItemInformation')) {
	node.getTaskByID(workflow.getID(),'PopulatePUfromTradeItemInformation').reassign(group);
}
///Packaging Unit creation - Commercial Enrichment
if (node.getTaskByID(workflow.getID(),'CommercialEnrichment')) {
	node.getTaskByID(workflow.getID(),'CommercialEnrichment').reassign(group);
}

/// wf_Reject Asset - NewImageRequired
if (node.getTaskByID(workflow.getID(),'NewImageRequired')) {
	node.getTaskByID(workflow.getID(),'NewImageRequired').reassign(group);
}
}