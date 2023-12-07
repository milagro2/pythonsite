/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_GenCopyTIInformation",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_CopyTradeItem" ],
  "name" : "Copy Overwrite Trade Item Information",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_TradeItem" ],
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
    "contract" : "BusinessActionBindContract",
    "alias" : "ba_GenCopyAttributeValuesForArticle",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessActionImpl",
    "value" : "ba_GenCopyAttributeValuesForArticle",
    "description" : null
  }, {
    "contract" : "BusinessActionBindContract",
    "alias" : "ba_GenCopyAttributeValuesForPackUnit",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessActionImpl",
    "value" : "ba_GenCopyAttributeValuesForPackUnit",
    "description" : null
  }, {
    "contract" : "BusinessActionBindContract",
    "alias" : "ba_GenCopyDataContainersForArticle",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessActionImpl",
    "value" : "ba_GenCopyDataContainersForArticle",
    "description" : null
  }, {
    "contract" : "BusinessActionBindContract",
    "alias" : "ba_GenCopyDataContainersForPackUnit",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessActionImpl",
    "value" : "ba_GenCopyDataContainersForPackUnit",
    "description" : null
  }, {
    "contract" : "BusinessActionBindContract",
    "alias" : "ba_GenCopyReferencesForArticle",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessActionImpl",
    "value" : "ba_GenCopyReferencesForArticle",
    "description" : null
  }, {
    "contract" : "BusinessActionBindContract",
    "alias" : "ba_GenCopyReferencesForPackUnit",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessActionImpl",
    "value" : "ba_GenCopyReferencesForPackUnit",
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
  }, {
    "contract" : "BusinessActionBindContract",
    "alias" : "ba_PartialApproveCopiedInfo",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessActionImpl",
    "value" : "ba_PartialApproveCopiedInfo",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,ba_GenCopyAttributeValuesForArticle,ba_GenCopyAttributeValuesForPackUnit,ba_GenCopyDataContainersForArticle,ba_GenCopyDataContainersForPackUnit,ba_GenCopyReferencesForArticle,ba_GenCopyReferencesForPackUnit,ptp_PartnerArticle,prd_Article,prd_GiftBoxArticle,ba_PartialApproveCopiedInfo) {
node.queryReferencedBy(ptp_PartnerArticle).forEach(function(reference) {
	var article = reference.getSource();
	if (article.getObjectType().equals(prd_Article) || article.getObjectType().equals(prd_GiftBoxArticle)) {
		ba_GenCopyAttributeValuesForArticle.execute(article);
		ba_GenCopyDataContainersForArticle.execute(article);
		ba_GenCopyReferencesForArticle.execute(article);
		ba_PartialApproveCopiedInfo.execute(article);
	} else {
		ba_GenCopyAttributeValuesForPackUnit.execute(article);
		ba_GenCopyDataContainersForPackUnit.execute(article);
		ba_GenCopyReferencesForPackUnit.execute(article);
		ba_PartialApproveCopiedInfo.execute(article);
	}
	return true;
});
}