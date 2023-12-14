/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SetInitialPricingAttributes",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_SetValuesAndLinkes" ],
  "name" : "Set Initial Pricing Attributes",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article", "prd_BundleArticle", "prd_GiftBoxArticle" ],
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
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "LoggerBindContract",
    "alias" : "log",
    "parameterClass" : "null",
    "value" : null,
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
exports.operation0 = function (node,manager,log,att_TransportationCost,att_InitialSalesPrice,att_PackagingTaxAmount) {
//Get variables.
var transPrice = node.getValue(att_TransportationCost.getID()).getSimpleValue();
var salesPrice = node.getValue(att_InitialSalesPrice.getID()).getSimpleValue();
var packPrice = node.getValue(att_PackagingTaxAmount.getID()).getSimpleValue();

if (!transPrice) {
	node.getValue(att_TransportationCost.getID()).setSimpleValue('0.0000');
}

if (!salesPrice) {
	node.getValue(att_InitialSalesPrice.getID()).setSimpleValue('0.0000');
}

if (!packPrice) {
	node.getValue(att_PackagingTaxAmount.getID()).setSimpleValue('0.0000');
}
}