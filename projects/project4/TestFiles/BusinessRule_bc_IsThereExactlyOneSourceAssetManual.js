/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "bc_IsThereExactlyOneSourceAssetManual",
  "type" : "BusinessCondition",
  "setupGroups" : [ "brg_AssetRelatedConditions" ],
  "name" : "Is There Exactly One Source Asset - MANUAL",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article", "prd_GiftBoxArticle", "prd_PackagingUnitCase", "prd_PackagingUnitEach", "prd_PackagingUnitPallet" ],
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
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_PrimarySourceImage",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_PrimarySourceImage",
    "description" : null
  }, {
    "contract" : "CurrentWorkflowBindContract",
    "alias" : "workflow",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_Stroom",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_Stroom",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_ProductType",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ProductType",
    "description" : null
  } ],
  "messages" : [ {
    "variable" : "InvalidMessageImage",
    "message" : "Please select a Primary Source Image or Press \"Reject Image Sources\" to continue with the workflow. ",
    "translations" : [ {
      "language" : "nl",
      "message" : "Selecteer een primaire bronafbeelding voor packshot of druk op \"Reject Image Source\" om door te gaan met de workflow."
    } ]
  }, {
    "variable" : "InvalidMessageReject",
    "message" : "Please select a Primary Source Image to continue",
    "translations" : [ {
      "language" : "nl",
      "message" : "Selecteer een primaire bronafbeelding voor packshot om door te gaan"
    } ]
  } ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,ref_PrimarySourceImage,workflow,att_Stroom,att_ProductType,InvalidMessageImage,InvalidMessageReject) {
var image = node.queryReferences(ref_PrimarySourceImage).asList(10);
var isStroom = node.getValue(att_Stroom.getID()).getSimpleValue();
var productType = node.getValue(att_ProductType.getID()).getLOVValue().getID();

if (!(isStroom == 'RZ' || productType == '14' || productType == '13')) {
	if (node.isInState('wf_CreateArticle', 'EnrichmentParallel') || node.isInState('wf_CreateArticleOther', 'EnrichmentParallel' )) {
		var ImageRejected = node.getWorkflowInstance(workflow).getSimpleVariable('ImageRejected');
			if (image.size()==0 && ImageRejected != 'YES' ) {
			var errorImage = new InvalidMessageImage();
			errorImage.no= node.getID() + ' - ' + node.getName();
			return errorImage;
		}
	} else if (node.isInState('wf_RejectAsset','NewImageRequired')) {
		if (image.size()==0) {
			var errorImage = new InvalidMessageReject();
			errorImage.no= node.getID() + ' - ' + node.getName();
			return errorImage;
		}
	}
}
return true;
}