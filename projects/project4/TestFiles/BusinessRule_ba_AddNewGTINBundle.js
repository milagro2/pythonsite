/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_AddNewGTINBundle",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Add New GTIN - Bundle",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_BundleArticle" ],
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
    "contract" : "BusinessActionBindContract",
    "alias" : "ba_CreateNewTradeItem",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessActionImpl",
    "value" : "ba_CreateNewTradeItem",
    "description" : null
  }, {
    "contract" : "WebUiContextBind",
    "alias" : "web",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "BusinessFunctionBindContract",
    "alias" : "bf_GetProductsBasedOnGTIN",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>bf_GetProductsBasedOnGTIN</BusinessFunction>\n</BusinessFunctionReference>\n",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_ColloGlobalTradeIdentificationNumber",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ColloGlobalTradeIdentificationNumber",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_MainIndicator",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_MainIndicator",
    "description" : null
  }, {
    "contract" : "BusinessActionBindContract",
    "alias" : "ba_SetSearchTerms",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessActionImpl",
    "value" : "ba_SetSearchTerms",
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
exports.operation0 = function (node,ref_GlobalTradeIdentificationNumbers,ExternalGTINS,att_GlobalTradeIdentificationNumber,att_ValidityStartDate,bf_GetTodayAsISODate,manager,ent_GTIN,gtinValue,ba_CreateNewTradeItem,web,bf_GetProductsBasedOnGTIN,att_ColloGlobalTradeIdentificationNumber,att_MainIndicator,ba_SetSearchTerms,ErrorMessage) {
var gtin = String(gtinValue);
var failed = false;
var gtinObject = null;


if (gtin) {
	var gtin = '00000000000000'.substring(1,15-gtin.length) + gtin;
	gtinObject = manager.getNodeHome().getObjectByKey('key_GTINObject', gtin);

	var isLinkedToCurrent = false;
	if(gtinObject) {
		gtinObject.queryReferencedBy(ref_GlobalTradeIdentificationNumbers).forEach(function(refBy){
			var source = refBy.getSource().getID();
			if(node.getID() == source) {
				isLinkedToCurrent = true;
			}
			return true;
		});
	}
	
	if(isLinkedToCurrent) {
		node.queryReferences(ref_GlobalTradeIdentificationNumbers).forEach(function(gtinReference) {
			if (gtinReference.getTarget().getValue(att_GlobalTradeIdentificationNumber.getID()).getSimpleValue() == String(gtin)) {
				gtinReference.getValue(att_MainIndicator.getID()).setSimpleValue('true');
				web.showAlert('INFO', 'GTIN already in use', 'GTIN was already used by this product and is now set to primary.');
				node.getValue(att_GlobalTradeIdentificationNumber.getID()).setSimpleValue(gtin);
				node.getValue(att_ColloGlobalTradeIdentificationNumber.getID()).setSimpleValue(gtin);
				failed = true;
			} else {
				gtinReference.getValue(att_MainIndicator.getID()).setSimpleValue('false');
			}
			return true;
		});
	} else if(gtinObject) {
		var products = bf_GetProductsBasedOnGTIN.evaluate({gtinInput: String(gtin)});
		var productIDs = [];
		for (var i = 0; i < products.size(); i++) {
			var prodID = products.get(i).getID();
			var prodName = products.get(i).getName();
			productIDs.push(prodID + ' - ' + prodName);
		}
		web.showAlert('WARNING', 'GTIN In use', 'Selected GTIN' + gtin + ' is in use by  ' + productIDs);
		failed = true;
	}
	
	if (gtinObject == null) {
	 	gtinObject = ExternalGTINS.createEntity('GTIN_'+gtin, ent_GTIN);
	 	gtinObject.setName(gtin);
	 	gtinObject.getValue(att_GlobalTradeIdentificationNumber.getID()).setSimpleValue(gtin);
	} 
	
	if (!failed) {
		node.getValue(att_GlobalTradeIdentificationNumber.getID()).setSimpleValue(gtin);
		node.getValue(att_ColloGlobalTradeIdentificationNumber.getID()).setSimpleValue(gtin);
		var reference = null;
		try {
		 	reference = node.createReference(gtinObject, ref_GlobalTradeIdentificationNumbers);
		 	if(reference){
		 		node.queryReferences(ref_GlobalTradeIdentificationNumbers).forEach(function(gtinReference) {
					gtinReference.getValue(att_MainIndicator.getID()).setSimpleValue('false');
					return true;
				});
		 		reference.getValue(att_ValidityStartDate.getID()).setSimpleValue(bf_GetTodayAsISODate.evaluate());
				reference.getValue(att_MainIndicator.getID()).setSimpleValue('true');
		 	}
		} catch (e) {
			if (e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
				logger.info('Reference exists, no action needed');
			} else {
				throw (e);
			}
		}
	}		
} else {
	errorMessage = new ErrorMessage();
	throw errorMessage;
}

}