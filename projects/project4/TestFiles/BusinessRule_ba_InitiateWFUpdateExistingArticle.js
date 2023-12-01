/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_InitiateWFUpdateExistingArticle",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_WorkflowProcessing" ],
  "name" : "Initiate Workflow Update Existing Article",
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
  "pluginId" : "ReferenceOtherBABusinessAction",
  "parameters" : [ {
    "id" : "ReferencedBA",
    "type" : "com.stibo.core.domain.businessrule.BusinessAction",
    "value" : "ba_SetTasteProfileErrorElementsMissing"
  } ],
  "pluginType" : "Operation"
}
*/

/*===== business rule plugin definition =====
{
  "pluginId" : "ReferenceOtherBABusinessAction",
  "parameters" : [ {
    "id" : "ReferencedBA",
    "type" : "com.stibo.core.domain.businessrule.BusinessAction",
    "value" : "ba_SetTasteProfileBOTasteElIfAvailable"
  } ],
  "pluginType" : "Operation"
}
*/

/*===== business rule plugin definition =====
{
  "pluginId" : "ReferenceOtherBABusinessAction",
  "parameters" : [ {
    "id" : "ReferencedBA",
    "type" : "com.stibo.core.domain.businessrule.BusinessAction",
    "value" : "ba_SetTasteProfileErrorNoTPCombo"
  } ],
  "pluginType" : "Operation"
}
*/

/*===== business rule plugin definition =====
{
  "pluginId" : "ReferenceOtherBABusinessAction",
  "parameters" : [ {
    "id" : "ReferencedBA",
    "type" : "com.stibo.core.domain.businessrule.BusinessAction",
    "value" : "ba_AddTasteProfileCombination"
  } ],
  "pluginType" : "Operation"
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
  "messages" : [ {
    "variable" : "ErrorMessage",
    "message" : "Article {article} has not completed the creation workflow and has not yet been published. Please complete the creation before requesting an update.",
    "translations" : [ ]
  }, {
    "variable" : "ErrorMessageMigration",
    "message" : "Article {article} has not completed the migration validation workflow. Please complete the migration workflow before requesting an update.",
    "translations" : [ ]
  } ],
  "pluginType" : "Operation"
}
*/
exports.operation4 = function (node,ErrorMessage,ErrorMessageMigration) {
if (node.isInWorkflow('wf_CreateArticle')) {
	errorMessage = new ErrorMessage();
	errorMessage.article = node.getName();
	throw errorMessage;
}
if (node.isInWorkflow('wf_CompleteMandatoryInfo')) {
	errorMessageMigration = new ErrorMessageMigration();
	errorMessageMigration.article = node.getName();
	throw errorMessageMigration;
}
if (node.isInWorkflow('wf_CreateArticleOther')) {
	errorMessage = new ErrorMessage();
	errorMessage.article = node.getName();
	throw errorMessage;
}
}
/*===== business rule plugin definition =====
{
  "pluginId" : "BulkUpdateInitiateMultipleItemsInWorkflow",
  "parameters" : [ {
    "id" : "processNote",
    "type" : "java.lang.String",
    "value" : "Initiated validation"
  }, {
    "id" : "stateFlowID",
    "type" : "java.lang.String",
    "value" : "wf_UpdateExistingArticle"
  } ],
  "pluginType" : "Operation"
}
*/

/*===== business rule plugin definition =====
{
  "pluginId" : "BulkUpdateTriggerStateFlowEvent",
  "parameters" : [ {
    "id" : "currentStateID",
    "type" : "java.lang.String",
    "value" : "Initial"
  }, {
    "id" : "eventID",
    "type" : "java.lang.String",
    "value" : "AutoForward"
  }, {
    "id" : "processNote",
    "type" : "java.lang.String",
    "value" : "Forwarded to the next state"
  }, {
    "id" : "stateFlowID",
    "type" : "java.lang.String",
    "value" : "wf_UpdateExistingArticle"
  } ],
  "pluginType" : "Operation"
}
*/
