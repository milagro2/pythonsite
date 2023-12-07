/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_InitiateInboundCosmos2StepPrices",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_InitiateInEP" ],
  "name" : "Initiate Inbound Cosmos2Step Prices",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_PackagingUnitCase", "prd_PackagingUnitEach", "prd_PackagingUnitPack" ],
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
    "contract" : "DerivedEventTypeBinding",
    "alias" : "OnImportCOSMOSPrice",
    "parameterClass" : "com.stibo.core.domain.impl.eventqueue.DerivedEventTypeImpl",
    "value" : "OnImportCOSMOSPrice",
    "description" : null
  }, {
    "contract" : "EventQueueBinding",
    "alias" : "ep_InboundCosmos2StepPrices",
    "parameterClass" : "com.stibo.core.domain.impl.eventprocessor.EventProcessorImpl",
    "value" : "step://eventprocessor?id=ep_InboundCosmos2StepPrices",
    "description" : null
  }, {
    "contract" : "CurrentObjectBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (OnImportCOSMOSPrice,ep_InboundCosmos2StepPrices,node) {
ep_InboundCosmos2StepPrices.queueDerivedEvent(OnImportCOSMOSPrice, node);
logger.info("EP/done");
}