/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_AssertNoShortEan",
  "type" : "BusinessAction",
  "setupGroups" : [ "sg_BulkUpdates" ],
  "name" : "AssertNoShortEanExists",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article" ],
  "allObjectTypesValid" : false,
  "runPrivileged" : false,
  "onApprove" : "Never",
  "dependencies" : [ ]
}
*/
/*===== business rule plugin definition =====
{
  "pluginId" : "JavaScriptBusinessActionWithBinds",
  "binds" : [ {
    "contract" : "CurrentObjectBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_GlobalTradeIdentificationNumber",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_GlobalTradeIdentificationNumber",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,att_GlobalTradeIdentificationNumber) {
/**
 * This business rule can be used with a bulk update configuration to find any article with an EAN 
 * that is less than 14 characters long. * 
 */

var currentEan = node.getValue(att_GlobalTradeIdentificationNumber.getID()).getSimpleValue();

if (!currentEan) {
	return;
}

if (currentEan.length() < 14) {
	logger.info(node.getName());
}
}