/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "bf_GetArticleFromPackagingUnit",
  "type" : "BusinessFunction",
  "setupGroups" : [ "brg_Functions" ],
  "name" : "Get Article from Packaging Unit",
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
  "pluginId" : "JavaScriptBusinessFunctionWithBinds",
  "binds" : [ {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_NextLowerLevel",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_NextLowerLevel",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_Article",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_Article",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_PackagingUnitCase",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_PackagingUnitCase",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_PackagingUnitEach",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_PackagingUnitEach",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_PackagingUnitPack",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_PackagingUnitPack",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_PackagingUnitPallet",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_PackagingUnitPallet",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_BundleArticle",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_BundleArticle",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_GiftBoxArticle",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_GiftBoxArticle",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation",
  "functionReturnType" : "com.stibo.core.domain.Product",
  "functionParameterBinds" : [ {
    "contract" : "NodeBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : "The node for which the complete article needs to be retrieved"
  } ]
}
*/
exports.operation0 = function (ref_NextLowerLevel,prd_Article,prd_PackagingUnitCase,prd_PackagingUnitEach,prd_PackagingUnitPack,prd_PackagingUnitPallet,prd_BundleArticle,prd_GiftBoxArticle,node) {
var loper = node;
var referenceTypeIDs = [];
referenceTypeIDs.push(ref_NextLowerLevel.getID());

var objectTypeIDs = [];
objectTypeIDs.push(prd_Article.getID());
objectTypeIDs.push(prd_BundleArticle.getID());
objectTypeIDs.push(prd_GiftBoxArticle.getID());
var failsafe = 0;
while (loper != null && objectTypeIDs.indexOf(loper.getObjectType().getID()) == -1 && failsafe < 10) {
	var references = loper.getReferences().asList().toArray();
	var found = false;
	for (var x in references) {
		if (found == false && referenceTypeIDs.indexOf(references[x].getReferenceType().getID()) != -1) {
			loper = references[x].getTarget();
			found = true;
			break;
		}
	}
	if (found == false) {
		loper = null;
	}
	failsafe = failsafe + 1;
	logger.info (failsafe);
	
}
return loper;
}