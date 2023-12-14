/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "bf_GetGlobalAttributesFromGroup",
  "type" : "BusinessFunction",
  "setupGroups" : [ "brg_Functions" ],
  "name" : "Get Global Attributes from Group",
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
  "pluginId" : "JavaScriptBusinessFunctionWithBinds",
  "binds" : [ ],
  "messages" : [ ],
  "pluginType" : "Operation",
  "functionReturnType" : "java.util.List<? extends com.stibo.core.domain.Node>",
  "functionParameterBinds" : [ {
    "contract" : "AttributeGroupBindContract",
    "alias" : "attributeGroup",
    "parameterClass" : "null",
    "value" : null,
    "description" : ""
  } ]
}
*/
exports.operation0 = function (attributeGroup) {
//Get the attributes which are children of the attributegroup and filter the attributes whether they are not dimension dependent
var globalAttributes = new java.util.ArrayList();
var attributes = attributeGroup.getAttributes().toArray();
for(var x in attributes){
	if(attributes[x].getDimensionDependencies().size() == 0){
		globalAttributes.add(attributes[x]);
	}
}
return globalAttributes;
}