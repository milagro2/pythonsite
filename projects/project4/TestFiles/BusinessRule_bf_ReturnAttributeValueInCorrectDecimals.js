/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "bf_ReturnAttributeValueInCorrectDecimals",
  "type" : "BusinessFunction",
  "setupGroups" : [ "brg_Functions" ],
  "name" : "Return att value in correct decimals",
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
    "alias" : "att_NumberOfDecimals",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_NumberOfDecimals",
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
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "attribute",
    "parameterClass" : "null",
    "value" : null,
    "description" : ""
  } ]
}
*/
exports.operation0 = function (att_NumberOfDecimals,node,attribute) {
var numberOfDecimals = attribute.getValue(att_NumberOfDecimals.getID()).getSimpleValue();
if (numberOfDecimals) {
	if (attribute.isMultiValued() == true) {
		var singleValues = node.getValues(attribute.getID()).toArray();
	} else {
		var singleValues = [node.getValue(attribute.getID())];
	}
	for (var y in singleValues) {
		if(singleValues[y].getUnit()){
			return(Number(singleValues[y].getValue()).toFixed(numberOfDecimals) + " "+ singleValues[y].getUnit());
		} else {
			return(Number(singleValues[y].getValue()).toFixed(numberOfDecimals));
		}
}
} else {
	return node.getValue(attribute.getID()).getSimpleValue();
}
}