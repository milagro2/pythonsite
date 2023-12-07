/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SkipStateIfNotNeededSalesPrice",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_WorkflowProcessing" ],
  "name" : "Skip State If Not Needed (Sales Price Enrichment)",
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
    "contract" : "CurrentWorkflowBindContract",
    "alias" : "workflow",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_RejectedForUserGroups",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_RejectedForUserGroups",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,workflow,att_RejectedForUserGroups) {
/*If the value of the attribute doesn't contain the specific value for the state then the article needs to be forwarded to the next state
 * Bindings:
 * rejectedForUserGroupsAtt --> Rejected For User Groups (att_RejectedForUserGroups)
 */
var found = false;
var values = node.getValue(att_RejectedForUserGroups.getID()).getValues().toArray();
for (var x in values) {
	if (values[x].getLOVValue().getID().equals('CategoryAssortmentManagers')) {
		found =true;
		break;
	}
}
if (!found) {
	if (node.getTaskByID(workflow.getID(),'SalesPriceEnrichment')) {
		node.getTaskByID(workflow.getID(),'SalesPriceEnrichment').triggerLaterByID('Submit','Triggered by Business rule');
	}
}
}