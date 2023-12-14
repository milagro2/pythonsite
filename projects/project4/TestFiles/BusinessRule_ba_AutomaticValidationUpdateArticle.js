/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_AutomaticValidationUpdateArticle",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Automatic Validation Update Article",
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
exports.operation0 = function (node,att_InformationToBeValidated) {
var wfInstance = node.getWorkflowInstanceByID('wf_UpdateExistingArticle');
var infoLogLogistic = wfInstance.getSimpleVariable("logisticChanges");
var infoLogCommercial = wfInstance.getSimpleVariable("commercialChanges"); 

var task = node.getTaskByID('wf_UpdateExistingArticle', "AutoValidation");
if (task) {
  // var transition = (infoLogLogistic || infoLogCommercial) ? "AutoFalse" : "AutoTrue";
  var transition = "AutoFalse";
  task.triggerLaterByID(transition, "Triggered from BR");
}
}