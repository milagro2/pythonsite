/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_InitiateArticleInValidateImportWf",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Initiate Article in Validate Import Workflow",
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
  "pluginId" : "BulkUpdateInitiateMultipleItemsInWorkflow",
  "parameters" : [ {
    "id" : "processNote",
    "type" : "java.lang.String",
    "value" : "Validate info"
  }, {
    "id" : "stateFlowID",
    "type" : "java.lang.String",
    "value" : "wf_ImportArticle"
  } ],
  "pluginType" : "Operation"
}
*/

/*===== business rule plugin definition =====
{
  "pluginId" : "JavaScriptBusinessConditionWithBinds",
  "binds" : [ ],
  "messages" : [ ],
  "pluginType" : "Precondition"
}
*/
exports.precondition0 = function () {
if(node.isInWorkflow("wf_CreateArticle")){
	return false
}else{
	if(node.isInWorkflow("wf_CreateArticleOther")){
		return false
	}else{
		return true
	}
}