/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "bc_IsPackagingUnitComplete",
  "type" : "BusinessCondition",
  "setupGroups" : [ "brg_Conditions" ],
  "name" : "Is Packaging Unit Complete",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_PackagingUnitCase", "prd_PackagingUnitPack", "prd_PackagingUnitPallet" ],
  "allObjectTypesValid" : false,
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
    "contract" : "BusinessConditionBindContract",
    "alias" : "bc_IsAllMandatoryInformationCompleted",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessConditionImpl",
    "value" : "bc_IsAllMandatoryInformationCompleted",
    "description" : null
  }, {
    "contract" : "BusinessFunctionBindContract",
    "alias" : "bf_GetMissingMandatoryAttributes",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>bf_GetMissingMandatoryAttributes</BusinessFunction>\n</BusinessFunctionReference>\n",
    "description" : null
  } ],
  "messages" : [ {
    "variable" : "UserMessage",
    "message" : "{result}",
    "translations" : [ ]
  } ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,bc_IsAllMandatoryInformationCompleted,bf_GetMissingMandatoryAttributes,UserMessage) {
/*
 * The functionality checks whether all mandatory information is completed for the packaging unit only

 *
 */
var completeResultNode ='';
var missingList;

// Check for the packaging unit whether it is complete
var isNodeComplete = bc_IsAllMandatoryInformationCompleted.evaluate(node);
if (isNodeComplete.isRejected() || isNodeComplete.isNonApplicable()) {
	missingList = bf_GetMissingMandatoryAttributes.evaluate({node: node});
	completeResultNode = completeResultNode +'<br/>'+node.getID()+' '+node.getName()+' is niet compleet. De volgende informatie mist:'+'<br/>'+missingList+'<br/>';
}

if (!completeResultNode) {
	return true;
} else {
	errorMessage = new UserMessage();
	errorMessage.result = completeResultNode;
	return errorMessage;
}
}