/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SetVintageBasedOnProvidedByLISA",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_SetValuesAndLinkes" ],
  "name" : "Set Vintage Based On Vintage Provided By LISA",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_PackagingUnitCase", "prd_PackagingUnitEach", "prd_PackagingUnitPack", "prd_PackagingUnitPallet" ],
  "allObjectTypesValid" : false,
  "runPrivileged" : true,
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
    "alias" : "att_Vintage",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_Vintage",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_VintageProvidedByLISA",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_VintageProvidedByLISA",
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
exports.operation0 = function (node,att_Vintage,att_VintageProvidedByLISA,bf_GetArticleFromPackagingUnit) {
/*
 * This functionality copies the value received from LISA on the packaging unit to the value on the article level
 *
 * - if vintageProvidedByLISAAttribute has a value on the node
 *   - get the article linked to the packaging unit
 *   - if there is an article
 *     - copy value to vintageAttribute on the article
 *
 * Bindings:
 * vintageAttribute --> Vintage (att_Vintage)
 * vintageProvidedByLISAAttribute --> Vintage Provided By LISA (att_VintageProvidedByLISA)
 * getArticleFromPackagingUnit --> Get Article from Packaging Unit (bf_GetArticleFromPackagingUnit)
 *
 */


var vintageByLisa = node.getValue(att_VintageProvidedByLISA.getID()).getSimpleValue();
logger.info(vintageByLisa);
var article = bf_GetArticleFromPackagingUnit.evaluate({node: node});
if (article) {
	if (vintageByLisa) {
		if (vintageByLisa != 0) {
			article.getValue(att_Vintage.getID()).setValue(vintageByLisa);
		} else {
			article.getValue(att_Vintage.getID()).deleteCurrent();
		}
	}
}
}