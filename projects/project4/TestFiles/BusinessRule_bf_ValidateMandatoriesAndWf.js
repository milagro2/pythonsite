/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "bf_ValidateMandatoriesAndWf",
  "type" : "BusinessFunction",
  "setupGroups" : [ "brg_FunctionValidations" ],
  "name" : "Validate Mandatories and WF State",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ ],
  "allObjectTypesValid" : true,
  "runPrivileged" : false,
  "onApprove" : "Never",
  "dependencies" : [ ]
}
*/
/*===== business rule plugin definition =====
{
  "pluginId" : "JavaScriptBusinessFunctionWithBinds",
  "binds" : [ {
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
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_DataProvider",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_DataProvider",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "pte_GoodsSupplier2",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "pte_GoodsSupplier2",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_GlobalLocationNumber",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_GlobalLocationNumber",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation",
  "functionReturnType" : "java.util.List<java.lang.String>",
  "functionParameterBinds" : [ {
    "contract" : "NodeBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : ""
  } ]
}
*/
exports.operation0 = function (bf_GetReferenceTargets,ref_NutritionalInformation,ref_PackagingMaterialInformation,ptp_PartnerArticle,ref_Awards,ref_Brand,bc_IsAllMandatoryInformationCompleted,bf_GetAllObjectsForAnArticle,bf_GetMissingMandatoryAttributes,pte_GoodsSupplier,att_SupplierArticleCode,att_ValidityStartDate,att_ValidityEndDate,att_VintageDescription,att_VisibleShelfLabel,bf_GetArticleFromPackagingUnit,pte_TasteProfile,att_COSMOSNumber,ref_PrimarySourceImage,ref_PartnerProductImage,ref_DataProvider,pte_GoodsSupplier2,att_GlobalLocationNumber,node) {
/*
 * The functionality checks whether all mandatory information is completed for the entire article
 *
 * - Get all objects for the article
 * - Check for each object whether it is complete
 * - Check for the article itself whether it is complete
 * - Combine the results and present them to the user
 *
 */
var errorLog = new java.util.ArrayList();
var allObjects = bf_GetAllObjectsForAnArticle.evaluate({node: node}).toArray();
var article;

if (node.getObjectType().getID().equals('prd_Article')) {
	article = node;
} else {
	article = bf_GetArticleFromPackagingUnit.evaluate({node: node});
}
var workflowCreate = article.isInWorkflow('wf_CreateArticle');
var workflowCreateOther = article.isInWorkflow('wf_CreateArticleOther');
var workflowUpdate = article.isInWorkflow('wf_UpdateExistingArticle');

if (workflowCreate || workflowCreateOther) {
	var errorArt = article.getID()+' '+article.getName();
	var errorWf;
	if (workflowCreate || workflowCreateOther) {
		errorWf = 'Create workflow';
	} else {
		errorWf = 'Update workflow';
	}
	errorLog.add(errorArt + " is in workflow " + errorWf + ". Please complete the workflow before approving.");
} else {
	if (node.getObjectType().getID().equals('prd_Article')) {
		article = node;
		
		// Check for the article itself whether it is complete
		var isNodeComplete = bc_IsAllMandatoryInformationCompleted.evaluate(node);
		if (isNodeComplete.isRejected() || isNodeComplete.isNonApplicable()) {
			missingList = bf_GetMissingMandatoryAttributes.evaluate({node: node});
			errorLog.add(node.getID()+' '+node.getName()+' is not complete. Following information are missing:'+''+missingList);
		}
	} else {
		article = bf_GetArticleFromPackagingUnit.evaluate({node: node});
		log.info('Article from PU:'+article.getID());
		// Check for the PU itself whether it is complete
		var isNodeComplete = bc_IsAllMandatoryInformationCompleted.evaluate(node);
		if (isNodeComplete.isRejected() || isNodeComplete.isNonApplicable()) {
			missingList = bf_GetMissingMandatoryAttributes.evaluate({node: node});
			errorLog.add(node.getID()+' '+node.getName()+' is not complete. Following information are missing:'+''+missingList);
		}
		var isArticleComplete = bc_IsAllMandatoryInformationCompleted.evaluate(article);
		if (isArticleComplete.isRejected() || isArticleComplete.isNonApplicable()) {
			missingList = bf_GetMissingMandatoryAttributes.evaluate({node: article});
			errorLog.add(article.getID()+' '+article.getName()+' is not complete. Following information are missing:'+''+missingList);
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
			    errorLog.add(article.getID()+' '+article.getName()+' is not complete. Please populate all mandatory information on the Award reference '+ awardReference.getTarget().getName());
			    }
				return true;
		});
	}

	var referencesTasteProfile = node.queryReferences(pte_TasteProfile).asList(10);
	if (referencesTasteProfile.size()>0) {
		if (!referencesTasteProfile.get(0).getValue(att_COSMOSNumber.getID()).getSimpleValue()) {
			errorLog.add(node.getID()+' '+node.getName()+' is missing the COSMOS Number for the Taste Profile. Please ask your Admin to enter this information.');
		}
	}
}

return errorLog;
}