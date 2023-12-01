/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_ListAssetLinks",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_AssetRelatedActions" ],
  "name" : "List asset links",
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
var wfi = node.getWorkflowInstance(wf);

var refType = manager.getReferenceTypeHome().getReferenceTypeByID('ref_PrimaryProductImage');
var refTypeID = 'ref_PrimaryProductImage';
var referencedPrds = node.getReferencedByProducts().toArray();

var assetRefArray = referencedPrds.filter(function (assetRef) {
		return (refTypeID.equals(assetRef.getReferenceType().getID()));
});

if (assetRefArray.length > 0) {
	wfi.setSimpleVariable('isStillLinked', 'Yes');
} else {
	var packshots = manager.getClassificationHome().getClassificationByID('Packshots');
	var archive = manager.getClassificationHome().getClassificationByID('PackshotsArchive');
	if (packshots && archive) {
		node.move(packshots, archive, null);
		node.approve();
	}
	node.getTaskByID(wf.getID(), 'mopInitial').triggerLaterByID('done', 'triggered on entry of WF due to unlinked to any products');
}
}