/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_IsArticleInCreationWorkflow",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_WorkflowProcessing" ],
  "name" : "Is Article in Creation Workflow",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_PackagingUnitCase", "prd_PackagingUnitPack", "prd_PackagingUnitPallet" ],
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
    "contract" : "BusinessFunctionBindContract",
    "alias" : "bf_GetArticleFromPackagingUnit",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>bf_GetArticleFromPackagingUnit</BusinessFunction>\n</BusinessFunctionReference>\n",
    "description" : null
  } ],
  "messages" : [ {
    "variable" : "ErrorMessage",
    "message" : "Article {article} has not completed the {workflowName} workflow and has not yet been published. Please complete the article creation before requesting a new packaging unit.",
    "translations" : [ ]
  }, {
    "variable" : "ErrorMessageMigration",
    "message" : "Article {article} has not completed the migration workflow. Please complete all mandatory information on the article creation before requesting a new packaging unit.",
    "translations" : [ ]
  } ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,bf_GetArticleFromPackagingUnit,ErrorMessage,ErrorMessageMigration) {
var article = node.getParent();
var articleName = article.getName();
if(article.isInWorkflow("wf_CreateArticle")){
	errorMessage = new ErrorMessage();
	errorMessage.article = articleName;
	errorMessage.workflowName = "wf_CreateArticle";
	throw errorMessage;
}

if(article.isInWorkflow("wf_CreateArticleOther")){
	errorMessage = new ErrorMessage();
	errorMessage.article = articleName;
	errorMessage.workflowName = "wf_CreateArticleOther";
	throw errorMessage;
}

if(article.isInWorkflow("wf_CompleteMandatoryInfo")){
	errorMessageMigration = new ErrorMessageMigration();
	errorMessageMigration.article = articleName;
	throw errorMessageMigration;
}
}