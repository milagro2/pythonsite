/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_AssignItemNumber",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Assign Item Number",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_BundleArticle", "prd_GiftBoxArticle", "prd_PackagingUnitCase", "prd_PackagingUnitEach", "prd_PackagingUnitPack", "prd_PackagingUnitPallet" ],
  "allObjectTypesValid" : false,
  "runPrivileged" : true,
  "onApprove" : "Trigger",
  "dependencies" : [ ]
}
*/
/*===== business rule plugin definition =====
{
  "pluginId" : "AssignGeneratedValueAction",
  "parameters" : [ {
    "id" : "Attribute",
    "type" : "com.stibo.core.domain.Attribute",
    "value" : "att_ItemNumber"
  }, {
    "id" : "ValueGeneratorConfiguration",
    "type" : "com.stibo.valuegenerator.domain.configuration.ValueGeneratorConfiguration",
    "value" : "vge_CosmosArticleNumber"
  } ],
  "pluginType" : "Operation"
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
    "contract" : "AttributeBindContract",
    "alias" : "att_ItemNumber",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ItemNumber",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_OperationalPackagingRoles",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_OperationalPackagingRoles",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_BundleArticle",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_BundleArticle",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Precondition"
}
*/
exports.precondition0 = function (node,att_ItemNumber,att_OperationalPackagingRoles,prd_BundleArticle) {
var itemNumber = node.getValue(att_ItemNumber.getID()).getSimpleValue();
var operationalPackingRoles = node.getValue(att_OperationalPackagingRoles.getID()).getValues().toArray();
var found = false;
for (var x in operationalPackingRoles) {
	if (operationalPackingRoles[x].getID().equals('isTradeItemADespatchUnit') || operationalPackingRoles[x].getID().equals('isTradeItemAConsumerUnit')) {
		found = true;
	}
}
if (node.getObjectType().getID() == prd_BundleArticle.getID()) {
	found = true;
}
if (!itemNumber && found) {
	return true;
} else {
	return false;
}
}