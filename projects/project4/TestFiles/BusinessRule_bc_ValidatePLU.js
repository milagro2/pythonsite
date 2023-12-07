/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "bc_ValidatePLU",
  "type" : "BusinessCondition",
  "setupGroups" : [ "brg_WebUIConditions" ],
  "name" : "Validate PLU",
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
  "pluginId" : "JavaScriptBusinessConditionWithBinds",
  "binds" : [ {
    "contract" : "CurrentObjectBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
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
  }, {
    "contract" : "SimpleValueBindContract",
    "alias" : "att_PriceLookUp",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_PriceLookUp",
    "description" : null
  } ],
  "messages" : [ {
    "variable" : "aMessage",
    "message" : "PLU {pluCode} is in use by {prodName}. ",
    "translations" : [ {
      "language" : "nl",
      "message" : "PLU {pluCode} is in gebruik door {prodName}"
    } ]
  } ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,manager,log,att_PriceLookUp,aMessage) {
var pluObject = manager.getNodeHome().getObjectByKey('key_PLU', att_PriceLookUp);
var pluInUse = false;

if (pluObject) {
	pluInUse = true;
}


log.info('PLU Code = ' + att_PriceLookUp + ', PLU Existing = ' + pluInUse);

if (pluInUse) {
	var errorMsg = new aMessage();
	errorMsg.att_PriceLookUp = att_PriceLookUp;
	errorMsg.prodName = pluObject.getName();
	return errorMsg;
} else {
	return true;
}
}