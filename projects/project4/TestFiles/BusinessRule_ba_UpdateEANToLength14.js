/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_UpdateEANToLength14",
  "type" : "BusinessAction",
  "setupGroups" : [ "sg_BulkUpdates" ],
  "name" : "UpdateEANToLength14",
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
 * This business rule can be used with a bulk update configuration,
 * to update all articles with EANs of 13 characters to 14 characters padded with 0's
 */

var currentEan = node.getValue(att_GlobalTradeIdentificationNumber.getID()).getSimpleValue();

if (!currentEan) {
	logger.info('missing an ean');
	return;
}

if (currentEan.length() < 14) {
	logger.info('------------------------');
	logger.info(node.getName());
	var newEan = '00000000000000'.substring(1,15-currentEan.length()) + currentEan;
	logger.info(currentEan);
	logger.info(newEan);
	node.getValue(att_GlobalTradeIdentificationNumber.getID()).setSimpleValue(newEan);
}
}