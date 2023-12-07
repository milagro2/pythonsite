/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SetWorkflowPriorityBasedOnValue",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_WorkflowProcessing" ],
  "name" : "Set Workflow Priority Based on Value",
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
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_GlobalTradeIdentificationNumber",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_GlobalTradeIdentificationNumber",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,att_WorkflowPriority,manager,att_GlobalTradeIdentificationNumber) {
var workflowInstanceArticle = node.getWorkflowInstanceByID('wf_CreateArticle');
var workflowInstancePU = node.getWorkflowInstanceByID('wf_CreatePU');
var workflowInstanceArticleOther = node.getWorkflowInstanceByID('wf_CreateArticleOther');
if (workflowInstanceArticle) {
	var tasks = workflowInstanceArticle.getTasks().toArray();
} else {
	if (workflowInstancePU) {
		var tasks = workflowInstancePU.getTasks().toArray();
	} else {
		if (workflowInstanceArticleOther) {
			var tasks = workflowInstanceArticleOther.getTasks().toArray();
		}
	}
}

var valueID;
if (node.getValue(att_WorkflowPriority.getID()) && node.getValue(att_WorkflowPriority.getID()).getSimpleValue()) {
	valueID = node.getValue(att_WorkflowPriority.getID()).getID();
} else {
	valueID = 'Worp';
}
for (var x in tasks) {
	tasks[x].setStatusFlagByID(valueID);
	logger.info('SetWorkflowPrio/done');
}
}