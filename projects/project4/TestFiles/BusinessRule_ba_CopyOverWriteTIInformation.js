/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_CopyOverWriteTIInformation",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Copy Overwrite Trade Item Information",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_TradeItem" ],
  "allObjectTypesValid" : false,
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
    "contract" : "BusinessActionBindContract",
    "alias" : "ba_CopyOverwriteAttValuesForArticle",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessActionImpl",
    "value" : "ba_CopyOverwriteAttValuesForArticle",
    "description" : null
  }, {
    "contract" : "BusinessActionBindContract",
    "alias" : "ba_CopyAttributeValuesForPackUnit",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessActionImpl",
    "value" : "ba_CopyAttributeValuesForPackUnit",
    "description" : null
  }, {
    "contract" : "BusinessActionBindContract",
    "alias" : "ba_CopyDataContainersForArticle",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessActionImpl",
    "value" : "ba_CopyDataContainersForArticle",
    "description" : null
  }, {
    "contract" : "BusinessActionBindContract",
    "alias" : "ba_CopyDataContainersForPackUnit",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessActionImpl",
    "value" : "ba_CopyDataContainersForPackUnit",
    "description" : null
  }, {
    "contract" : "BusinessActionBindContract",
    "alias" : "ba_CopyReferencesForArticle",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessActionImpl",
    "value" : "ba_CopyReferencesForArticle",
    "description" : null
  }, {
    "contract" : "BusinessActionBindContract",
    "alias" : "ba_CopyReferencesForPackUnit",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessActionImpl",
    "value" : "ba_CopyReferencesForPackUnit",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ptp_PartnerArticle",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ptp_PartnerArticle",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_Article",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_Article",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_GiftBoxArticle",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_GiftBoxArticle",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,ba_CopyOverwriteAttValuesForArticle,ba_CopyAttributeValuesForPackUnit,ba_CopyDataContainersForArticle,ba_CopyDataContainersForPackUnit,ba_CopyReferencesForArticle,ba_CopyReferencesForPackUnit,ptp_PartnerArticle,prd_Article,prd_GiftBoxArticle) {
node.queryReferencedBy(ptp_PartnerArticle).forEach(function(reference) {
	var article = reference.getSource();
	if (article.getObjectType().equals(prd_Article) || article.getObjectType().equals(prd_GiftBoxArticle)) {
		ba_CopyOverwriteAttValuesForArticle.execute(article);
		ba_CopyDataContainersForArticle.execute(article);
		ba_CopyReferencesForArticle.execute(article);
	} else {
		ba_CopyAttributeValuesForPackUnit.execute(article);
		ba_CopyDataContainersForPackUnit.execute(article);
		ba_CopyReferencesForPackUnit.execute(article);
	}
	return true;
});
}