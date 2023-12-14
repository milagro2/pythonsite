/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SubmitGiftboxPromoBundle",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_WorkflowProcessing" ],
  "name" : "Submit Giftbox or Promo",
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
    "contract" : "AttributeBindContract",
    "alias" : "att_WorkflowPriority",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_WorkflowPriority",
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
exports.operation0 = function (node,att_WorkflowPriority,manager) {
var objectType = node.getObjectType().getID();
var workflowPrio = node.getValue(att_WorkflowPriority.getID()).getValue();
var isInWf = node.isInState('wf_CreateArticle', 'IsItPromotion');

if (isInWf) {
	switch (String(objectType)) {
		case 'prd_Article':
			if (workflowPrio == 'Promotion') {
				node.getTaskByID('wf_CreateArticle','IsItPromotion').triggerLaterByID('Promotion','Promotion item, triggered by Business rule');
			} else {
				node.getTaskByID('wf_CreateArticle','IsItPromotion').triggerLaterByID('Submit','Requires Copywriter, triggered by Business rule');
			}
			break;

		case 'prd_BundleArticle':
			node.getTaskByID('wf_CreateArticle','IsItPromotion').triggerLaterByID('Giftbox','Bundle, triggered by Business rule');
			break;

		case 'prd_GiftBoxArticle':
			node.getTaskByID('wf_CreateArticle','IsItPromotion').triggerLaterByID('Giftbox','Giftbox, triggered by Business rule');
			break;

		default:
			break;
	}
}
}