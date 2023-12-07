/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SetLastChangesFromTIMSLog",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_SetValuesAndLinkes" ],
  "name" : "Set Last Changes from TIMS Log",
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
    "contract" : "AttributeGroupBindContract",
    "alias" : "atg_WFAutomatedValidation",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeGroupImpl",
    "value" : "atg_WFAutomatedValidation",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_LastChangesFromTIMSLog",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_LastChangesFromTIMSLog",
    "description" : null
  }, {
    "contract" : "BusinessFunctionBindContract",
    "alias" : "bf_GetAllObjectsForAnArticle",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>bf_GetAllObjectsForAnArticle</BusinessFunction>\n</BusinessFunctionReference>\n",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,atg_WFAutomatedValidation,att_LastChangesFromTIMSLog,bf_GetAllObjectsForAnArticle) {
/*
 * This functionality will set the attribute Last Changes from TIMS Log (att_LastChangesFromTIMSLog), with all the information which is different
 * between the main and approved workspace, filtered on the attributes, references and data containers as mentioned in the attribute group Automated
 * Validation (atg_WFAutomatedValidation)
 *
 * The changes should be coming from all objects of the article
 *
 */
}