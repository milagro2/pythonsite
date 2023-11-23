/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_InitiateWaitForImage",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_AssetRelatedActions" ],
  "name" : "Initiate Wait For Image",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article", "prd_BundleArticle", "prd_GiftBoxArticle" ],
  "allObjectTypesValid" : false,
  "runPrivileged" : false,
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
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_PrimaryProductImage",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_PrimaryProductImage",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_PrimarySourceImage",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_PrimarySourceImage",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,ref_PrimaryProductImage,ref_PrimarySourceImage) {
//If still in wf_AddPrimaryImage dont submit

var hasChildInState = 0;
if (!(node.isInWorkflow('wf_AddPrimaryAsset') || node.isInWorkflow('wf_RejectAsset'))) {
	node.queryChildren().forEach(function(child) {
		if (child.isInWorkflow('wf_AddPrimaryAsset') || child.isInWorkflow('wf_RejectAsset')) {
			hasChildInState++;
		}
		return true;
	});
	if (node.isInWorkflow('wf_CreateArticle') && hasChildInState==0) {
		node.getTaskByID('wf_CreateArticle','WaitForImage').triggerLaterByID('Submit','Image received');
	} else if (node.isInWorkflow('wf_CreateArticleOther') && hasChildInState==0) {
		node.getTaskByID('wf_CreateArticleOther','WaitForImage').triggerLaterByID('Submit','Image received');
	}
}
}