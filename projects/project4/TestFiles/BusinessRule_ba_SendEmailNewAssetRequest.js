/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SendEmailNewAssetRequest",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_WorkflowProcessing" ],
  "name" : "Send Email New Asset Request",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ ],
  "allObjectTypesValid" : true,
  "runPrivileged" : false,
  "onApprove" : "Never",
  "dependencies" : [ ]
}
*/
/*===== business rule plugin definition =====
{
  "pluginId" : "SendEmailBusinessAction",
  "parameters" : [ {
    "id" : "Body",
    "type" : "java.lang.String",
    "value" : "Beste,\n\nEr staat een nieuw packshot verzoek <ref attrid=\"\" dynamicobject=\"true\" equalsign=\"=\" includeattrname=\"false\" objecturl=\"\" resolveto=\"objname\" separator=\";\"/> klaar in de workflow. \n\nDe deadline voor het behandelen van dit verzoek is over 48 uur."
  }, {
    "id" : "Recipients",
    "type" : "java.util.List",
    "values" : [ "@gall@theapsgroup.com" ]
  }, {
    "id" : "Sender",
    "type" : "com.stibo.util.basictypes.EmailRecipient",
    "value" : "@no-reply@gall.nl"
  }, {
    "id" : "Subject",
    "type" : "java.lang.String",
    "value" : "Nieuw packshot verzoek"
  } ],
  "pluginType" : "Operation"
}
*/
