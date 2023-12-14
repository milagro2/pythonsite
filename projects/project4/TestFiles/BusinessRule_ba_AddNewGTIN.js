/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_AddNewGTIN",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Add New GTIN",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_BundleArticle", "prd_PackagingUnitCase", "prd_PackagingUnitEach", "prd_PackagingUnitPack", "prd_PackagingUnitPallet" ],
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
    "alias" : "ref_GlobalTradeIdentificationNumbers",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_GlobalTradeIdentificationNumbers",
    "description" : null
  }, {
    "contract" : "EntityBindContract",
    "alias" : "ExternalGTINS",
    "parameterClass" : "com.stibo.core.domain.impl.entity.FrontEntityImpl$$Generated$$12",
    "value" : "ExternalGTINS",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_GlobalTradeIdentificationNumber",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_GlobalTradeIdentificationNumber",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_MainIndicator",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_MainIndicator",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_ValidityStartDate",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ValidityStartDate",
    "description" : null
  }, {
    "contract" : "BusinessFunctionBindContract",
    "alias" : "bf_GetTodayAsISODate",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>bf_GetTodayAsISODate</BusinessFunction>\n</BusinessFunctionReference>\n",
    "description" : null
  }, {
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "ent_GTIN",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "ent_GTIN",
    "description" : null
  }, {
    "contract" : "AttributeValidatedContextParameterStringBinding",
    "alias" : "gtinValue",
    "parameterClass" : "com.stibo.core.domain.businessrule.attributecontextparameter.AttributeValidatedContextParameter",
    "value" : "<AttributeValidatedContextParameter>\n  <Parameters>\n    <Parameter ID=\"Attribute\" Type=\"java.lang.String\">att_GlobalTradeIdentificationNumber</Parameter>\n    <Parameter ID=\"ID\" Type=\"java.lang.String\">gtinValue</Parameter>\n  </Parameters>\n</AttributeValidatedContextParameter>",
    "description" : null
  }, {
    "contract" : "AttributeValidatedContextParameterStringBinding",
    "alias" : "mainIndicatorValue",
    "parameterClass" : "com.stibo.core.domain.businessrule.attributecontextparameter.AttributeValidatedContextParameter",
    "value" : "<AttributeValidatedContextParameter>\n  <Parameters>\n    <Parameter ID=\"Attribute\" Type=\"java.lang.String\">att_EANType</Parameter>\n    <Parameter ID=\"ID\" Type=\"java.lang.String\">mainIndicatorValue</Parameter>\n  </Parameters>\n</AttributeValidatedContextParameter>",
    "description" : null
  }, {
    "contract" : "BusinessActionBindContract",
    "alias" : "ba_CreateNewTradeItem",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessActionImpl",
    "value" : "ba_CreateNewTradeItem",
    "description" : null
  }, {
    "contract" : "BusinessActionBindContract",
    "alias" : "ba_CreateTIOnPUWorkflowCreatePU",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessActionImpl",
    "value" : "ba_CreateTIOnPUWorkflowCreatePU",
    "description" : null
  }, {
    "contract" : "BusinessFunctionBindContract",
    "alias" : "bf_GetArticleFromPackagingUnit",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>bf_GetArticleFromPackagingUnit</BusinessFunction>\n</BusinessFunctionReference>\n",
    "description" : null
  }, {
    "contract" : "WebUiContextBind",
    "alias" : "web",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_PackagingUnitEach",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_PackagingUnitEach",
    "description" : null
  }, {
    "contract" : "BusinessFunctionBindContract",
    "alias" : "bf_GetProductsBasedOnGTIN",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>bf_GetProductsBasedOnGTIN</BusinessFunction>\n</BusinessFunctionReference>\n",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_OperationalPackagingRoles",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_OperationalPackagingRoles",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_ColloGlobalTradeIdentificationNumber",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ColloGlobalTradeIdentificationNumber",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_COSMOSLogisticLink",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_COSMOSLogisticLink",
    "description" : null
  } ],
  "messages" : [ {
    "variable" : "ErrorMessage",
    "message" : "No GTIN has been completed",
    "translations" : [ {
      "language" : "nl",
      "message" : "Er is geen GTIN code ingevoerd"
    } ]
  } ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,ref_GlobalTradeIdentificationNumbers,ExternalGTINS,att_GlobalTradeIdentificationNumber,att_MainIndicator,att_ValidityStartDate,bf_GetTodayAsISODate,manager,ent_GTIN,gtinValue,mainIndicatorValue,ba_CreateNewTradeItem,ba_CreateTIOnPUWorkflowCreatePU,bf_GetArticleFromPackagingUnit,web,prd_PackagingUnitEach,bf_GetProductsBasedOnGTIN,att_OperationalPackagingRoles,att_ColloGlobalTradeIdentificationNumber,att_COSMOSLogisticLink,ErrorMessage) {
//refactor time:

// if no EAN input give error straight away en RETURN
// clean GTIN 

// check if in use on this PU (Set IsinUseOnThisPU)
// check if GTIN entity is already linked (Set isLinked)
// check if primary or secondary (Set isPrimary or isSecondary)
// check isActiveGTIN and isInactiveGTIN
// check if each (set isEach)

//If !IsInUseOnThisPU && Islinked
//	Give back error that entered GTIN is already linked somewhere and return whicb items and RETURN ( if articles is empty then make a note about prullenbak)
 
// if IsinUseOnThisPU	
	// if Isprimary && IsActive: error(is already linked and active!)
	//
	// if Isprimary && IsINactive: DO:
	//				set indicator as true en de andere op false, voeg datum toe
	//				set EAN op attribuut van PU
	//				create and link nieuw TI aan PU
	//
	// if Isprimary && IsINactive && IsEach: DO:
	//				voor EACH zet dan ook artikelEAN en link ook artikel TI
	//
	// if IsSecondary && IsActive: error:Its already a primary GTIN!
	//
	// if IsSecondary && IsInActive: error: It's already here 
//RETURN if anyone of these fills


// create new GTIN entity, reference PU, set indicator to true and add date
// loop through the other GTINs to set them to false
// set EAN attribute on PU
// create and link new TI to PU
// if Iseach		
//	reference new GTINobject and TI
//	set EAN on article




var gtin = String(gtinValue);
var failed = false;
var gtinObject = null;
var article = bf_GetArticleFromPackagingUnit.evaluate({ node: node });

//Determine if each. Need to know for promotion of GTIN to article level
var isEach = false;
isEach = node.getObjectType().getID().equals(prd_PackagingUnitEach.getID());

if (gtin) {
	var gtin = '00000000000000'.substring(1, 15 - gtin.length) + gtin;
	if (mainIndicatorValue == 'Primary') {
		node.queryReferences(ref_GlobalTradeIdentificationNumbers).forEach(function (gtinReference) {
			if (gtinReference.getTarget().getValue(att_GlobalTradeIdentificationNumber.getID()).getSimpleValue() == String(gtin)) {
				gtinReference.getValue(att_MainIndicator.getID()).setSimpleValue('true');
				web.showAlert('INFO', 'GTIN already in use', 'GTIN was already used by this product and is now set to primary.');
				node.getValue(att_GlobalTradeIdentificationNumber.getID()).setSimpleValue(gtin);
				ba_CreateTIOnPUWorkflowCreatePU.execute(node);
				failed = true;
			} else {
				gtinReference.getValue(att_MainIndicator.getID()).setSimpleValue('false');
			}
			return true;
		});

		if (isEach && failed) {
			article.getValue(att_GlobalTradeIdentificationNumber.getID()).setSimpleValue(gtin);
			article.queryReferences(ref_GlobalTradeIdentificationNumbers).forEach(function (gtinReference) {
				if (gtinReference.getTarget().getValue(att_GlobalTradeIdentificationNumber.getID()).getSimpleValue() == String(gtin)) {
					gtinReference.getValue(att_MainIndicator.getID()).setSimpleValue('true');
					ba_CreateNewTradeItem.execute(article);
				} else {
					gtinReference.getValue(att_MainIndicator.getID()).setSimpleValue('false');
				}
				return true;
			});
		}
	}

	if (!failed) {
		gtinObject = manager.getNodeHome().getObjectByKey('key_GTINObject', gtin);
		if (gtinObject == null) {
			gtinObject = ExternalGTINS.createEntity('GTIN_' + gtin, ent_GTIN);
			gtinObject.setName(gtin);
			gtinObject.getValue(att_GlobalTradeIdentificationNumber.getID()).setSimpleValue(gtin);
		} else {
			var products = bf_GetProductsBasedOnGTIN.evaluate({ gtinInput: String(gtin) });
			var productIDs = [];
			for (var i = 0; i < products.size(); i++) {
				var prodID = products.get(i).getID();
				var prodName = products.get(i).getName();
				productIDs.push(prodID + ' - ' + prodName);
			}
			web.showAlert('WARNING', 'GTIN already in use', 'Selected GTIN is already in use for ' + productIDs + ' and can\'t be used for this one.');
			failed = true;
		}
		if (!failed) {
			node.getValue(att_GlobalTradeIdentificationNumber.getID()).setSimpleValue(gtin);
			
			if (isEach && mainIndicatorValue == 'Primary') {
				article.getValue(att_GlobalTradeIdentificationNumber.getID()).setSimpleValue(gtin);
			}

			var reference = null;
			try {
				reference = node.createReference(gtinObject, ref_GlobalTradeIdentificationNumbers);
			} catch (e) {
				if (e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
					logger.info('Reference exists, no action needed');
				} else {
					throw (e);
				}
			}
			if (reference) {
				var articleReference;
				if (node.getObjectType().getID() == prd_PackagingUnitEach.getID()) {
					articleReference = article.createReference(gtinObject, ref_GlobalTradeIdentificationNumbers);
				}
				if (mainIndicatorValue == 'Primary') {
					reference.getValue(att_MainIndicator.getID()).setSimpleValue('true');
					if (articleReference) {
						articleReference.getValue(att_MainIndicator.getID()).setSimpleValue('true');
					}
				} else {
					reference.getValue(att_MainIndicator.getID()).setSimpleValue('false');
					if (articleReference) {
						articleReference.getValue(att_MainIndicator.getID()).setSimpleValue('false');
					}
				}
				reference.getValue(att_ValidityStartDate.getID()).setSimpleValue(bf_GetTodayAsISODate.evaluate());
				if (articleReference) {
					articleReference.getValue(att_ValidityStartDate.getID()).setSimpleValue(bf_GetTodayAsISODate.evaluate());
				}
			}
			ba_CreateTIOnPUWorkflowCreatePU.execute(node);
			if (isEach) {
				ba_CreateNewTradeItem.execute(article);
			}
		}
	}
} else {
	errorMessage = new ErrorMessage();
	throw errorMessage;
}
}
/*===== business rule plugin definition =====
{
  "pluginId" : "ReferenceOtherBABusinessAction",
  "parameters" : [ {
    "id" : "ReferencedBA",
    "type" : "com.stibo.core.domain.businessrule.BusinessAction",
    "value" : "ba_CopyLogisticInfoFromPU"
  } ],
  "pluginType" : "Operation"
}
*/
