/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SkipMaintenanceState",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_ArticleMaintenanceActions" ],
  "name" : "Skip maintenance state",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article", "prd_GiftBoxArticle" ],
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
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,manager) {
var workflow = manager.getWorkflowHome().getWorkflowByID("wf_UpdateExistingArticle");
var wfInstance = node.getWorkflowInstance(workflow)

var commercialChanges = wfInstance.getSimpleVariable("commercialChanges");
var logisticChanges = wfInstance.getSimpleVariable("logisticChanges");

// If there are no commercial changes
if (!commercialChanges) {
	var task = node.getTaskByID(workflow.getID(), "ManualValidationCA");
	if(task) { 
		log.info("Triggering forward commercialChanges");
		task.triggerLaterByID("No_Further_Updates_Required", "Triggered since no commercial changes")
	};
}

// If there are no logistics changes
if (!logisticChanges) {
	var task = node.getTaskByID(workflow.getID(), "ManualValidationLog");
	if(task) {
		log.info("Triggering forward logisticChanges");
		task.triggerLaterByID("No_Further_Updates_Required", "Triggered since no logistic changes ")
	};
}
}