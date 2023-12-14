/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_StartPrimaryAssetWorkflow",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_AssetRelatedActions" ],
  "name" : "Start Primary Asset Workflow",
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
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_BundleArticle",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_BundleArticle",
    "description" : null
  }, {
    "contract" : "CurrentWorkflowBindContract",
    "alias" : "workflow",
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
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_PackagingUnitEach",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_PackagingUnitEach",
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
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,prd_BundleArticle,workflow,ref_PrimarySourceImage,prd_PackagingUnitEach,att_Stroom,att_ProductType) {
var ImageRejected = node.getWorkflowInstance(workflow).getSimpleVariable('ImageRejected');
var wfi = node.getWorkflowInstanceByID('wf_AddPrimaryAsset');
var wfi2 = node.getWorkflowInstanceByID('wf_RejectAsset');
var isStroom = node.getValue(att_Stroom.getID()).getSimpleValue();
var productType = node.getValue(att_ProductType.getID()).getLOVValue().getID();
var nodeHasImage = node.queryReferences(ref_PrimarySourceImage).asList(0);
log.info(nodeHasImage);

//If source image start workflow
//If RZ level or producttype non food or groepentoesten skip

if (!(isStroom == 'RZ' || productType == '14' || productType == '13') || nodeHasImage.size()>0) {
	if (node.getObjectType().getID() == prd_BundleArticle.getID()) {
		if (!wfi) {
			node.startWorkflowByID('wf_AddPrimaryAsset','Initial');
		}
	} else if (ImageRejected != 'YES' ) {
		if (!wfi && !wfi2) {
			node.startWorkflowByID('wf_AddPrimaryAsset','Initial');
		}
	}

	if (node) {
		node.queryChildren().forEach(function(child) {
			childref = child.queryReferences(ref_PrimarySourceImage).asList(0);
			if (childref.size() > 0 && !child.getObjectType().getID().equals(prd_PackagingUnitEach.getID())) {
				var wfiChild = child.getWorkflowInstanceByID('wf_AddPrimaryAsset');
					if (!wfiChild) {
						child.startWorkflowByID('wf_AddPrimaryAsset','Initial');
					}
			}
			return true;
		});
	}
}
}