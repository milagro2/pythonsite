/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_AddSalesVariantWine",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Add Sales Variant Wine",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article" ],
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
    "contract" : "AttributeBindContract",
    "alias" : "att_InitialSalesPrice",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_InitialSalesPrice",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_OperationalPackagingRoles",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_OperationalPackagingRoles",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_PackagingUnitPack",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_PackagingUnitPack",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_PackagingUnitCase",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_PackagingUnitCase",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,att_InitialSalesPrice,att_OperationalPackagingRoles,prd_PackagingUnitPack,prd_PackagingUnitCase) {
var salesPrice = node.getValue(att_InitialSalesPrice.getID()).getValue();
node.queryChildren().forEach(function(child) {
	if (salesPrice<15) {
		if (child.getObjectType().getID() == prd_PackagingUnitPack.getID() || child.getObjectType().getID() == prd_PackagingUnitCase.getID()) {
			var operationalRole = child.getValue(att_OperationalPackagingRoles.getID()).getSimpleValue();
			if (!operationalRole.contains('Verkoop')) {
				child.getValue(att_OperationalPackagingRoles.getID()).addLOVValueByID('isTradeItemAConsumerUnit');
			}
		}
	}
	return true;
});
}
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
    "alias" : "att_ProductType",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ProductType",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Precondition"
}
*/
exports.precondition0 = function (node,att_ProductType) {
if ('1'.equals(node.getValue(att_ProductType.getID()).getLOVValue().getID())) {
	return true;
} else {
	return false;
}
}