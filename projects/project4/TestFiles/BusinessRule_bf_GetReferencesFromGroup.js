/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "bf_GetReferencesFromGroup",
  "type" : "BusinessFunction",
  "setupGroups" : [ "brg_Functions" ],
  "name" : "Get References from Group",
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
//Get the references which are linked to the attribute group provided
var references = new java.util.ArrayList();
var attributeGroupReferences = attributeGroup.getLinkTypes().toArray();
for(var x in attributeGroupReferences){	
	references.add(attributeGroupReferences[x]);	
}
return references;
}