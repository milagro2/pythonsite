/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SkipStateIfNotNeededGiftCopy",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_WorkflowProcessing" ],
  "name" : "Skip State If Not Needed GiftBox",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_BundleArticle", "prd_GiftBoxArticle" ],
  "allObjectTypesValid" : false,
  "runPrivileged" : false,
  "onApprove" : "Never",
  "dependencies" : [ ]
}
*/
/*===== business rule plugin definition =====
{
  "pluginId" : "BulkUpdateTriggerStateFlowEvent",
  "parameters" : [ {
    "id" : "currentStateID",
    "type" : "java.lang.String",
    "value" : "IsItPromotion"
  }, {
    "id" : "eventID",
    "type" : "java.lang.String",
    "value" : "Giftbox"
  }, {
    "id" : "processNote",
    "type" : "java.lang.String",
    "value" : ""
  }, {
    "id" : "stateFlowID",
    "type" : "java.lang.String",
    "value" : "wf_CreateArticle"
  } ],
  "pluginType" : "Operation"
}
*/
