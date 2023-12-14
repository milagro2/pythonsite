/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_AcceptCurrentChangesCommercial",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_ArticleMaintenanceActions" ],
  "name" : "Accept Current Changes Commercial (Web UI)",
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
    "contract" : "BusinessActionBindContract",
    "alias" : "ba_ValidateInUpdateWorkflow",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessActionImpl",
    "value" : "ba_ValidateInUpdateWorkflow",
    "description" : null
  }, {
    "contract" : "WebUiContextBind",
    "alias" : "web",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,manager,log,ba_ValidateInUpdateWorkflow,web) {
var selectedNodes = web.getSelection();

if (selectedNodes.size() == 0) {
	selectedNodes.add(node);
}

for(var i = 0; i < selectedNodes.size(); i++) {
    node = selectedNodes.get(i);
	
	ba_ValidateInUpdateWorkflow.execute(node);
	
	var workflow = manager.getWorkflowHome().getWorkflowByID("wf_UpdateExistingArticle");
	var commercialTask = node.getTaskByID(workflow.getID(), "ManualValidationCA");
	var wfi = node.getWorkflowInstanceByID("wf_UpdateExistingArticle");
	var state = workflow.getStateByID('ManualValidationCA');
	
	
	if(commercialTask) {
		var trigger = commercialTask.triggerByID("No_Further_Updates_Required", "Current changes accepted from Web UI");
		log.info("trigger result " + trigger.isRejectedByScript());
		if(trigger.isRejectedByScript() == false) {
			var forwardScreenID = 'Workflow_Tasklist_UpdateFinalValidation_Commercial';
			log.info("Forwarding to.... " + forwardScreenID);
			web.navigate(forwardScreenID, null, state);
		}
	}
}
}