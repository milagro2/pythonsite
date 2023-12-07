/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "bc_IsArticleReadyForImportOther",
  "type" : "BusinessCondition",
  "setupGroups" : [ "brg_Conditions" ],
  "name" : "Is Article Ready For Import - Other",
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
  }, {
    "contract" : "SimpleValueBindContract",
    "alias" : "att_ArticleLevel1",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ArticleLevel1",
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
      "message" : "Selecteer een valide Data Leverancier"
    } ]
  }, {
    "variable" : "ErrorMessageL1",
    "message" : "Missing Article Level 1",
    "translations" : [ {
      "language" : "nl",
      "message" : "Er mist een artikel Level 1"
    } ]
  }, {
    "variable" : "ErrorMessageRights",
    "message" : "Not allowed to create product for Level1: {L1}",
    "translations" : [ {
      "language" : "nl",
      "message" : "Niet bevoegd om een Level 1 artikel aan te maken: {L1}"
    } ]
  } ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (ref_DataProvider,manager,ref_GlobalTradeIdentificationNumbers,att_GlobalTradeIdentificationNumber,att_GlobalLocationNumber,att_Supplier,lov_Suppliers,att_ArticleLevel1,ErrorMessage,ErrorMessageDataProvider,ErrorMessageGTIN,ErrorMessageMandatoryDataProvider,ErrorMessageL1,ErrorMessageRights) {
//Certain usergroups are only allowed to create certain level1's
//Usergroups: CA_Wine , CA_Whisky , CA_Spirits , CA_Beer, WBC

var currentUser = manager.getCurrentUser();
var isMarketing = false;
var l1rights = [];

/*
 * 			l1rights.push("Beer");
			l1rights.push("Armagnac-Brandy-Calvados-Grappa");
			l1rights.push("Cognac");
			l1rights.push("Domestic Distilled");
			l1rights.push("Liqueur");
			l1rights.push("Mix");
			l1rights.push("Mousserend");
			l1rights.push("Non-Food");
			l1rights.push("Port");
			l1rights.push("Sherry");
			l1rights.push("Soft Drink");
			l1rights.push("Whisky");
			l1rights.push("Wine");
 */

currentUser.getAllGroups().forEach(function(userGroup) {
	switch (String(userGroup.getID())) {
		case 'CA_Wine':
			log.info('ben ik wijn');
			l1rights.push('Beer');
			l1rights.push('Armagnac-Brandy-Calvados-Grappa');
			l1rights.push('Cognac');
			l1rights.push('Domestic Distilled');
			l1rights.push('Liqueur');
			l1rights.push('Mix');
			l1rights.push('Mousserend');
			//l1rights.push("Non-Food");
			l1rights.push('Port');
			l1rights.push('Sherry');
			l1rights.push('Soft Drink');
			l1rights.push('Whisky');
			l1rights.push('Wine');
			break;
		case 'CA_Beer':
		case 'CA_Whisky':
		case 'CA_Spirits':
			l1rights.push('Beer');
			l1rights.push('Armagnac-Brandy-Calvados-Grappa');
			l1rights.push('Cognac');
			l1rights.push('Domestic Distilled');
			l1rights.push('Liqueur');
			l1rights.push('Mix');
			//l1rights.push("Mousserend");
			l1rights.push('Non-Food');
			//l1rights.push("Port");
			//l1rights.push("Sherry");
			l1rights.push('Soft Drink');
			l1rights.push('Whisky');
			//l1rights.push("Wine");
			break;
		case 'Stibo':
			l1rights.push('Beer');
			l1rights.push('Armagnac-Brandy-Calvados-Grappa');
			l1rights.push('Cognac');
			l1rights.push('Domestic Distilled');
			l1rights.push('Liqueur');
			l1rights.push('Mix');
			l1rights.push("Mousserend");
			l1rights.push('Non-Food');
			l1rights.push("Port");
			l1rights.push("Sherry");
			l1rights.push('Soft Drink');
			l1rights.push('Whisky');
			l1rights.push("Wine");
			break;
		default:
			break;
	}
});

var level1 = att_ArticleLevel1;
log.info('Selected Level 1 = ' + att_ArticleLevel1);
log.info(l1rights);

if (!level1) {
	var errorMsg = new ErrorMessageL1();
	return errorMsg;
} else {
	if (l1rights.includes(att_ArticleLevel1)) {
		//Rights are fine
	} else {
		var errorMessage = new ErrorMessageRights;
		errorMessage.L1 = att_ArticleLevel1;
		return errorMessage;
	}
}

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