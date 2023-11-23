/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_IsArticleReadyForImport",
  "type" : "BusinessCondition",
  "setupGroups" : [ "brg_Conditions" ],
  "name" : "Is Article Ready For Import",
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
  "pluginId" : "JavaScriptBusinessConditionWithBinds",
  "binds" : [ {
    "contract" : "CurrentObjectBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_DataProvider",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_DataProvider",
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
    "contract" : "SimpleValueBindContract",
    "alias" : "att_GlobalTradeIdentificationNumber",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_GlobalTradeIdentificationNumber",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_GlobalLocationNumber",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_GlobalLocationNumber",
    "description" : null
  }, {
    "contract" : "SimpleValueBindContract",
    "alias" : "att_Supplier",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_Supplier",
    "description" : null
  }, {
    "contract" : "ListOfValuesBindContract",
    "alias" : "lov_Suppliers",
    "parameterClass" : "com.stibo.core.domain.impl.ListOfValuesImpl",
    "value" : "lov_Suppliers",
    "description" : null
  } ],
  "messages" : [ {
    "variable" : "ErrorMessage",
    "message" : "GTIN is already in use",
    "translations" : [ {
      "language" : "nl",
      "message" : "GTIN is al in gebruik"
    } ]
  }, {
    "variable" : "ErrorMessageDataProvider",
    "message" : "Missing GLN",
    "translations" : [ {
      "language" : "nl",
      "message" : "De GLN mist"
    } ]
  }, {
    "variable" : "ErrorMessageGTIN",
    "message" : "Missing GTIN",
    "translations" : [ {
      "language" : "nl",
      "message" : "De GTIN mist"
    } ]
  }, {
    "variable" : "ErrorMessageMandatoryDataProvider",
    "message" : "Please select a valid Data Provider",
    "translations" : [ {
      "language" : "nl",
      "message" : "Selecteer een Data Leverancier"
    } ]
  } ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,ref_DataProvider,manager,ref_GlobalTradeIdentificationNumbers,att_GlobalTradeIdentificationNumber,att_GlobalLocationNumber,att_Supplier,lov_Suppliers,ErrorMessage,ErrorMessageDataProvider,ErrorMessageGTIN,ErrorMessageMandatoryDataProvider) {
var gtin = String(att_GlobalTradeIdentificationNumber);
var query = lov_Suppliers.queryValidValues();
var partnerID;
	query.forEach(function(lov) {
	    	if (lov.getValue().equals(att_Supplier)) {
	    		partnerID = lov.getID();
	    	}
	    	return true;
 	});
var partner = manager.getEntityHome().getEntityByID(partnerID);
	if (partner) {
		globalLocationNo = partner.getValue(att_GlobalLocationNumber.getID()).getSimpleValue();
	} else {
		errorMessageMandatory = new ErrorMessageMandatoryDataProvider();
		return errorMessageMandatory;
	}
if (globalLocationNo && gtin != '' && gtin != 'null') {
	var gtin = '00000000000000'.substring(1,15-gtin.length) + gtin;
	var gtinObject = manager.getNodeHome().getObjectByKey('key_GTINObject', gtin);
	if (!gtinObject) {
	 	return true;
	} else {
		var referencesGTIN = gtinObject.queryReferencedBy(ref_GlobalTradeIdentificationNumbers).asList(10);
		if (referencesGTIN.size() > 0) {
			errorMessage = new ErrorMessage();
			return errorMessage;
		} else {
			return true;
		}
	}
} else {
	if (gtin == '' || gtin == 'null') {
		errorMessageGTIN = new ErrorMessageGTIN();
		return errorMessageGTIN;
	} else {
		errorMessageDataProvider = new ErrorMessageDataProvider();
		return errorMessageDataProvider;
	}
}
}