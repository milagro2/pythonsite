/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "bc_AssetPublisherFilter",
  "type" : "BusinessCondition",
  "setupGroups" : [ "brg_Conditions" ],
  "name" : "Asset Publisher Filter",
  "description" : "Event filter for Asset Publisher event processor to only include assets that meet certain conditions.",
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
    "contract" : "LoggerBindContract",
    "alias" : "logger",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "ClassificationBindContract",
    "alias" : "Packshots",
    "parameterClass" : "com.stibo.core.domain.impl.FrontClassificationImpl",
    "value" : "Packshots",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "ast_PrimaryProductImage",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "ast_PrimaryProductImage",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_PrimaryProductImage",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_PrimaryProductImage",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,logger,Packshots,ast_PrimaryProductImage,ref_PrimaryProductImage) {
/*
 *  Name: 	bc_AssetPublisherFilter - Asset Publisher Filter
 *  Purpose: 	Event filter for Asset Publisher event processor to only include assets that meet certain conditions.
 *  Input Parameters:
 *  			node -> Current Object
 *  			logger -> Logger
 *  			clsAsset -> Classification -> Packshots (Packshots)
 *  			objtypeAsset -> objtypeAsset -> Primary Product Image (ast_PrimaryProductImage)
 *  			ref_PrimaryProductImage -> Reference Type -> Primary Product Image (ref_PrimaryProductImage)
*/


// Debug
var isDebug = false;
function logDebug(msg) {
  	if (isDebug) {
logger.info(msg);
}
}

var conditionmet = false;

if (node.getObjectType().getID() == ast_PrimaryProductImage.getID()) {
	var article = node.queryReferencedBy(ref_PrimaryProductImage).asList(10);
	if (article.size()>0) {
		var ClassReferences = node.getClassifications().toArray();
		if (ClassReferences.length > 0) {
			for ( var i = 0; i < ClassReferences.length; i++ ) {
				var ClassReference = ClassReferences[i];
				var ClassReferenceParent = ClassReferences[i].getParent();
				var ClassReferencePParent = ClassReferences[i].getParent().getParent();
				if (ClassReference.getID() == Packshots.getID() || ClassReferenceParent.getID() == Packshots.getID() || ClassReferencePParent.getID() == Packshots.getID()) {
					conditionmet = true;
				}
			}
		}
	}
}
return conditionmet;
}