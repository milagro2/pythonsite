/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SetWorkflowVariable",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_WorkflowProcessing" ],
  "name" : "Set Workflow Variable to 'controleer TIMS' after deadline is exceeded",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article", "prd_GiftBoxArticle" ],
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
//This is put as a deadline/escalation BA in the wait for TI state of the create WF
//It sets the TIMSStatus workflow Variable after being in that state for one hour. 
node.getWorkflowInstanceByID("wf_CreateArticle") && node.getWorkflowInstanceByID("wf_CreateArticle").setSimpleVariable("TIMSStatus", "GLN GTIN combinatie niet bekend in PIM, controleer en probeer opnieuw");
node.getWorkflowInstanceByID("wf_CreateArticleOther") && node.getWorkflowInstanceByID("wf_CreateArticleOther").setSimpleVariable("TIMSStatus", "TIMSStatus", "GLN GTIN combinatie niet bekend in PIM, controleer en probeer opnieuw");
}