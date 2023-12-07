/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_ChangeDataProvider",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Change data provider (supplier)",
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
    "contract" : "ManagerBindContract",
    "alias" : "manager",
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
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ptp_PartnerArticle",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ptp_PartnerArticle",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_GlobalLocationNumber",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_GlobalLocationNumber",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_DataProvider",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_DataProvider",
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
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_NextLowerLevel",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_NextLowerLevel",
    "description" : null
  } ],
  "messages" : [ {
    "variable" : "ErrorMissing",
    "message" : "Please select the Data Provider",
    "translations" : [ {
      "language" : "nl",
      "message" : "Selecteer een data leverancier"
    } ]
  }, {
    "variable" : "ErrorSame",
    "message" : "No changes to the Data Provider, please select a new Data Provider",
    "translations" : [ {
      "language" : "nl",
      "message" : "Geen veranderingen in de data leverancier, selecteer een nieuwe"
    } ]
  }, {
    "variable" : "ErrorGLN",
    "message" : "Global Location Number not available on {supplier}",
    "translations" : [ {
      "language" : "nl",
      "message" : "GLN is niet beschikbaar bij {supplier}"
    } ]
  } ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,manager,att_GlobalTradeIdentificationNumber,ptp_PartnerArticle,att_GlobalLocationNumber,ref_DataProvider,ba_CreateNewTradeItem,web,ref_NextLowerLevel,ErrorMissing,ErrorSame,ErrorGLN) {
//For Article, retrieve the following information:
//attribute value EAN Number (att_GlobalTradeIdentificationNumber)

var nodeEANnumber = node.getValue(att_GlobalTradeIdentificationNumber.getID()).getSimpleValue();
var ptpEANnumber = "";
var ptpLocationNumber ="";
var dataProviderLocationNumber ="";
if(node.queryReferences(ptp_PartnerArticle).asList(10).size() > 0){
	var ptpRefTarget = node.queryReferences(ptp_PartnerArticle).asList(10).get(0).getTarget();
	ptpEANnumber = ptpRefTarget.getValue(att_GlobalTradeIdentificationNumber.getID()).getSimpleValue();
	ptpLocationNumber = ptpRefTarget.getValue(att_GlobalLocationNumber.getID()).getSimpleValue();
}

if(node.queryReferences(ref_DataProvider).asList(10).size() > 0){
	dataProviderLocationNumber = node.queryReferences(ref_DataProvider).asList(10).get(0).getTarget().getValue(att_GlobalLocationNumber.getID()).getSimpleValue();

/*If  Article attribute value EAN Number (att_GlobalTradeIdentificationNumber) and target of Data Provider (ref_DataProvider) 
 * attribute value Global Location Number (att_GlobalLocationNumber) is equal to target of Partner Article - Information Provider (ptp_PartnerArticle) 
 * attribute value EAN Number (att_GlobalTradeIdentificationNumber) and attribute value Global Location Number (att_GlobalLocationNumber), 
 * then throw ErrorMessage.
 */
	if(nodeEANnumber.equals(ptpEANnumber) && ptpLocationNumber.equals(dataProviderLocationNumber)){
		web.showAlert("WARNING", "Data Provider", "Please first change the data provider in the Partner Info section before initiating the 'Change Data Provider' action")
		/*var errorSame = new ErrorSame();
		throw errorSame;*/
	}else{
		
		//Else, remove reference Partner Article - Information Provider (ptp_PartnerArticle) and execute ba_CreateNewTradeItem.
		if(node.queryReferences(ptp_PartnerArticle).asList(10).size() > 0){
			node.queryReferences(ptp_PartnerArticle).asList(10).get(0).delete();
		}
		
		var dpref = node.queryReferences(ref_DataProvider).asList(10).get(0).getTarget();
		//var override = dpref.getValue(globalLocationNumberOverrideAtt.getID()).getSimpleValue();
		var dpLocationNumber = dpref.getValue(att_GlobalLocationNumber.getID()).getSimpleValue();

		if (dpLocationNumber != null){
			ba_CreateNewTradeItem.execute(node);			
			var newTradeItem = node.queryReferences(ptp_PartnerArticle).asList(10).get(0).getTarget();
			node.queryReferencedBy(ref_NextLowerLevel).forEach(function(nextLowerLevelReference){
				var puEach = nextLowerLevelReference.getSource();

				// Delete old references
				var currentPartnerRefs = puEach.queryReferences(ptp_PartnerArticle).asList(10);
				currentPartnerRefs.forEach(function (ref) {
					ref.delete();
				});

				// Create new references
				puEach.createReference(newTradeItem, ptp_PartnerArticle);
				return true;
			});
		}else{
			var errorGLN = new ErrorGLN();
			errorGLN.supplier = node.queryReferences(ref_DataProvider).asList(10).get(0).getTarget().getName();
			throw errorGLN;
		}
	
	}
}else{
	var errorMissing = new ErrorMissing();
	throw errorMissing;
}
}