/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_CreatePackagingStructure",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Create Packaging Structure",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_TradeItem" ],
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
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ptp_PartnerArticle",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ptp_PartnerArticle",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_NextLowerLevel",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_NextLowerLevel",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_GlobalTradeIdentificationNumber",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_GlobalTradeIdentificationNumber",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_TradeItemUnitDescriptor",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_TradeItemUnitDescriptor",
    "description" : null
  }, {
    "contract" : "BusinessFunctionBindContract",
    "alias" : "bf_GetPackagingStructure",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>bf_GetPackagingStructure</BusinessFunction>\n</BusinessFunctionReference>\n",
    "description" : null
  }, {
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_QuantityOfNextLowerLevel",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_QuantityOfNextLowerLevel",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_Article",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_Article",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_ArticleDate",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ArticleDate",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_ProductType",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ProductType",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_OperationalPackagingRoles",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_OperationalPackagingRoles",
    "description" : null
  }, {
    "contract" : "BusinessActionBindContract",
    "alias" : "ba_CopyTIInformation",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessActionImpl",
    "value" : "ba_CopyTIInformation",
    "description" : null
  }, {
    "contract" : "BusinessActionBindContract",
    "alias" : "ba_CreateNewGTIN",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessActionImpl",
    "value" : "ba_CreateNewGTIN",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_GiftBoxArticle",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_GiftBoxArticle",
    "description" : null
  }, {
    "contract" : "BusinessActionBindContract",
    "alias" : "ba_AddPOSDescription",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessActionImpl",
    "value" : "ba_AddPOSDescription",
    "description" : null
  }, {
    "contract" : "BusinessActionBindContract",
    "alias" : "ba_SetCreationDate",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessActionImpl",
    "value" : "ba_SetCreationDate",
    "description" : null
  }, {
    "contract" : "BusinessActionBindContract",
    "alias" : "ba_SetShelfCard",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessActionImpl",
    "value" : "ba_SetShelfCard",
    "description" : null
  }, {
    "contract" : "BusinessActionBindContract",
    "alias" : "ba_CopyPalletInformation",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessActionImpl",
    "value" : "ba_CopyPalletInformation",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_PackagingUnitEach",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_PackagingUnitEach",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_POSDescription",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_POSDescription",
    "description" : null
  }, {
    "contract" : "WebUiContextBind",
    "alias" : "web",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,ptp_PartnerArticle,ref_NextLowerLevel,att_GlobalTradeIdentificationNumber,att_TradeItemUnitDescriptor,bf_GetPackagingStructure,manager,att_QuantityOfNextLowerLevel,prd_Article,att_ArticleDate,att_ProductType,att_OperationalPackagingRoles,ba_CopyTIInformation,ba_CreateNewGTIN,prd_GiftBoxArticle,ba_AddPOSDescription,ba_SetCreationDate,ba_SetShelfCard,ba_CopyPalletInformation,prd_PackagingUnitEach,att_POSDescription,web) {
// Get web selection
var selectedArticles = web.getSelection();

// Find article
var article;
node.queryReferencedBy(ptp_PartnerArticle).forEach(function(reference) {
	if (reference.getSource().getObjectType().equals(prd_Article) || reference.getSource().getObjectType().equals(prd_GiftBoxArticle) ) {
		article = reference.getSource();
	}
	return true;
});

// Other helper vars
var productCategory = article.getValue(att_ProductType.getID()).getLOVValue().getID();
var highestTradeItem = selectedArticles.get(0);
var tradeItems = bf_GetPackagingStructure.evaluate({node: highestTradeItem}).toArray();
var tradeItemNotification = new java.lang.StringBuilder('');
var tradeItemExistsNotification = new java.lang.StringBuilder('');
var noPackagingSelectedNotification = new java.lang.StringBuilder('');

function setValuesAndReferences(packagingUnit, tradeItem) {
	var puLowerLevel;
	var tradeItemGTIN = tradeItem.getValue(att_GlobalTradeIdentificationNumber.getID()).getSimpleValue();
	packagingUnit.setName(tradeItem.getName());
	tradeItemNotification.append(packagingUnit.getID()+' '+tradeItem.getName() +'\n');
	packagingUnit.getValue(att_GlobalTradeIdentificationNumber.getID()).setSimpleValue(tradeItemGTIN);
	packagingUnit.createReference(tradeItem, ptp_PartnerArticle);
	var nameValue = String(tradeItem.getName()).toUpperCase().substring(0,24);
	packagingUnit.getValue(att_POSDescription.getID()).setSimpleValue(nameValue);
	ba_SetShelfCard.execute(packagingUnit);
	ba_SetCreationDate.execute(packagingUnit);
	ba_CreateNewGTIN.execute(packagingUnit);
	tradeItem.queryReferences(ref_NextLowerLevel).forEach(function(reference) {
		var target = reference.getTarget();
		var quantity = reference.getValue(att_QuantityOfNextLowerLevel.getID()).getSimpleValue();
		target.queryReferencedBy(ptp_PartnerArticle).forEach(function(referenceTradeItem) {
			if (referenceTradeItem.getSource().getObjectType() != prd_Article || referenceTradeItem.getSource().getObjectType() != prd_GiftBoxArticle) {
				puLowerLevel = referenceTradeItem.getSource();
			}
			return true;
		});
		var nextLowerLevel = packagingUnit.createReference(puLowerLevel, ref_NextLowerLevel);
		nextLowerLevel.getValue(att_QuantityOfNextLowerLevel.getID()).setSimpleValue(quantity);
		return true;
	});
}

function packagingUnitsCreate(initiateInWorkflow) {
	for (var x in tradeItems) {
		var tradeItem = tradeItems[x];
		var referenceExist = tradeItem.queryReferencedBy(ptp_PartnerArticle).asList(10);
		if (!referenceExist.size()>0) {
			var tradeItemUnitDescriptor = tradeItem.getValue(att_TradeItemUnitDescriptor.getID()).getSimpleValue();
			if (tradeItemUnitDescriptor == 'PACK_OR_INNER_PACK') {
				var packPU = article.createProduct('','prd_PackagingUnitPack');
				setValuesAndReferences(packPU, tradeItem);
				if (initiateInWorkflow) { packPU.startWorkflowByID('wf_CreatePU','New Pack created'); }
			} else if (tradeItemUnitDescriptor == 'CASE') {
				var casePU = article.createProduct('','prd_PackagingUnitCase');
				setValuesAndReferences(casePU, tradeItem);
				if (initiateInWorkflow) { casePU.startWorkflowByID('wf_CreatePU','New Case created'); }
			} else if (tradeItemUnitDescriptor == 'DISPLAY_SHIPPER' || tradeItemUnitDescriptor == 'PALLET') {
				var palletPU = article.createProduct('','prd_PackagingUnitPallet');
				setValuesAndReferences(palletPU, tradeItem);
			}
		} else {
			tradeItem.queryReferencedBy(ptp_PartnerArticle).forEach(function(referenceTradeItem) {
				var sourceObjectID = referenceTradeItem.getSource().getObjectType().getID();
				if (!sourceObjectID.equals(prd_Article.getID()) &&
						!sourceObjectID.equals(prd_PackagingUnitEach.getID()) &&
						!sourceObjectID.equals(prd_GiftBoxArticle.getID())) {
							packagingUnitID = referenceTradeItem.getSource().getID();
							packagingUnitName = referenceTradeItem.getSource().getName();
							tradeItemExistsNotification.append(packagingUnitID+' '+packagingUnitName+'\n');
				}
				return true;
			});
		}
		ba_CopyTIInformation.execute(tradeItem);
	}
	ba_CopyPalletInformation.execute(article);
	if (tradeItemNotification != '' && tradeItemNotification != null) {
		web.showAlert('ACKNOWLEDGMENT',
								 'Packaging Hierarchy',
								 'The following Packaging Units have been created: \n'+tradeItemNotification);
	} else if (tradeItemExistsNotification != '' && tradeItemExistsNotification != null) {
			web.showAlert('WARNING',
								 'Packaging Hierarchy already created',
								 'Please note that packaging unit: \n'+tradeItemExistsNotification+'are already created. No new packaging units have been created.');
	}
}

// If creating from the tree, ensure that article not in workflow
if (web.getScreenId() != "Workflow_CreateArticle_PackagingHierarchy") {
	var workflowCreate = article.isInWorkflow('wf_CreateArticle');
	var workflowCreateOther = article.isInWorkflow('wf_CreateArticleOther');
	var workflowCompleteMandatory = article.isInWorkflow('wf_CompleteMandatoryInfo');

	if (workflowCreate || workflowCreateOther || workflowCompleteMandatory) {
		web.showAlert('WARNING',
			'Article in workflow',
			'Please note that no packaging units have been created. This is because the article is already in the workflow.');
		return;
	}
	// From Tree: If article not in create workflow, create PUs and initiate in PU create workflow
	packagingUnitsCreate(true);
} else {
	// From Create Workflow: create PUs
	packagingUnitsCreate(false);
}
}