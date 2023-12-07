/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_ApproveWholeArticle",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Approve Complete Article",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article", "prd_BundleArticle", "prd_GiftBoxArticle", "prd_PackagingUnitCase", "prd_PackagingUnitEach", "prd_PackagingUnitPack", "prd_PackagingUnitPallet", "prd_ProductFamily" ],
  "allObjectTypesValid" : false,
  "runPrivileged" : false,
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
    "value" : "ba_SetGrapeVarietyWithoutVariable"
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
    "value" : "ba_SetDefaultAwardStartEndDate"
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
    "value" : "ba_SetCowhillsLink"
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
    "value" : "ba_SeteCommerceLink"
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
    "value" : "ba_SetAHLink"
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
    "value" : "ba_SetExpiryGroup"
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
  }, {
    "contract" : "BusinessFunctionBindContract",
    "alias" : "bf_GetReferenceTargets",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>bf_GetReferenceTargets</BusinessFunction>\n</BusinessFunctionReference>\n",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_NutritionalInformation",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_NutritionalInformation",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_PackagingMaterialInformation",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_PackagingMaterialInformation",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ptp_PartnerArticle",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ptp_PartnerArticle",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_Awards",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_Awards",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_Brand",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_Brand",
    "description" : null
  }, {
    "contract" : "BusinessActionBindContract",
    "alias" : "ba_PostEventToCOSMOSArt",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessActionImpl",
    "value" : "ba_PostEventToCOSMOSArt",
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
  }, {
    "contract" : "BusinessFunctionBindContract",
    "alias" : "bf_GetMissingMandatoryAttributes",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>bf_GetMissingMandatoryAttributes</BusinessFunction>\n</BusinessFunctionReference>\n",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "pte_GoodsSupplier",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "pte_GoodsSupplier",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_SupplierArticleCode",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_SupplierArticleCode",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_ValidityStartDate",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ValidityStartDate",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_ValidityEndDate",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ValidityEndDate",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_VintageDescription",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_VintageDescription",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_VisibleShelfLabel",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_VisibleShelfLabel",
    "description" : null
  }, {
    "contract" : "BusinessFunctionBindContract",
    "alias" : "bf_GetArticleFromPackagingUnit",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>bf_GetArticleFromPackagingUnit</BusinessFunction>\n</BusinessFunctionReference>\n",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "pte_TasteProfile",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "pte_TasteProfile",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_COSMOSNumber",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_COSMOSNumber",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_PrimarySourceImage",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_PrimarySourceImage",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_PartnerProductImage",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_PartnerProductImage",
    "description" : null
  } ],
  "messages" : [ {
    "variable" : "UserMessage",
    "message" : "{result}",
    "translations" : [ ]
  }, {
    "variable" : "ErrorWorkflow",
    "message" : "{result}",
    "translations" : [ ]
  } ],
  "pluginType" : "Operation"
}
*/
exports.operation6 = function (node,bf_GetReferenceTargets,ref_NutritionalInformation,ref_PackagingMaterialInformation,ptp_PartnerArticle,ref_Awards,ref_Brand,ba_PostEventToCOSMOSArt,bc_IsAllMandatoryInformationCompleted,bf_GetAllObjectsForAnArticle,bf_GetMissingMandatoryAttributes,pte_GoodsSupplier,att_SupplierArticleCode,att_ValidityStartDate,att_ValidityEndDate,att_VintageDescription,att_VisibleShelfLabel,bf_GetArticleFromPackagingUnit,pte_TasteProfile,att_COSMOSNumber,ref_PrimarySourceImage,ref_PartnerProductImage,UserMessage,ErrorWorkflow) {
/*
 * The functionality checks whether all mandatory information is completed for the entire article
 *
 * - Get all objects for the article
 * - Check for each object whether it is complete
 * - Check for the article itself whether it is complete
 * - Combine the results and present them to the user
 *
 */
var allObjects = bf_GetAllObjectsForAnArticle.evaluate({node: node}).toArray();
var article;
var completeResult ='';
var completeResultNode ='';
var completeResultAward ='';
var completeResultGoodsSupplier='';
var completeResultTasteProfile='';
var missingList;
if (node.getObjectType().getID().equals('prd_Article')) {
	article = node;
} else {
	article = bf_GetArticleFromPackagingUnit.evaluate({node: node});
}
var workflowCreate = article.isInWorkflow('wf_CreateArticle');
var workflowCreateOther = article.isInWorkflow('wf_CreateArticleOther');
var workflowUpdate = article.isInWorkflow('wf_UpdateExistingArticle');

if (workflowCreate || workflowCreateOther || workflowUpdate) {
	var errorWorkflow = new ErrorWorkflow();
	var errorArt = article.getID()+' '+article.getName();
	var errorWf;
	if (workflowCreate || workflowCreateOther) {
		errorWf = 'Create workflow';
	} else {
		errorWf = 'Update workflow';
	}
	errorWorkflow.result = errorArt + " is in workflow " + errorWf + ". Please complete the workflow before approving.";
	throw errorWorkflow.result;
} else {
	if (node.getObjectType().getID().equals('prd_Article')) {
		article = node;
		log.info('Article Object:'+article.getID());
		for (var x in allObjects) {
		// Check for each object whether it is complete
		var isObjectComplete = bc_IsAllMandatoryInformationCompleted.evaluate(allObjects[x]);
		if (isObjectComplete.isRejected() || isObjectComplete.isNonApplicable()) {
			missingList = bf_GetMissingMandatoryAttributes.evaluate({node: allObjects[x]});
			completeResult = completeResult +'<br/>'+allObjects[x].getID()+' '+allObjects[x].getName()+' is not complete. Following information are missing:'+'<br/>'+missingList+'<br/>';
			}
		//Check if Supplier article code has been entered on the Goods Supplier reference
		var referencesGoodsSuplier = allObjects[x].queryReferences(pte_GoodsSupplier).asList(10);
		if (referencesGoodsSuplier.size()>0) {
			if (!referencesGoodsSuplier.get(0).getValue(att_SupplierArticleCode.getID()).getSimpleValue()) {
				completeResultGoodsSupplier = completeResultGoodsSupplier+'<br/>'+allObjects[x].getID()+' '+allObjects[x].getName()+' is not complete. External Artikelnummer on the Goods Supplier reference is missing.';
			}
		}
		}
		// Check for the article itself whether it is complete
		var isNodeComplete = bc_IsAllMandatoryInformationCompleted.evaluate(node);
		if (isNodeComplete.isRejected() || isNodeComplete.isNonApplicable()) {
			missingList = bf_GetMissingMandatoryAttributes.evaluate({node: node});
			completeResultNode = completeResultNode +'<br/>'+node.getID()+' '+node.getName()+' is not complete. Following information are missing:'+'<br/>'+missingList+'<br/>';
		}
	} else {
		article = bf_GetArticleFromPackagingUnit.evaluate({node: node});
		log.info('Article from PU:'+article.getID());
		// Check for the PU itself whether it is complete
		var isNodeComplete = bc_IsAllMandatoryInformationCompleted.evaluate(node);
		if (isNodeComplete.isRejected() || isNodeComplete.isNonApplicable()) {
			missingList = bf_GetMissingMandatoryAttributes.evaluate({node: node});
			completeResultNode = completeResultNode +'<br/>'+node.getID()+' '+node.getName()+' is not complete. Following information are missing:'+'<br/>'+missingList+'<br/>';
		}
		var isArticleComplete = bc_IsAllMandatoryInformationCompleted.evaluate(article);
		if (isArticleComplete.isRejected() || isArticleComplete.isNonApplicable()) {
			missingList = bf_GetMissingMandatoryAttributes.evaluate({node: article});
			completeResult = completeResult +'<br/>'+article.getID()+' '+article.getName()+' is not complete. Following information are missing:'+'<br/>'+missingList+'<br/>';
		}
	}


	//Check if all mandatory attributes on the reference have been populated
	var referencesAwards = article.queryReferences(ref_Awards).asList(10);
	if (referencesAwards.size()>0) {
		article.queryReferences(ref_Awards).forEach(function(awardReference) {
			if (!awardReference.getValue(att_ValidityStartDate.getID()).getSimpleValue() ||
			    !awardReference.getValue(att_ValidityEndDate.getID()).getSimpleValue() ||
			    !awardReference.getValue(att_VintageDescription.getID()).getSimpleValue() ||
			    !awardReference.getValue(att_VisibleShelfLabel.getID()).getSimpleValue()) {
			    completeResultAward = completeResultAward+'<br/>'+article.getID()+' '+article.getName()+' is not complete. Please populate all mandatory information on the Award reference '+ awardReference.getTarget().getName();
			    }
				return true;
		});
	}

	var referencesTasteProfile = node.queryReferences(pte_TasteProfile).asList(10);
	if (referencesTasteProfile.size()>0) {
		if (!referencesTasteProfile.get(0).getValue(att_COSMOSNumber.getID()).getSimpleValue()) {
			completeResultTasteProfile = completeResultTasteProfile+'<br/>'+node.getID()+' '+node.getName()+' is missing the COSMOS Number for the Taste Profile. Please ask your Admin to enter this information.';
		}
	}


	//Return error message if relevant
	if (!completeResult && !completeResultNode && !completeResultGoodsSupplier && !completeResultAward && !completeResultTasteProfile) {
		//Approve node and referenced objects
		var nutrientInformationObjects = bf_GetReferenceTargets.evaluate({referenceSource: article, referenceType: ref_NutritionalInformation}).toArray();
		for (var x in nutrientInformationObjects) {
			nutrientInformationObjects[x].approve();
		}
		var tradeItObjects = bf_GetReferenceTargets.evaluate({referenceSource: article, referenceType: ptp_PartnerArticle}).toArray();
		for (var z in tradeItObjects) {
			tradeItObjects[z].approve();
		}

		var partnerProductImages = bf_GetReferenceTargets.evaluate({referenceSource: node, referenceType: ref_PartnerProductImage}).toArray();
		if (partnerProductImages) {
			for (var b in partnerProductImages) {
				partnerProductImages[b].approve();
			}
		}

		var sourceImages = bf_GetReferenceTargets.evaluate({referenceSource: node, referenceType: ref_PrimarySourceImage}).toArray();
		if (sourceImages) {
			for (var c in sourceImages) {
				sourceImages[c].approve();
			}
		}


		var approvalStatus = node.getApprovalStatus();
		//Approve packaging units and referenced objects
		var packagingUnits = node.getChildren().toArray();
		for (var y in packagingUnits) {
			var packagingMaterialObjects = bf_GetReferenceTargets.evaluate({referenceSource: packagingUnits[y], referenceType: ref_PackagingMaterialInformation}).toArray();
			for (var a in packagingMaterialObjects) {
				packagingMaterialObjects[a].approve();
			}
			var tradeItemObjects = bf_GetReferenceTargets.evaluate({referenceSource: packagingUnits[y], referenceType: ptp_PartnerArticle}).toArray();
			for (var b in tradeItemObjects) {
				tradeItemObjects[b].approve();
			}
			var approvalStatusPU = packagingUnits[y].getApprovalStatus();
			if (approvalStatusPU != 'Completely Approved') {
				packagingUnits[y].approve();
				//postCOMOS.execute(packagingUnits[y]);
				log.info('PU posted to COSMOS');
			}
		}
		if (approvalStatus != 'Completely Approved') {
			node.approve();
			article.approve();
			if (!node.getObjectType().getID().equals('prd_Article')) {
				//postCOMOS.execute(node);
				log.info('Posted to COSMOS');
			}
		}
		} else {
		errorMessage = new UserMessage();
		errorMessage.result = completeResult+completeResultNode+completeResultGoodsSupplier+completeResultAward+completeResultTasteProfile;
		throw errorMessage.result;
	}
}
}
/*===== business rule plugin definition =====
{
  "pluginId" : "ReferenceOtherBCBusinessCondition",
  "parameters" : [ {
    "id" : "ReferencedBC",
    "type" : "com.stibo.core.domain.businessrule.BusinessCondition",
    "value" : "bc_IsThereExactlyOneOrderablePackUnit"
  }, {
    "id" : "ValueWhenReferencedIsNA",
    "type" : "com.stibo.util.basictypes.TrueFalseParameter",
    "value" : "true"
  } ],
  "pluginType" : "Precondition"
}
*/

