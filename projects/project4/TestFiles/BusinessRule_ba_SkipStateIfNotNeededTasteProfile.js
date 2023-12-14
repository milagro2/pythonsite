/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SkipStateIfNotNeededTasteProfile",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_WorkflowProcessing" ],
  "name" : "Skip State If Not Needed (Taste Profile Enrichment)",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article", "prd_GiftBoxArticle" ],
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
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "pte_TasteProfile",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "pte_TasteProfile",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_ProductType",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ProductType",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,workflow,att_RejectedForUserGroups,pte_TasteProfile,att_ProductType) {
/*If product category is not 'Wijn' then submit to next state, else
/*If the value of the attribute doesn't contain the specific value for the state then the article needs to be forwarded to the next state
 * Bindings:
 * rejectedForUserGroupsAtt --> Rejected For User Groups (att_RejectedForUserGroups)
 */
if (!node.getValue(att_ProductType.getID()).getLOVValue().getID().equals('1')) {
	if (node.getTaskByID(workflow.getID(),'SetTasteProfileInfo')) {
		node.getTaskByID(workflow.getID(),'SetTasteProfileInfo').triggerLaterByID('Submit','Taste profile is not applicable for this product category');
	}
} else {
	var found = false;
	var values = node.getValue(att_RejectedForUserGroups.getID()).getValues().toArray();
	for (var x in values) {
		if (values[x].getLOVValue().getID().equals('WBC')) {
			found =true;
			break;
		}
	}

	if (!found || node.queryReferences(pte_TasteProfile).asList(1).size() > 0) {
		if (node.getTaskByID(workflow.getID(),'SetTasteProfileInfo')) {
			node.getTaskByID(workflow.getID(),'SetTasteProfileInfo').triggerLaterByID('Submit','Taste profile has already been validated');
		}
	}
}
}