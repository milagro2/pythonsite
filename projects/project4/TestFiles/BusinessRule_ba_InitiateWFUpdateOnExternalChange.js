/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_InitiateWFUpdateOnExternalChange",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_WorkflowProcessing" ],
  "name" : "Initiate Workflow Update Existing Article on External Change",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_PackagingUnitCase", "prd_PackagingUnitEach", "prd_PackagingUnitPack", "prd_PackagingUnitPallet", "prd_TradeItem" ],
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
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_TradeItem",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_TradeItem",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_LinkedTradeItems",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_LinkedTradeItems",
    "description" : null
  }, {
    "contract" : "BusinessFunctionBindContract",
    "alias" : "bf_GetArticleFromPackagingUnit",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>bf_GetArticleFromPackagingUnit</BusinessFunction>\n</BusinessFunctionReference>\n",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_InformationToBeValidated",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_InformationToBeValidated",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,prd_TradeItem,ref_LinkedTradeItems,bf_GetArticleFromPackagingUnit,att_InformationToBeValidated) {
/*
 * The functionality will initiate the article(s) in the update existing workflow, based on external changes (either trade items or vintage updates from LISA)
 * - If the change is done on a trade item, then the article linked to the trade item (including linked through a packaging unit) needs to be added to the workflow
 *   and forwarded to the trade item change.
 * - If the changes is coming from COSMOS or LISA (Vintage change) then the article needs to be added to the workflow and forwarded to the auto validation of updates
 *
 */

if (node.getObjectType().getID() == prd_TradeItem.getID()) {
	var references = node.getReferencedByProducts().toArray();
	for (var x in references) {
		if (references[x].getReferenceType().getID() == ref_LinkedTradeItems.getID()) {
			var article = bf_GetArticleFromPackagingUnit.evaluate({node: references[x].getSource()});
			if (article && article.isInWorkflow('wf_UpdateExistingArticle') == false) {
				article.startWorkflowByID('wf_UpdateExistingArticle', 'Initiated based on trade item change');
				article.getTaskByID('wf_UpdateExistingArticle', 'Initial').triggerByID('AutoForward', '');
			}
		}
	}
} else {
	var article = bf_GetArticleFromPackagingUnit.evaluate({node: node});
	if (article && article.isInWorkflow('wf_UpdateExistingArticle') == false) {
    // TODO: This should probably not be set here. Rethink a cleaner flow.
    var vintage = String(article.getValue("att_Vintage").getSimpleValue());
		article.getValue(att_InformationToBeValidated.getID()).addValue("Vintage Updated to " + vintage);
		article.startWorkflowByID('wf_UpdateExistingArticle', 'Initiated based on vintage change');
		article.getTaskByID('wf_UpdateExistingArticle', 'Initial').triggerByID('AutoForward', '');
	}
}
}