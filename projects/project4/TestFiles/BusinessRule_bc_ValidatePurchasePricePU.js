/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "bc_ValidatePurchasePricePU",
  "type" : "BusinessCondition",
  "setupGroups" : [ "brg_WebUIConditions" ],
  "name" : "Validate Purchase Price PU",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_PackagingUnitCase", "prd_PackagingUnitPack", "prd_PackagingUnitPallet" ],
  "allObjectTypesValid" : false,
  "runPrivileged" : true,
  "onApprove" : "Never",
  "dependencies" : [ ]
}
*/
/*===== business rule plugin definition =====
{
  "pluginId" : "JavaScriptBusinessConditionWithBinds",
  "binds" : [ {
    "contract" : "DataIssuesContextBind",
    "alias" : "messages",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "CurrentObjectBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_PackagingUnitEach",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_PackagingUnitEach",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_InitialPurchasePrice",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_InitialPurchasePrice",
    "description" : null
  }, {
    "contract" : "SimpleValueBindContract",
    "alias" : "att_TransportationCostValue",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_TransportationCost",
    "description" : null
  }, {
    "contract" : "SimpleValueBindContract",
    "alias" : "att_InitialSalesPriceValue",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_InitialSalesPrice",
    "description" : null
  }, {
    "contract" : "SimpleValueBindContract",
    "alias" : "att_PackagingTaxAmountValue",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_PackagingTaxAmount",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_TransportationCost",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_TransportationCost",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_InitialSalesPrice",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_InitialSalesPrice",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_PackagingTaxAmount",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_PackagingTaxAmount",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (messages,node,prd_PackagingUnitEach,att_InitialPurchasePrice,att_TransportationCostValue,att_InitialSalesPriceValue,att_PackagingTaxAmountValue,att_TransportationCost,att_InitialSalesPrice,att_PackagingTaxAmount) {
// Used in webUI:Workflow_CreatePackagingUnit_CommercialEnrichment

var showIssues = false;
var objectType = node.getObjectType().getID();

var attributes = [att_InitialPurchasePrice, att_TransportationCost, att_InitialSalesPrice, att_PackagingTaxAmount];
var attributeValues = [
  att_InitialPurchasePrice,
  att_TransportationCostValue,
  att_InitialSalesPriceValue,
  att_PackagingTaxAmountValue
];

// Early exit?
if(prd_PackagingUnitEach.getID() == objectType) {
	return true;
}

for (var x=0; x < attributes.length; x++){
	var attribute = attributes[x];
	var attributeValue = attributeValues[x];
	var parentValue = node.getParent().getValue(attribute.getID()).getSimpleValue();

	if (parentValue == attributeValue) {
		messages.addError("Pas de " + attribute.getTitle() + " aan naar de juiste prijs voor deze verpakking", node, attribute);
		showIssues = true;	
	}
}

return showIssues ? messages : true;
}