/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SkipStateIfNotNeededWSUpdate",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_WorkflowProcessing" ],
  "name" : "Skip State If Not Needed (Update Wine Specialist)",
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
    "contract" : "AttributeBindContract",
    "alias" : "att_RejectedForUserGroups",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_RejectedForUserGroups",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_WorkRequiredFromUserGroups",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_WorkRequiredFromUserGroups",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,att_RejectedForUserGroups,att_WorkRequiredFromUserGroups) {
/*If the value of the attribute doesn't contain the specific value for the state then the article needs to be forwarded to the next state
 * Bindings:
 * rejectedForUserGroupsAtt --> Rejected For User Groups (att_RejectedForUserGroups) 
 */
var found = false;
var values = node.getValue(att_RejectedForUserGroups.getID()).getValues().toArray();
var work = node.getValue(att_WorkRequiredFromUserGroups.getID()).getValues().toArray();
for(var x in values){
	logger.info (values[x].getLOVValue().getID());
	if(values[x].getLOVValue().getID().equals("Wine_Specialist")){
		found = true;
	}	
}
for(var z in work){
	logger.info (work[z].getLOVValue().getID());
	if(work[z].getLOVValue().getID().equals("Wine_Specialist")){
		found = true;
	}	
}

logger.info (found);
if(found == false){
	if (node.isInState("wf_UpdateExistingArticle", "WineSpecialistUpdate")) {		
	var triggerResult = node.getTaskByID("wf_UpdateExistingArticle","WineSpecialistUpdate").triggerLaterByID("Done","Triggered by Business rule");
	}
}
}