/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_WineSpecialistUpdatesforwardOnImport",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Forward task for Wine Specialist Update on Import",
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
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,manager) {
/*
 * The business rule forwards the product to the next state if the product is in Update Article workflow
 * in the state Update Wine Specialist through the event "Done"
 *
 */

if (node.isInState('wf_UpdateExistingArticle', 'WineSpecialistUpdate')) {
	if (node.getTaskByID('wf_UpdateExistingArticle','WineSpecialistUpdate')) {
		triggerResult = node.getTaskByID('wf_UpdateExistingArticle','WineSpecialistUpdate').triggerByID('Done','Triggered by Business rule');
		if (triggerResult.isRejectedByScript()) {
			log.info('Unable to move to next state: '+triggerResult.getScriptMessage());
		}
	}
}
}