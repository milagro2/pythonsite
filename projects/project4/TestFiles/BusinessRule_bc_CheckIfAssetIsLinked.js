/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "bc_CheckIfAssetIsLinked",
  "type" : "BusinessCondition",
  "setupGroups" : [ "brg_AssetRelatedConditions" ],
  "name" : "Check is asset is linked",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "ast_PrimaryProductImage" ],
  "allObjectTypesValid" : false,
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
  "messages" : [ {
    "variable" : "aMessage",
    "message" : "De afbeelding die je probeert te verwijderen is nog steeds gelinked aan 1 of meerdere producten. Pas als de afbeelding niet meer gelinked is, mag deze verwijderd worden.",
    "translations" : [ {
      "language" : "en",
      "message" : "The image you're trying to delete is still linked to 1 or more products. Only when the image is no longer linked it may be removed."
    } ]
  } ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,manager,log,aMessage) {
var refTypeID = 'ref_PrimaryProductImage';
var refType = manager.getReferenceTypeHome().getReferenceTypeByID(refTypeID);
var referencedPrds = node.getReferencedByProducts().toArray();

var assetRefArray = referencedPrds.filter(function (assetRef) {
		return (refTypeID.equals(assetRef.getReferenceType().getID()));
});


if (assetRefArray.length > 0) {
	var errorMsg = new aMessage();
	return errorMsg;
} else {
	return true;
}
}