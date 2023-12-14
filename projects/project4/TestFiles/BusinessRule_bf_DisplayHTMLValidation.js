/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "bf_DisplayHTMLValidation",
  "type" : "BusinessFunction",
  "setupGroups" : [ "brg_Functions" ],
  "name" : "Display HTML Validation",
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
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_ApprovalErrors",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ApprovalErrors",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation",
  "functionReturnType" : "java.lang.String",
  "functionParameterBinds" : [ {
    "contract" : "NodeBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : ""
  } ]
}
*/
exports.operation0 = function (manager,log,att_ApprovalErrors,node) {
var validationRejection = node.getValue(att_ApprovalErrors.getID()).getValues().toArray();

var htmlList = "<ul>"

validationRejection.forEach(
	function(validation){
		var val = validation.getValue();
		htmlList += "<li>"+'<p style="color:red">' + val +"</p></li>"
	}
);

htmlList += "</ul>";

if(validationRejection.length == 0) {
	var htmlString = '<p style="color:Green">All validations successful</p>'
	return htmlString;
} else {
	var htmlstring = htmlList;
	return htmlstring;
}
}