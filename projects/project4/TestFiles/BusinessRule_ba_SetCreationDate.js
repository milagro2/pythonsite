/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SetCreationDate",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_SetValuesAndLinkes" ],
  "name" : "Set Creation Date",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article", "prd_BundleArticle", "prd_GiftBoxArticle", "prd_PackagingUnitCase", "prd_PackagingUnitEach", "prd_PackagingUnitPack", "prd_PackagingUnitPallet" ],
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
    "contract" : "AttributeBindContract",
    "alias" : "att_ArticleDate",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ArticleDate",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_AvailabilityStartDate",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_AvailabilityStartDate",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_FirstPublicationDate",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_FirstPublicationDate",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_TransportationCostsDate",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_TransportationCostsDate",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_PackagingTaxDate",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_PackagingTaxDate",
    "description" : null
  }, {
    "contract" : "BusinessFunctionBindContract",
    "alias" : "bfGetAllPackgingUnits",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>bfGetAllPackgingUnits</BusinessFunction>\n</BusinessFunctionReference>\n",
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
exports.operation0 = function (node,att_ArticleDate,att_AvailabilityStartDate,att_FirstPublicationDate,att_TransportationCostsDate,att_PackagingTaxDate,bfGetAllPackgingUnits,prd_Article,prd_GiftBoxArticle) {
var packagingUnits = bfGetAllPackgingUnits.evaluate({node: node}).toArray();
for (var i in packagingUnits) {
	if (!packagingUnits[i].getValue(att_ArticleDate.getID()).getSimpleValue()) {
	packagingUnits[i].getValue(att_ArticleDate.getID()).setValue(toISOStringLocal(new Date()));
	}
	if (!packagingUnits[i].getValue(att_AvailabilityStartDate.getID()).getSimpleValue()) {
	packagingUnits[i].getValue(att_AvailabilityStartDate.getID()).setValue(toISOStringLocal(new Date()));
	}
}
/*if (!node.getValue(articleDateAttribute.getID()).getSimpleValue()) {
	node.getValue(articleDateAttribute.getID()).setValue(toISOStringLocal(new Date()));
}*/
if (!node.getObjectType().equals(prd_Article) && !node.getObjectType().equals(prd_GiftBoxArticle)) {
	if (!node.getValue(att_AvailabilityStartDate.getID()).getSimpleValue()) {
		node.getValue(att_AvailabilityStartDate.getID()).setValue(toISOStringLocal(new Date()));
	}
	if (!node.getValue(att_ArticleDate.getID()).getSimpleValue()) {
		node.getValue(att_ArticleDate.getID()).setValue(toISOStringLocal(new Date()));
	}
}
if (!node.getValue(att_FirstPublicationDate.getID()).getSimpleValue()) {
	node.getValue(att_FirstPublicationDate.getID()).setValue(toISOStringLocal(new Date()));
}
if (!node.getValue(att_TransportationCostsDate.getID()).getSimpleValue()) {
	node.getValue(att_TransportationCostsDate.getID()).setValue(toISOStringLocal(new Date()));
}
if (!node.getValue(att_PackagingTaxDate.getID()).getSimpleValue()) {
	node.getValue(att_PackagingTaxDate.getID()).setValue(toISOStringLocal(new Date()));
}
function toISOStringLocal(d) {
  function z(n) {
return (n<10?'0':'') + n;
}
  return d.getFullYear() + '-' + z(d.getMonth()+1) + '-' + z(d.getDate());
}
}