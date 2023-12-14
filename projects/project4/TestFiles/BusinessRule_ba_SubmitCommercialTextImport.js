/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SubmitCommercialTextImport",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Forward task for Text writer Enrich on import",
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
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node) {
/*
 * The business rule forwards the product to the next state if the product is in Update Existing Article workflow in the state
 * External Text Write Updates (ExternalTextWriterUpdate) through the event "Done"
 */
if (node.isInState('wf_CreateArticle', 'AddCommercialText')) {
	if (node.getTaskByID('wf_CreateArticle','AddCommercialText')) {
		var triggerResult = node.getTaskByID('wf_CreateArticle','AddCommercialText').triggerByID('Submit','Triggered by Business rule');
		if (triggerResult.isRejectedByScript()) {
			log.info('Unable to move to next state: '+triggerResult.getScriptMessage());
		}
	}
}
}