/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_CreateNewTradeItem",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Create Trade Item object for Article and GiftBox",
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
  "pluginId" : "JavaScriptBusinessActionWithBinds",
  "binds" : [ {
    "contract" : "CurrentObjectBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_GlobalTradeIdentificationNumber",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_GlobalTradeIdentificationNumber",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_TradeItem",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_TradeItem",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ptp_PartnerArticle",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ptp_PartnerArticle",
    "description" : null
  }, {
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_GlobalTradeIdentificationNumbers",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_GlobalTradeIdentificationNumbers",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_ProductFamily",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_ProductFamily",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_ProductCategory",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_ProductCategory",
    "description" : null
  }, {
    "contract" : "BusinessActionBindContract",
    "alias" : "ba_PostEventToTIMS",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessActionImpl",
    "value" : "ba_PostEventToTIMS",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_DataProvider",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_DataProvider",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_GlobalLocationNumber",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_GlobalLocationNumber",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_Level1",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_Level1",
    "description" : null
  }, {
    "contract" : "BusinessActionBindContract",
    "alias" : "ba_PostEventToTIMSHierarchy",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessActionImpl",
    "value" : "ba_PostEventToTIMSHierarchy",
    "description" : null
  } ],
  "messages" : [ {
    "variable" : "ErrorMessageGLN",
    "message" : "Global Location Number not available on {supplier}",
    "translations" : [ {
      "language" : "nl",
      "message" : "GLN is niet beschikbaar bij {supplier}"
    } ]
  }, {
    "variable" : "ErrorMessageReference",
    "message" : "Please select a Data Provider",
    "translations" : [ {
      "language" : "nl",
      "message" : "Selecteer een data leverancier"
    } ]
  } ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,att_GlobalTradeIdentificationNumber,prd_TradeItem,ptp_PartnerArticle,manager,ref_GlobalTradeIdentificationNumbers,prd_ProductFamily,prd_ProductCategory,ba_PostEventToTIMS,ref_DataProvider,att_GlobalLocationNumber,prd_Level1,ba_PostEventToTIMSHierarchy,ErrorMessageGLN,ErrorMessageReference) {
// Whenever a new Article is initiated for creation, if not already in STEP, a new Trade Item needs to be created.

// Retrieve the value of attribute Global Trade Identification Number
var gtin = node.getValue(att_GlobalTradeIdentificationNumber.getID()).getSimpleValue();

// Ensure data provider exists
var references = node.queryReferences(ref_DataProvider).asList(10);
if (references.size() == 0) {
	throw new Error('No ref_DataProvider found.')
}

// Clear existing TI refs
// This is for the scenario where we change GTIN.
var existingTIReference = node.queryReferences(ptp_PartnerArticle).asList(10);
existingTIReference.forEach(function (tiRef) {
	tiRef.delete();
});

// Get GLN
var globalLocationNo = references.get(0).getTarget().getValue(att_GlobalLocationNumber.getID()).getSimpleValue();
if (!globalLocationNo) {
	var errorMessageGLN = new ErrorMessageGLN();
	errorMessageGLN.supplier = node.queryReferences(ref_DataProvider).asList(10).get(0).getTarget().getName();
	throw errorMessageGLN;
}

// If we don't have GTIN or GLN something is wrong
if (!gtin || !globalLocationNo) {
	var errorMessageReference = new ErrorMessageReference();
	throw errorMessageReference;
}

function createTradeItem(node, globalLocationNo, gtin) {
	//Find Trade Item Parent
	var parentID;
	var parentObjectType = node.getParent().getObjectType().getID();

	if (parentObjectType.equals(prd_ProductFamily.getID())) {
		parentID = 'Partner' + node.getParent().getParent().getID();
	} else if (parentObjectType.equals(prd_ProductCategory.getID())) {
		parentID = 'Partner' + node.getParent().getID();
	} else {
		parentID = 'Partner' + node.getParent().getID();
	}
	var condition = com.stibo.query.condition.Conditions;
	var home = manager.getHome(com.stibo.query.home.QueryHome);
	var idCondition = com.stibo.query.condition.Conditions.id();
	var querySpecificationToFindParent = home.queryFor(com.stibo.core.domain.Product).where(idCondition.eq(parentID));
	var parentResult = querySpecificationToFindParent.execute().asList(1);

	if (parentResult.size() == 0) {
		throw 'Unable to find the parent.';
	}

	// Search for a prd_TradeItem objects where attribute value of att_GlobalTradeIdentificationNumber is equal to
	// the attribute att_GlobalTradeIdentificationNumber on the Article (prd_Article).
	var existingTradeItem = home.queryFor(com.stibo.core.domain.Product).where(
		condition.valueOf(att_GlobalTradeIdentificationNumber).eq(gtin)
			.and(condition.valueOf(att_GlobalLocationNumber).eq(globalLocationNo))
			.and(condition.objectType(prd_TradeItem))).execute().asList(1);

	// Hack: If we can't find a trade item, check again with 14 digit EAN
	if (existingTradeItem.size() == 0 && (gtin+'').length == 13) {
		existingTradeItem = home.queryFor(com.stibo.core.domain.Product).where(
		condition.valueOf(att_GlobalTradeIdentificationNumber).eq('0' + gtin)
			.and(condition.valueOf(att_GlobalLocationNumber).eq(globalLocationNo))
			.and(condition.objectType(prd_TradeItem))).execute().asList(1);
	}
	
	var product = null;
	if (existingTradeItem.size() == 0) {
		// Create Trade item
		product = parentResult.get(0).createProduct(null, prd_TradeItem.getID());
		product.setName(node.getTitle());
		product.getValue(att_GlobalTradeIdentificationNumber.getID()).setSimpleValue(gtin);
		product.getValue(att_GlobalLocationNumber.getID()).setSimpleValue(globalLocationNo);
		
		// Link GTIN entity
		var gtin = node.queryReferences(ref_GlobalTradeIdentificationNumbers).asList(10).get(0).getTarget();
		product.createReference(gtin, ref_GlobalTradeIdentificationNumbers);

		// Link data provider
		var dataProv = node.queryReferences(ref_DataProvider).asList(10).get(0).getTarget();
		product.createReference(dataProv, ref_DataProvider);
		node.createReference(product, ptp_PartnerArticle);
	} else {
		product = existingTradeItem.get(0);

		try {
			node.createReference(product, ptp_PartnerArticle);
		} catch (e) {
			if (e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
				log.info('Reference is present already  -->' + e);
			} else {
				throw (e);
			}
		}
		
		product.setParent(parentResult.get(0));
	}

	// Publish trade item to TIMS
	ba_PostEventToTIMS.execute(product);
	ba_PostEventToTIMSHierarchy.execute(product);

	// Check if we're in Wait For Trade item
	var inInitialState = node.isInState("wf_CreateArticle", "Initial_State") || node.isInState("wf_CreateArticleOther", "Initial_State")

	// Update workflow variable
	if (inInitialState) {
		node.getWorkflowInstanceByID("wf_CreateArticle") && node.getWorkflowInstanceByID("wf_CreateArticle").setSimpleVariable("TIMSStatus", "Wachten op reactie van PIM");
		node.getWorkflowInstanceByID("wf_CreateArticleOther") && node.getWorkflowInstanceByID("wf_CreateArticleOther").setSimpleVariable("TIMSStatus", "Wachten op reactie van PIM");
	}
}

createTradeItem(node, globalLocationNo, gtin);
log.info('Completed ba_CreateNewTradeItem');
}
/*===== business rule plugin definition =====
{
  "pluginId" : "ReferenceOtherBCBusinessCondition",
  "parameters" : [ {
    "id" : "ReferencedBC",
    "type" : "com.stibo.core.domain.businessrule.BusinessCondition",
    "value" : "ba_IsPLUPopulated"
  }, {
    "id" : "ValueWhenReferencedIsNA",
    "type" : "com.stibo.util.basictypes.TrueFalseParameter",
    "value" : "false"
  } ],
  "pluginType" : "Precondition"
}
*/
