/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "bc_IsNotStandardEvent",
  "type" : "BusinessCondition",
  "setupGroups" : [ "brg_EventQueueConditions" ],
  "name" : "Is Not Standard Event",
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
  "pluginId" : "JavaScriptBusinessConditionWithBinds",
  "binds" : [ {
    "contract" : "CurrentEventTypeBinding",
    "alias" : "currentEventType",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (currentEventType) {
/*
 * If the event is create, modify or delete, then the condition should be false, otherwise it should be true.
 */
if (currentEventType.equals(com.stibo.core.domain.eventqueue.BasicEventType.Modify) ||
	currentEventType.equals(com.stibo.core.domain.eventqueue.BasicEventType.Create) ||
	currentEventType.equals(com.stibo.core.domain.eventqueue.BasicEventType.Delete)) {
	return false;
} else {
	return true;
}
}