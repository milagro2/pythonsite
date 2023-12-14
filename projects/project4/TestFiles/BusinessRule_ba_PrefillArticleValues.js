/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_PrefillArticleValues",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Prefill Article Values",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article", "prd_GiftBoxArticle" ],
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
    "contract" : "AttributeBindContract",
    "alias" : "att_Biologic",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_Biologic",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,att_Biologic) {
/**
 * This business rule should run on entry of commercial
 * enrichment state, and is intented to prefill values
 * on the article after TIMS data is avaliable.
 *
 * There is a typescript version of this rule at
 * https://github.com/RoyalAholdDelhaize/gall-step/blob/main/step-leap/src/business-rules/ba_prefillArticleValues.ts
 * please let Kobus know if you make changes to this rule.
 */
var currentValue = node.getValue(att_Biologic.getID()).getSimpleValue();
if (currentValue == null) {
    node.getValue(att_Biologic.getID()).setSimpleValue('Niet biologisch');
}
}