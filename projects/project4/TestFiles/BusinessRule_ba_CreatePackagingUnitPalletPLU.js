/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_CreatePackagingUnitPalletPLU",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Create Packaging Unit [Pallet] when a new Article is initiated (PLU)",
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
    "alias" : "att_PalletPLU",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_PalletPLU",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_PackagingUnitPallet",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_PackagingUnitPallet",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_PalletName",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_PalletName",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_PriceLookUp",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_PriceLookUp",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_PackagingUnitPack",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_PackagingUnitPack",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_PackagingUnitEach",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_PackagingUnitEach",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_PackagingUnitCase",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_PackagingUnitCase",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_QuantityOfNextLowerLevel",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_QuantityOfNextLowerLevel",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_NextLowerLevel",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_NextLowerLevel",
    "description" : null
  }, {
    "contract" : "ListOfValuesBindContract",
    "alias" : "lov_PackagingUnitID",
    "parameterClass" : "com.stibo.core.domain.impl.ListOfValuesImpl",
    "value" : "lov_PackagingUnitID",
    "description" : null
  } ],
  "messages" : [ {
    "variable" : "ErrorDuplicate",
    "message" : "The GTIN is already in use in the following {article} {name}, please select a different GTIN",
    "translations" : [ {
      "language" : "nl",
      "message" : "Het EAN-nummer wordt al gebruikt in het volgende {article} {name}, selecteer een ander EAN-nummer"
    } ]
  } ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,manager,att_PalletPLU,prd_PackagingUnitPallet,att_PalletName,att_PriceLookUp,prd_PackagingUnitPack,prd_PackagingUnitEach,prd_PackagingUnitCase,att_QuantityOfNextLowerLevel,ref_NextLowerLevel,lov_PackagingUnitID,ErrorDuplicate) {
/*Whenever a new Article is initiated for creation, if not already in STEP, a new Packaging Unit [Pallet] needs to be created.
 * Bindings:
 * palletGTINAtt--> Pallet Global Trade Identification Number (att_PalletGTIN)
 * packagingUnitPalletObjectType--> Packaging Unit [Pallet] (prd_PackagingUnitPallet)
 * palletNameAtt --> Pallet Name (att_PalletName)
 * globalTradeIdentificationNumberAtt--> Global Trade Identification Number (att_GlobalTradeIdentificationNumber)
 * entGTINObjectType-->GTIN (ent_GTIN)
 * globalTradeIdentificationNumbersRef--> Global Trade Identification Numbers (ref_GlobalTradeIdentificationNumbers)
 * externalGTINSEntity --> External GTINs (ExternalGTINS)
 */

//Retrieve attribute value Case Global Trade Identification Number (att_CaseGTIN).
var packagingCase;
var packagingPack;
var packagingEach;


var packagingUnitPallet = node.createProduct(null,prd_PackagingUnitPallet.getID());
if(packagingUnitPallet) {
	var packName = lov_PackagingUnitID.getListOfValuesValueByID(prd_PackagingUnitPallet.getID()).getValue()
	packagingUnitPallet.setName(node.getName() + ' - ' + packName);
}

	
//For PU [Pallet], search under the same parent Article for a PU [Case],PU[Pack],PU[Each].
var children = node.getChildren().toArray();
for(var x in children){
	var child = children[x];
	if(child.getObjectType().getID().equals(prd_PackagingUnitCase.getID())){
		if(!packagingCase){		
			packagingCase = child;
		}						
	}
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
if(packagingCase){
	packagingUnitPallet.createReference(packagingCase, ref_NextLowerLevel);
}else if(packagingPack){
	packagingUnitPallet.createReference(packagingPack, ref_NextLowerLevel);
}else if(packagingEach){
	packagingUnitPallet.createReference(packagingEach, ref_NextLowerLevel);
}else{
	packagingUnitPallet.createReference(node, ref_NextLowerLevel);
}
}
/*===== business rule plugin definition =====
{
  "pluginId" : "ReferenceOtherBCBusinessCondition",
  "parameters" : [ {
    "id" : "ReferencedBC",
    "type" : "com.stibo.core.domain.businessrule.BusinessCondition",
    "value" : "ba_PLUIsPopulated"
  }, {
    "id" : "ValueWhenReferencedIsNA",
    "type" : "com.stibo.util.basictypes.TrueFalseParameter",
    "value" : "false"
  } ],
  "pluginType" : "Precondition"
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
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "LoggerBindContract",
    "alias" : "log",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_PackagingUnitPallet",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_PackagingUnitPallet",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Precondition"
}
*/
exports.precondition1 = function (node,manager,log,prd_PackagingUnitPallet) {
var currentObject = node.getObjectType().getID();
//If we are not on packaging unit pallet, we find the pallet and set it to be the node.
if (currentObject != String(prd_PackagingUnitPallet.getID())) {
	var children = node.getChildren().toArray();
	for (var x in children) {
		var child = children[x];
		if (child.getObjectType().getID().equals(prd_PackagingUnitPallet.getID())) {
			return false;
		}
	}
	return true;
} else {
	return false;
}
}