/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_GetCurrentAssetID",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_AssetRelatedActions" ],
  "name" : "Get current asset ID",
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
  "pluginId" : "JavaScriptBusinessActionWithBinds",
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
    "contract" : "CurrentWorkflowBindContract",
    "alias" : "wf",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,manager,log,wf) {
var refType = manager.getReferenceTypeHome().getReferenceTypeByID('ref_PrimaryProductImage');

var referencedAssets = node.queryReferences(refType).asList(10);

if (referencedAssets.size() > 0) {
	node.queryReferences(refType).forEach(function(reference) {
		var targetAssetID = reference.getTarget().getID();
		node.getWorkflowInstance(wf).setSimpleVariable('linkedAssetID', targetAssetID);
		return true;
	});
}


/* old functionality. getReferences will soon by deprecated.
if(references.length == 1) {
	var targetAssetID = references[0].getTarget().getID();
	node.getWorkflowInstance(wf).setSimpleVariable("linkedAssetID", targetAssetID);
}
*/
}