/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_CheckIfParallelComplete",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_ArticleMaintenanceActions" ],
  "name" : "Forward if parallel complete",
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
  }, {
    "contract" : "LoggerBindContract",
    "alias" : "log",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_ApprovalErrors",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ApprovalErrors",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_InformationToBeValidated",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_InformationToBeValidated",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,manager,log,att_ApprovalErrors,att_InformationToBeValidated) {
//Check if both parallels are complete 
var workflow = manager.getWorkflowHome().getWorkflowByID("wf_UpdateExistingArticle");
var logisticComplete = node.getTaskByID(workflow.getID(), "FinalLogValidation");
var commercialComplete = node.getTaskByID(workflow.getID(), "FinalCAValidation");

var approvalErrors = node.getValue(att_ApprovalErrors.getID()).getSimpleValue();



if(logisticComplete && commercialComplete && !approvalErrors) {
	logisticComplete.triggerLaterByID("complete", "Triggered since both parallels complete");
	commercialComplete.triggerLaterByID("complete", "Triggered since both parallels complete");
} else if (logisticComplete && commercialComplete && approvalErrors) {
	node.getValue(att_InformationToBeValidated.getID()).addValue("Validation failed, check error attribute.");
	commercialComplete.triggerLaterByID("Update", "Validation failed on logistic state, please check...");
}
}