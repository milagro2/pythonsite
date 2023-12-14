/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "bc_ValidateUpdateCompleteness",
  "type" : "BusinessCondition",
  "setupGroups" : [ "brg_ArticleMaintenanceConditions" ],
  "name" : "Validate Update Completeness",
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
    "contract" : "AttributeBindContract",
    "alias" : "att_ApprovalErrors",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ApprovalErrors",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,manager,log,att_ApprovalErrors) {
var approvalErrors = node.getValue(att_ApprovalErrors.getID()).getSimpleValue();

log.info(approvalErrors);

if(approvalErrors == null) {
	return true;
} else {
	return "Validation failed.. Check status attribute...";
}

}