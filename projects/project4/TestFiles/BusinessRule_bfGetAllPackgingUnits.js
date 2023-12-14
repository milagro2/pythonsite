/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "bfGetAllPackgingUnits",
  "type" : "BusinessFunction",
  "setupGroups" : [ "brg_Functions" ],
  "name" : "Get all packaging units for an article",
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
    "alias" : "prd_SalesChannelInformation",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_SalesChannelInformation",
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
  }, {
    "contract" : "BusinessFunctionBindContract",
    "alias" : "bf_GetArticleFromPackagingUnit",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>bf_GetArticleFromPackagingUnit</BusinessFunction>\n</BusinessFunctionReference>\n",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation",
  "functionReturnType" : "java.util.List<com.stibo.core.domain.Product>",
  "functionParameterBinds" : [ {
    "contract" : "NodeBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : "The node for which the complete article needs to be retrieved"
  } ]
}
*/
exports.operation0 = function (ref_NextLowerLevel,prd_Article,prd_PackagingUnitCase,prd_PackagingUnitEach,prd_PackagingUnitPack,prd_PackagingUnitPallet,prd_SalesChannelInformation,prd_BundleArticle,prd_GiftBoxArticle,bf_GetArticleFromPackagingUnit,node) {
var totalNodes = new java.util.ArrayList;
var article = bf_GetArticleFromPackagingUnit.evaluate({node: node});
if (article) {
	var referenceTypeIDs = String(ref_NextLowerLevel.getID());
	var toDoNodes = [];

	toDoNodes.push(article);
	var failSAFE = 0;
	while (toDoNodes.length > 0 && failSAFE < 100) {
		failSAFE = failSAFE + 1;
		var toDoNode = toDoNodes.shift();
		var references = toDoNode.getReferencedBy().toArray();
		for (var x in references) {
			if (referenceTypeIDs.indexOf(String(references[x].getReferenceType().getID())) != -1) {
				var found = false;
				for (var y=0; y < totalNodes.size(); y++) {
					if (totalNodes.get(y).getID() == references[x].getSource().getID()) {
						found = true;
						break;
					}
				}
				if (found == false) {
					toDoNodes.push(references[x].getSource());
					totalNodes.add(references[x].getSource());
					//log.info(references[x].getSource().getID());
				}
			}
		}
	}
}
return totalNodes;
}