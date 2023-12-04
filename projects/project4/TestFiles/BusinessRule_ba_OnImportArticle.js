/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_OnImportArticle",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "On Import Article",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ ],
  "allObjectTypesValid" : true,
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
  }, {
    "contract" : "BusinessActionBindContract",
    "alias" : "ba_MoveToCorrectLevel1",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessActionImpl",
    "value" : "ba_MoveToCorrectLevel1",
    "description" : null
  }, {
    "contract" : "BusinessActionBindContract",
    "alias" : "ba_SetDataProviderBasedOnGLN",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessActionImpl",
    "value" : "ba_SetDataProviderBasedOnGLN",
    "description" : null
  }, {
    "contract" : "BusinessActionBindContract",
    "alias" : "ba_InitiateInCreateArticleWorkflow",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessActionImpl",
    "value" : "ba_InitiateInCreateArticleWorkflow",
    "description" : null
  }, {
    "contract" : "BusinessActionBindContract",
    "alias" : "ba_InitiateInCreateArticleOtherWF",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessActionImpl",
    "value" : "ba_InitiateInCreateArticleOtherWF",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,manager,ba_MoveToCorrectLevel1,ba_SetDataProviderBasedOnGLN,ba_InitiateInCreateArticleWorkflow,ba_InitiateInCreateArticleOtherWF) {
if(node!=null && manager.getProductHome().getProductByID(node.getID())!=null){
	ba_MoveToCorrectLevel1.execute(node);
	ba_SetDataProviderBasedOnGLN.execute(node);
	ba_InitiateInCreateArticleWorkflow.execute(node);
	ba_InitiateInCreateArticleOtherWF.execute(node);
	return true;
} else{
	// Node does not exist.
	return false;
}
}
/*===== business rule plugin definition =====
{
  "pluginId" : "JavaScriptBusinessConditionWithBinds",
  "binds" : [ {
    "contract" : "CurrentObjectBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Precondition"
}
*/
exports.precondition0 = function (node) {
if (node.isInWorkflow('wf_CreateArticle') || node.isInWorkflow('wf_CreateArticleOther')) {
	return false;
} else {
	return true;
}
}