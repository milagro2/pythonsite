/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "bc_IsArticleIncomplete",
  "type" : "BusinessCondition",
  "setupGroups" : [ "brg_MigrationDataQuality" ],
  "name" : "Is Article Incomplete",
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
  "pluginId" : "JavaScriptBusinessConditionWithBinds",
  "binds" : [ {
    "contract" : "CurrentObjectBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "BusinessConditionBindContract",
    "alias" : "bc_IsAllMandatoryInformationCompleted",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessConditionImpl",
    "value" : "bc_IsAllMandatoryInformationCompleted",
    "description" : null
  }, {
    "contract" : "BusinessFunctionBindContract",
    "alias" : "bf_GetAllObjectsForAnArticle",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>bf_GetAllObjectsForAnArticle</BusinessFunction>\n</BusinessFunctionReference>\n",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,bc_IsAllMandatoryInformationCompleted,bf_GetAllObjectsForAnArticle) {
var allObjects = bf_GetAllObjectsForAnArticle.evaluate({node:node}).toArray();
var completeResult ="";
var completeResultNode ="";
var missingList
for(var x in allObjects){
	// Check for each object whether it is complete
	var isObjectComplete = bc_IsAllMandatoryInformationCompleted.evaluate(allObjects[x]);
	if(isObjectComplete.isRejected() || isObjectComplete.isNonApplicable()){
		completeResult = completeResult +"<br/>"+allObjects[x].getID()+" "+allObjects[x].getName()+" is niet compleet. De volgende informatie mist:"+"<br/>"+missingList+"<br/>";
	}
}
// Check for the article itself whether it is complete
var isNodeComplete = bc_IsAllMandatoryInformationCompleted.evaluate(node);
if(isNodeComplete.isRejected() || isNodeComplete.isNonApplicable()){
	completeResultNode = completeResultNode +"<br/>"+node.getID()+" "+node.getName()+" is niet compleet. De volgende informatie mist:"+"<br/>"+missingList+"<br/>";
}

if(!completeResult && !completeResultNode){
	return false;
}else{
	return true;	
}
}