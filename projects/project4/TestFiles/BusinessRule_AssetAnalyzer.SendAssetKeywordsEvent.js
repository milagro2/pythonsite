/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "AssetAnalyzer.SendAssetKeywordsEvent",
  "type" : "BusinessAction",
  "setupGroups" : [ "AssetAnalyzer.SetupGroup" ],
  "name" : "Send Asset Keywords Event",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ ],
  "allObjectTypesValid" : true,
  "runPrivileged" : true,
  "onApprove" : "Never",
  "dependencies" : [ ]
}
*/
/*===== business rule plugin definition =====
{
  "pluginId" : "SendDerivedEventForAssetsBusinessAction",
  "parameters" : [ {
    "id" : "DerivedEvent",
    "type" : "com.stibo.core.domain.eventqueue.DerivedEventType",
    "value" : "Asset Keywords Event"
  }, {
    "id" : "HasEventQueue",
    "type" : "com.stibo.core.domain.haseventqueue.HasEventQueue",
    "value" : "step://eventprocessor?id=AssetAnalyzer.EventProcessor"
  }, {
    "id" : "AssetReferenceTypes",
    "type" : "java.util.List",
    "values" : [ ]
  }, {
    "id" : "AssetTypes",
    "type" : "java.util.List",
    "values" : [ ]
  } ],
  "pluginType" : "Operation"
}
*/
