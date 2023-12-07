/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_BulkUpdateZeroStockInformation",
  "type" : "BusinessAction",
  "setupGroups" : [ "sg_BulkUpdates" ],
  "name" : "ba_BulkUpdateZeroStockInformation",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article" ],
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
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node) {
var article = node;

// Skip if not in workflow.
if (!article.isInWorkflow('wf_ZeroStockInformationWorkflow')) {
    return false;
}

// Get workflow instance
var workflowInstance = article.getWorkflowInstanceByID('wf_ZeroStockInformationWorkflow');

// Get attribute contents
var currentContents = article.getValue("att_ZeroStockInformationChanges").getSimpleValue();

// Set workflow variable
workflowInstance.setSimpleVariable("ZeroStockChanges", currentContents);

}