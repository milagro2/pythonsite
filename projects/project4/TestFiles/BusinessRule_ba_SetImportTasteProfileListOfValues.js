/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SetImportTasteProfileListOfValues",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Set Taste Profile List of Values",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "ent_TasteProfile" ],
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
    "contract" : "ListOfValuesBindContract",
    "alias" : "lov_TasteProfile",
    "parameterClass" : "com.stibo.core.domain.impl.ListOfValuesImpl",
    "value" : "lov_TasteProfile",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,lov_TasteProfile) {
var value = lov_TasteProfile.getListOfValuesValueByID(node.getID());
if (value) {
	value.setValue(node.getName(),null);
} else {
	lov_TasteProfile.createListOfValuesValue(node.getName(),null,node.getID());
}
}