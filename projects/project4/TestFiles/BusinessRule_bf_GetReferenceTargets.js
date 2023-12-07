/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "bf_GetReferenceTargets",
  "type" : "BusinessFunction",
  "setupGroups" : [ "brg_Functions" ],
  "name" : "Get Reference Targets",
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
    "contract" : "NodeBindContract",
    "alias" : "referenceSource",
    "parameterClass" : "null",
    "value" : null,
    "description" : ""
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "referenceType",
    "parameterClass" : "null",
    "value" : null,
    "description" : ""
  } ]
}
*/
exports.operation0 = function (referenceSource,referenceType) {
var targets = new java.util.ArrayList();
referenceSource.queryReferences(referenceType).forEach(function (reference){
	targets.add(reference.getTarget());
	return true;
});
return targets;

}