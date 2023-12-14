/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "bc_IsTradeItemChanged",
  "type" : "BusinessCondition",
  "setupGroups" : [ "brg_Conditions" ],
  "name" : "Is Trade Item Changed",
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
  "pluginId" : "JavaScriptBusinessConditionWithBinds",
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
    "contract" : "AttributeGroupBindContract",
    "alias" : "atg_TIIArticle_VisualCheck",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeGroupImpl",
    "value" : "atg_TIIArticle_VisualCheck",
    "description" : null
  }, {
    "contract" : "AttributeGroupBindContract",
    "alias" : "atg_TIIPack_VisualCheck",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeGroupImpl",
    "value" : "atg_TIIPack_VisualCheck",
    "description" : null
  }, {
    "contract" : "AttributeGroupBindContract",
    "alias" : "atg_TIIArticle_AlwaysOverwrite",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeGroupImpl",
    "value" : "atg_TIIArticle_AlwaysOverwrite",
    "description" : null
  }, {
    "contract" : "AttributeGroupBindContract",
    "alias" : "atg_TIIPack_AlwaysOverwrite",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeGroupImpl",
    "value" : "atg_TIIPack_AlwaysOverwrite",
    "description" : null
  }, {
    "contract" : "BusinessFunctionBindContract",
    "alias" : "bf_GetChangedAttributesTI",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>bf_GetChangedAttributesTI</BusinessFunction>\n</BusinessFunctionReference>\n",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,manager,atg_TIIArticle_VisualCheck,atg_TIIPack_VisualCheck,atg_TIIArticle_AlwaysOverwrite,atg_TIIPack_AlwaysOverwrite,bf_GetChangedAttributesTI) {
var notificationString = bf_GetChangedAttributesTI.evaluate({node: node});

if (notificationString != '[]') {
	return true;
} else {
	return false;
}
}