/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SkipStateIfNotNeededTIEnrichment",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_WorkflowProcessing" ],
  "name" : "Skip State If Not Needed (Trade Item Enrichment)",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_BundleArticle", "prd_GiftBoxArticle" ],
  "allObjectTypesValid" : false,
  "runPrivileged" : true,
  "onApprove" : "Never",
  "dependencies" : [ ]
}
*/
/*===== business rule plugin definition =====
{
  "pluginId" : "ReferenceOtherBABusinessAction",
  "parameters" : [ {
    "id" : "ReferencedBA",
    "type" : "com.stibo.core.domain.businessrule.BusinessAction",
    "value" : "ba_SetWorkflowPriorityBasedOnValue"
  } ],
  "pluginType" : "Operation"
}
*/

/*===== business rule plugin definition =====
{
  "pluginId" : "BulkUpdateTriggerStateFlowEvent",
  "parameters" : [ {
    "id" : "currentStateID",
    "type" : "java.lang.String",
    "value" : "PupolateArticleFromTradeItemInformation"
  }, {
    "id" : "eventID",
    "type" : "java.lang.String",
    "value" : "Submit"
  }, {
    "id" : "processNote",
    "type" : "java.lang.String",
    "value" : "Trade Item is not created for GiftBoxes and Bundles"
  }, {
    "id" : "stateFlowID",
    "type" : "java.lang.String",
    "value" : "wf_CreateArticle"
  } ],
  "pluginType" : "Operation"
}
*/
