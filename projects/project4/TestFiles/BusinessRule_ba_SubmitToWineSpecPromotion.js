/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SubmitToWineSpecPromotion",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_WorkflowProcessing" ],
  "name" : "Submit to Wine Specialist if Promotion",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article" ],
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
    "alias" : "att_WorkflowPriority",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_WorkflowPriority",
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
exports.operation0 = function (node,att_WorkflowPriority,manager) {
/*var wf = manager.getWorkflowHome().getWorkflowByID("wf_CreateArticle");
var tasks = node.getWorkflowInstance(wf).getTasks().toArray();
for (var x in tasks){
	log.info(tasks[x].getState());
}*/
if (node.getValue(att_WorkflowPriority.getID()).getValue() == 'Promotion') {
	log.info('Promotion');
	if (node.isInState('wf_CreateArticle', 'IsItPromotion')) {
		log.info('Trigger Promotion');
	var triggerResult = node.getTaskByID('wf_CreateArticle','IsItPromotion').triggerLaterByID('Promotion','Promotion item, triggered by Business rule');
	}
} else {
	if (node.isInState('wf_CreateArticle', 'IsItPromotion')) {
	var triggerResult = node.getTaskByID('wf_CreateArticle','IsItPromotion').triggerLaterByID('Submit','Requires Copywriter, triggered by Business rule');
	}
}
}