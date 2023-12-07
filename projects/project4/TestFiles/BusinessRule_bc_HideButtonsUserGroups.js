/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "bc_HideButtonsUserGroups",
  "type" : "BusinessCondition",
  "setupGroups" : [ "brg_WebUIConditions" ],
  "name" : "Hide buttons for usergroups",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ ],
  "allObjectTypesValid" : true,
  "runPrivileged" : false,
  "onApprove" : "Never",
  "dependencies" : [ ]
}
*/
/*===== business rule plugin definition =====
{
  "pluginId" : "JavaScriptBusinessConditionWithBinds",
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
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,manager,log) {
var currentUser = manager.getCurrentUser();
var hideForGroup = false;

currentUser.getAllGroups().forEach(function(userGroup) {
	if ((userGroup.getID()) == 'Marketing') {
		hideForGroup = true;
	} else if ((userGroup.getID()) == 'APSGroup') {
		hideForGroup = true;
	}
});

if (hideForGroup) {
	return false;
} else {
	return true;
}
}