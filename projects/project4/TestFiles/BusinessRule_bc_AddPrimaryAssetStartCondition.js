/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "bc_AddPrimaryAssetStartCondition",
  "type" : "BusinessCondition",
  "setupGroups" : [ "brg_AssetRelatedConditions" ],
  "name" : "Add primary asset start condition",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article", "prd_BundleArticle", "prd_GiftBoxArticle", "prd_PackagingUnitCase", "prd_PackagingUnitPack", "prd_PackagingUnitPallet" ],
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
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_PrimarySourceImage",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_PrimarySourceImage",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_Article",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_Article",
    "description" : null
  }, {
    "contract" : "LoggerBindContract",
    "alias" : "log",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ {
    "variable" : "bMessage",
    "message" : "No primary source image set. This is needed before starting the workflow.",
    "translations" : [ {
      "language" : "nl",
      "message" : "Geen primaire bron image gekozen, zo kan de workflow niet worden gestart"
    } ]
  } ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,ref_PrimarySourceImage,prd_Article,log,bMessage) {
if (prd_Article.getID() == node.getObjectType().getID()) {
	var primarySource = node.queryReferences(ref_PrimarySourceImage).asList(5);

	if (primarySource.size() == 0) {
		errorMessage = new bMessage;
		return errorMessage;
	}
} else if (node.getObjectType().getID().substring(0,17).equals('prd_PackagingUnit')) {
	var primarySource = node.queryReferences(ref_PrimarySourceImage).asList(5);

	if (primarySource.size() == 0) {
		errorMessage = new bMessage;
		return errorMessage;
	}
}


return true;
}