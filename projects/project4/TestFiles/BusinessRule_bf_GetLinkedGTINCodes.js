/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "bf_GetLinkedGTINCodes",
  "type" : "BusinessFunction",
  "setupGroups" : [ "brg_Functions" ],
  "name" : "Get Linked GTIN Codes",
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
  "binds" : [ {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_GlobalTradeIdentificationNumbers",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_GlobalTradeIdentificationNumbers",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_GlobalTradeIdentificationNumber",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_GlobalTradeIdentificationNumber",
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
    "description" : ""
  } ]
}
*/
exports.operation0 = function (ref_GlobalTradeIdentificationNumbers,att_GlobalTradeIdentificationNumber,node) {
var gtinCodes = new java.util.ArrayList();
node.queryReferences(ref_GlobalTradeIdentificationNumbers).forEach(function (reference){
	var gtinObject = reference.getTarget();
	var gtinCode = String(gtinObject.getValue(att_GlobalTradeIdentificationNumber.getID()).getSimpleValue());
	if (gtinCode) {
		gtinCodes.add (gtinCode);
		var safeguard = 0;
		var longGTINCode = gtinCode;
		while (gtinCode.length > 0 && gtinCode.charAt(0) == '0' && safeguard < 20) {
			var gtinCode = gtinCode.substring(1);
			safeguard++;
		}
		if (longGTINCode != gtinCode) {
			gtinCodes.add (gtinCode);
		}
	}
	return true;
});
return gtinCodes;
}