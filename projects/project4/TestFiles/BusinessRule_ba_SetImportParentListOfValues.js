/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SetImportParentListOfValues",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Set Import Parent List of Values",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_ProductCategory" ],
  "allObjectTypesValid" : false,
  "runPrivileged" : true,
  "onApprove" : "Trigger",
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
    "alias" : "lov_ProductCategories",
    "parameterClass" : "com.stibo.core.domain.impl.ListOfValuesImpl",
    "value" : "lov_ProductCategories",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,lov_ProductCategories) {
var value = lov_ProductCategories.getListOfValuesValueByID(node.getID());
if (value) {
	value.setValue(node.getName(),null);
} else {
	lov_ProductCategories.createListOfValuesValue(node.getName(),null,node.getID());
}
}