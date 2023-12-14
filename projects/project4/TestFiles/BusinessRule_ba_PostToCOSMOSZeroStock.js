/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_PostToCOSMOSZeroStock",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Post to COSMOS (Zero Stock Workflow)",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article", "prd_BundleArticle", "prd_GiftBoxArticle" ],
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
    "contract" : "CurrentObjectBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "BusinessActionBindContract",
    "alias" : "ba_PostEventToCOSMOSArt",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessActionImpl",
    "value" : "ba_PostEventToCOSMOSArt",
    "description" : null
  }, {
    "contract" : "BusinessActionBindContract",
    "alias" : "ba_PostEventToReflexArt",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessActionImpl",
    "value" : "ba_PostEventToReflexArt",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,ba_PostEventToCOSMOSArt,ba_PostEventToReflexArt) {
node.queryChildren().forEach(function(child) {
	ba_PostEventToCOSMOSArt.execute(child);
	log.info(child.getID()+' posted to COSMOS');
	return true;
});
if (node.getObjectType().getID().equals('prd_BundleArticle')) {
	ba_PostEventToCOSMOSArt.execute(node);
}
// commented out DS 13-04-2023: Creates unneccasary events for outbound to reflex... changes handled via evp.
log.info(node.getID()+' posted to Reflex');
ba_PostEventToReflexArt.execute(node);
}