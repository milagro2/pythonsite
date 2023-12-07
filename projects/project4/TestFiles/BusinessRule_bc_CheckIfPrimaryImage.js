/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "bc_CheckIfPrimaryImage",
  "type" : "BusinessCondition",
  "setupGroups" : [ "brg_AssetRelatedConditions" ],
  "name" : "Check if primary image",
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
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,manager,log) {
var refTypeID = 'ref_PrimaryProductImage';
var refType = manager.getReferenceTypeHome().getReferenceTypeByID(refTypeID);
var referencedAssets = node.queryReferences(refType).asList(1);

//Check if we have a primary asset, used to show or hide certain tabs in the DAM web ui screens
if (referencedAssets.size() > 0) {
	return true;
} else {
	return false;
}
}