/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_AddPOSDescription",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_SetValuesAndLinkes" ],
  "name" : "Add POS Description",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article", "prd_BundleArticle", "prd_GiftBoxArticle", "prd_PackagingUnitCase", "prd_PackagingUnitPack", "prd_PackagingUnitPallet" ],
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
    "contract" : "BusinessFunctionBindContract",
    "alias" : "bfGetAllPackgingUnits",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>bfGetAllPackgingUnits</BusinessFunction>\n</BusinessFunctionReference>\n",
    "description" : null
  }, {
    "contract" : "CurrentObjectBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_POSDescription",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_POSDescription",
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
exports.operation0 = function (bfGetAllPackgingUnits,node,att_POSDescription,prd_Article,prd_GiftBoxArticle) {
if (!node.getObjectType().getID().equals(prd_Article.getID()) && !node.getObjectType().getID().equals(prd_GiftBoxArticle.getID())) {
	if (!node.getValue(att_POSDescription.getID()).getSimpleValue()) {
		var nameValue = String(node.getName()).toUpperCase().substring(0,24);
		node.getValue(att_POSDescription.getID()).setSimpleValue(nameValue);
	}
} else {
	var packagingUnits = bfGetAllPackgingUnits.evaluate({node: node}).toArray();
	for (var x in packagingUnits) {
		if (!packagingUnits[x].getValue(att_POSDescription.getID()).getSimpleValue()) {
			var nameValuePU = String(packagingUnits[x].getName()).toUpperCase().substring(0,24);
			packagingUnits[x].getValue(att_POSDescription.getID()).setSimpleValue(nameValuePU);
		}
	}
}
}