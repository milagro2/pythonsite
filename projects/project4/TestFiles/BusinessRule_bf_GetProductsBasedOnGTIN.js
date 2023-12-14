/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "bf_GetProductsBasedOnGTIN",
  "type" : "BusinessFunction",
  "setupGroups" : [ "brg_Functions" ],
  "name" : "Get Products Based on GTIN",
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
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_GlobalTradeIdentificationNumbers",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_GlobalTradeIdentificationNumbers",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation",
  "functionReturnType" : "java.util.List<com.stibo.core.domain.Product>",
  "functionParameterBinds" : [ {
    "contract" : "StringBindContract",
    "alias" : "gtinInput",
    "parameterClass" : "null",
    "value" : null,
    "description" : ""
  } ]
}
*/
exports.operation0 = function (manager,log,ref_GlobalTradeIdentificationNumbers,gtinInput) {
var gtinObject = manager.getNodeHome().getObjectByKey('key_GTINObject', gtinInput);
var productList = new java.util.ArrayList;

if (gtinObject) {
	gtinObject.queryReferencedBy(ref_GlobalTradeIdentificationNumbers).forEach(function(ref) {
		productList.add(ref.getSource());
		return true;
	});
}

return productList;
}