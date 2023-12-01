/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_MovePackagingUnitsBelowArticle",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Move Packaging Units below Article",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_PackagingUnitCase", "prd_PackagingUnitEach", "prd_PackagingUnitPack", "prd_PackagingUnitPallet" ],
  "allObjectTypesValid" : false,
  "runPrivileged" : true,
  "onApprove" : "TriggerAndApproveNewParts",
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
    "contract" : "ProductBindContract",
    "alias" : "PackagingRoot",
    "parameterClass" : "com.stibo.core.domain.impl.FrontProductImpl",
    "value" : "PackagingRoot",
    "description" : null
  }, {
    "contract" : "BusinessFunctionBindContract",
    "alias" : "bf_GetArticleFromPackagingUnit",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>bf_GetArticleFromPackagingUnit</BusinessFunction>\n</BusinessFunctionReference>\n",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,PackagingRoot,bf_GetArticleFromPackagingUnit) {
/* Moves the packaging units to the article they belong to
 *
 *  Check whether the packaging unit is currently below the default packaing unit root, if not skip functionality
 *  Get the article to which the packaging unit belongs
 *  Set the article as parent of the packaging unit
 *
 *  Bindings:
 *defaultPackagingUnitRoot --> Packaging Root (PackagingRoot)
 *getArticleFromPackagingUnit --> Get Article from Packaging Unit (bf_GetArticleFromPackagingUnit)
 */

if (node.getParent().getID().equals(PackagingRoot.getID())) {
	var article = bf_GetArticleFromPackagingUnit.evaluate({node: node});
	if (article) {
		node.setParent(article);
	}
}
}