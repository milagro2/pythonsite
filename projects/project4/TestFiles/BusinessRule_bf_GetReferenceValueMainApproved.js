/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "bf_GetReferenceValueMainApproved",
  "type" : "BusinessFunction",
  "setupGroups" : [ "brg_Functions" ],
  "name" : "Get Reference Value Main Approved",
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
  "pluginId" : "JavaScriptBusinessFunctionWithBinds",
  "binds" : [ {
    "contract" : "AttributeBindContract",
    "alias" : "att_ConversionToBaseUnit",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ConversionToBaseUnit",
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
  "pluginType" : "Operation",
  "functionReturnType" : "java.util.List<java.lang.String>",
  "functionParameterBinds" : [ {
    "contract" : "NodeBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : "current node"
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "referenceType",
    "parameterClass" : "null",
    "value" : null,
    "description" : "which reference type "
  }, {
    "contract" : "StringBindContract",
    "alias" : "workspace",
    "parameterClass" : "null",
    "value" : null,
    "description" : "Main or Approved"
  } ]
}
*/
exports.operation0 = function (att_ConversionToBaseUnit,manager,log,node,referenceType,workspace) {
// Get workspace appropriate value 
var value;
if (workspace == "Approved") {
	manager.executeInWorkspace('Approved', function (approvedManager) {
		var approvedNode = approvedManager.getProductHome().getProductByID(node.getID());
		if (approvedNode) {
			var targets = new java.util.ArrayList();
			approvedNode.queryReferences(referenceType).forEach(function (reference){
				targets.add(reference.getTarget().getTitle());
				return true;
			});
			return targets;
		}
	});
} else {
	var targets = new java.util.ArrayList();
	node.queryReferences(referenceType).forEach(function (reference){
		targets.add(reference.getTarget().getTitle());
		return true;
	});
	return targets;
}



}