/*===== business rule plugin definition =====
{
  "pluginId" : "ReferenceOtherBCBusinessCondition",
  "parameters" : [ {
    "id" : "ReferencedBC",
    "type" : "com.stibo.core.domain.businessrule.BusinessCondition",
    "value" : "bc_IsThereAtLeastOneConsumerPackUnit"
  }, {
    "id" : "ValueWhenReferencedIsNA",
    "type" : "com.stibo.util.basictypes.TrueFalseParameter",
    "value" : "true"
  } ],
  "pluginType" : "Precondition"
}
*/

/*===== business rule plugin definition =====
{
  "pluginId" : "ReferenceOtherBCBusinessCondition",
  "parameters" : [ {
    "id" : "ReferencedBC",
    "type" : "com.stibo.core.domain.businessrule.BusinessCondition",
    "value" : "bc_IsThereExactlyOneActiveAward"
  }, {
    "id" : "ValueWhenReferencedIsNA",
    "type" : "com.stibo.util.basictypes.TrueFalseParameter",
    "value" : "true"
  } ],
  "pluginType" : "Precondition"
}
*/

/*===== business rule plugin definition =====
{
  "pluginId" : "ReferenceOtherBCBusinessCondition",
  "parameters" : [ {
    "id" : "ReferencedBC",
    "type" : "com.stibo.core.domain.businessrule.BusinessCondition",
    "value" : "bc_ValidateArticleeComInfo"
  }, {
    "id" : "ValueWhenReferencedIsNA",
    "type" : "com.stibo.util.basictypes.TrueFalseParameter",
    "value" : "true"
  } ],
  "pluginType" : "Precondition"
}
*/
