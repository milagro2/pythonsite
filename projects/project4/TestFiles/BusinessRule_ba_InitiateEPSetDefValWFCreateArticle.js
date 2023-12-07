/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_InitiateEPSetDefValWFCreateArticle",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_WorkflowProcessing" ],
  "name" : "Initiate in Event Processor Set Default Values for Workflow Create Article",
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
    "contract" : "EventQueueBinding",
    "alias" : "ep_SetDefaultValuesForWrkflwCreateArt",
    "parameterClass" : "com.stibo.core.domain.impl.eventprocessor.EventProcessorImpl",
    "value" : "step://eventprocessor?id=ep_SetDefaultValuesForWrkflwCreateArt",
    "description" : null
  }, {
    "contract" : "DerivedEventTypeBinding",
    "alias" : "SetValuesForWorkflowCreateArticle",
    "parameterClass" : "com.stibo.core.domain.impl.eventqueue.DerivedEventTypeImpl",
    "value" : "SetValuesForWorkflowCreateArticle",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,ep_SetDefaultValuesForWrkflwCreateArt,SetValuesForWorkflowCreateArticle) {
ep_SetDefaultValuesForWrkflwCreateArt.queueDerivedEvent(SetValuesForWorkflowCreateArticle, node);
logger.info("EP/done");
}