/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_Submit",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_WorkflowProcessing" ],
  "name" : "General submit in workflow",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "ast_Brand" ],
  "allObjectTypesValid" : true,
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
  }, {
    "contract" : "WebUiContextBind",
    "alias" : "webUI",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,webUI) {
//submit in brnad WF without dialog. I want to generalise this rule.
//See if we can grab the wf and grab the state were in and then just always 'submit' with basic trigger message.


var selectedNodes = webUI.getSelection();

for (var i = 0; i < selectedNodes.size(); i++) {
	// Get brand
	var brand = selectedNodes.get(i);
	var triggerResult = brand.getTaskByID('wf_CreateNewBrand', 'Approve_BrandName').triggerByID('Submit','Triggered by Business rule');
	if (triggerResult.isRejectedByScript()) {
		log.info('Unable to move to next state: '+triggerResult.getScriptMessage());
		}
}
}