/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_CreatePackagingUnitCase",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Create Packaging Unit [Case] when a new Article is initiated",
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
    "alias" : "att_CaseGTIN",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_CaseGTIN",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_PackagingUnitCase",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_PackagingUnitCase",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_CaseName",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_CaseName",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_GlobalTradeIdentificationNumber",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_GlobalTradeIdentificationNumber",
    "description" : null
  }, {
    "contract" : "BusinessActionBindContract",
    "alias" : "ba_CreateNewGTIN",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessActionImpl",
    "value" : "ba_CreateNewGTIN",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_PackagingUnitPack",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_PackagingUnitPack",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_NextLowerLevel",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_NextLowerLevel",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_QuantityOfNextLowerLevel",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_QuantityOfNextLowerLevel",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_GlobalTradeIdentificationNumbers",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_GlobalTradeIdentificationNumbers",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_PackagingUnitEach",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_PackagingUnitEach",
    "description" : null
  } ],
  "messages" : [ {
    "variable" : "ErrorDuplicate",
    "message" : "The GTIN number is already in use in the following {article} {name}, please select a different GTIN number",
    "translations" : [ {
      "language" : "nl",
      "message" : "Het EAN-nummer wordt al gebruikt in het volgende {article} {name}, selecteer een ander EAN-nummer"
    } ]
  } ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,manager,att_CaseGTIN,prd_PackagingUnitCase,att_CaseName,att_GlobalTradeIdentificationNumber,ba_CreateNewGTIN,prd_PackagingUnitPack,ref_NextLowerLevel,att_QuantityOfNextLowerLevel,ref_GlobalTradeIdentificationNumbers,prd_PackagingUnitEach,ErrorDuplicate) {
/*Whenever a new Article is initiated for creation, if not already in STEP, a new Packaging Unit [Case] needs to be created.
 * Bindings:
 * caseGTINAtt--> Case Global Trade Identification Number (att_CaseGTIN)
 * packagingUnitCaseObjectType--> Packaging Unit [Case] (prd_PackagingUnitCase)
 * caseNameAtt --> Case Name (att_CaseName)
 * globalTradeIdentificationNumberAtt--> Global Trade Identification Number (att_GlobalTradeIdentificationNumber)
 * entGTINObjectType-->GTIN (ent_GTIN)
 * globalTradeIdentificationNumbersRef--> Global Trade Identification Numbers (ref_GlobalTradeIdentificationNumbers)
 * externalGTINSEntity --> External GTINs (ExternalGTINS)
 */

//Retrieve attribute value Case Global Trade Identification Number (att_CaseGTIN).
var packagingPack;
var packagingEach;
var found = false;
var caseGTIN = node.getValue(att_CaseGTIN.getID()).getSimpleValue();
if(caseGTIN){
	//create child object Packaging Unit Case 
	var packagingUnitCase = node.createProduct(null,prd_PackagingUnitCase.getID());
	var caseName = node.getValue(att_CaseName.getID()).getSimpleValue();
	if(caseName){
		packagingUnitCase.setName(caseName);
	}
	packagingUnitCase.getValue(att_GlobalTradeIdentificationNumber.getID()).setSimpleValue(caseGTIN);
	
	var gtin = '00000000000000'.substring(1,15-caseGTIN.length()) + caseGTIN;
	var gtinObject = manager.getNodeHome().getObjectByKey('key_GTINObject', gtin);
	logger.info(gtinObject);
	if (!gtinObject) {
		ba_CreateNewGTIN.execute(packagingUnitCase);
	}else{
		var references = gtinObject.queryReferencedBy(ref_GlobalTradeIdentificationNumbers).asList(10);
		if (references.size() > 0) {
			var referencesByID = gtinObject.queryReferencedBy(ref_GlobalTradeIdentificationNumbers).asList(10).get(0).getSource().getID();
			var referencesByName = gtinObject.queryReferencedBy(ref_GlobalTradeIdentificationNumbers).asList(10).get(0).getSource().getName();
			errorDuplicate = new ErrorDuplicate();
			errorDuplicate.article = referencesByID;
			errorDuplicate.name = referencesByName;
			throw errorDuplicate;
		}
	}

	//For PU [Case], search under the same parent Article for a PU [Pack].
//For PU [Pallet], search under the same parent Article for a PU [Case],PU[Pack],PU[Each].
	var children = node.getChildren().toArray();
	for(var x in children){
		var child = children[x];
		if(child.getObjectType().getID().equals(prd_PackagingUnitPack.getID())){
			if(!packagingPack){		
				packagingPack = child;
			}						
		}
		if(child.getObjectType().getID().equals(prd_PackagingUnitEach.getID())){ 
			if(!packagingEach){		
				packagingEach = child;
			}						
		}		
	}
	if(packagingPack){
		packagingUnitCase.createReference(packagingPack, ref_NextLowerLevel).getValue(att_QuantityOfNextLowerLevel.getID()).setSimpleValue(4);
	}else if(packagingEach){
		packagingUnitCase.createReference(packagingEach, ref_NextLowerLevel).getValue(att_QuantityOfNextLowerLevel.getID()).setSimpleValue(4);
	}else{
		packagingUnitCase.createReference(node, ref_NextLowerLevel).getValue(att_QuantityOfNextLowerLevel.getID()).setSimpleValue(4);
	}
}
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
