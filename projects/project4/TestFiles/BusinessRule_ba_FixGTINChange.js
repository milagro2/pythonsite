/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_FixGTINChange",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Fix GTIN Change",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_PackagingUnitCase", "prd_PackagingUnitEach", "prd_PackagingUnitPack", "prd_PackagingUnitPallet" ],
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
    "contract" : "BusinessFunctionBindContract",
    "alias" : "bf_GetArticleFromPackagingUnit",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>bf_GetArticleFromPackagingUnit</BusinessFunction>\n</BusinessFunctionReference>\n",
    "description" : null
  }, {
    "contract" : "BusinessActionBindContract",
    "alias" : "ba_CreateNewTradeItem",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessActionImpl",
    "value" : "ba_CreateNewTradeItem",
    "description" : null
  }, {
    "contract" : "BusinessActionBindContract",
    "alias" : "ba_CreateTIOnPUWorkflowCreatePU",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessActionImpl",
    "value" : "ba_CreateTIOnPUWorkflowCreatePU",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_GlobalTradeIdentificationNumber",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_GlobalTradeIdentificationNumber",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_PackagingUnitEach",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_PackagingUnitEach",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ptp_PartnerArticle",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ptp_PartnerArticle",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_GlobalTradeIdentificationNumbers",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_GlobalTradeIdentificationNumbers",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_MainIndicator",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_MainIndicator",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_ValidityStartDate",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ValidityStartDate",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_ValidityEndDate",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ValidityEndDate",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,bf_GetArticleFromPackagingUnit,ba_CreateNewTradeItem,ba_CreateTIOnPUWorkflowCreatePU,att_GlobalTradeIdentificationNumber,prd_PackagingUnitEach,ptp_PartnerArticle,ref_GlobalTradeIdentificationNumbers,att_MainIndicator,att_ValidityStartDate,att_ValidityEndDate) {
var tiReferences = node.queryReferences(ptp_PartnerArticle).asList(10);
var gtin = node.getValue(att_GlobalTradeIdentificationNumber.getID()).getSimpleValue();
if(tiReferences.size()>0){
	node.queryReferences(ptp_PartnerArticle).forEach(function(tiReference){
		var gtinTI = tiReference.getTarget().getValue(att_GlobalTradeIdentificationNumber.getID()).getSimpleValue();
		if (gtin != gtinTI){
			ba_CreateTIOnPUWorkflowCreatePU.execute(node);
		}
		return true;
	});
}
if (node.getObjectType().getID() == prd_PackagingUnitEach.getID()){
	var article = bf_GetArticleFromPackagingUnit.evaluate({node:node});
	var gtinArticle = article.getValue(att_GlobalTradeIdentificationNumber.getID()).getSimpleValue();
	if (gtin != gtinArticle){
		article.getValue(att_GlobalTradeIdentificationNumber.getID()).setSimpleValue(gtin);
		ba_CreateNewTradeItem.execute(article);
		article.queryReferences(ref_GlobalTradeIdentificationNumbers).forEach(function(gtinArticleReference){
			gtinArticleReference.delete();
			return true;
		});
		node.queryReferences(ref_GlobalTradeIdentificationNumbers).forEach(function(gtinReference){
			var gtinTarget = gtinReference.getTarget();
			var mainIndicator = gtinReference.getValue(att_MainIndicator.getID()).getSimpleValue();
			var validityStartDate = gtinReference.getValue(att_ValidityStartDate.getID()).getSimpleValue();
			var validityEndDate = gtinReference.getValue(att_ValidityEndDate.getID()).getSimpleValue();
			var articleNewGtinRef = article.createReference(gtinTarget, ref_GlobalTradeIdentificationNumbers);
			articleNewGtinRef.getValue(att_MainIndicator.getID()).setSimpleValue(mainIndicator);
			articleNewGtinRef.getValue(att_ValidityStartDate.getID()).setSimpleValue(validityStartDate);
			articleNewGtinRef.getValue(att_ValidityEndDate.getID()).setSimpleValue(validityEndDate);
			return true;
		});
	}
}
}