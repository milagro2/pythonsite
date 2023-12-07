/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_CreatePackagingUnitPackPLU",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Create Packaging Unit [Pack] when a new Article is initiated (PLU)",
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
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_PackagingUnitPack",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_PackagingUnitPack",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_PackName",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_PackName",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_PriceLookUp",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_PriceLookUp",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_PackPLU",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_PackPLU",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_PackagingUnitEach",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_PackagingUnitEach",
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
exports.operation0 = function (node,manager,prd_PackagingUnitPack,att_PackName,att_PriceLookUp,att_PackPLU,prd_PackagingUnitEach,ref_NextLowerLevel,att_QuantityOfNextLowerLevel,ErrorDuplicate) {
/*Whenever a new Article is initiated for creation, if not already in STEP, a new Packaging Unit [Pack] needs to be created.
 * Bindings:
 * packagingUnitPackObjectType--> Packaging Unit [Pack] (prd_PackagingUnitPack)
 * packNameAtt --> Pack Name (att_PackName)
 * globalTradeIdentificationNumberAtt--> Global Trade Identification Number (att_GlobalTradeIdentificationNumber)
 * entGTINObjectType-->GTIN (ent_GTIN)
 * packGTINAtt-->Pack Global Trade Identification Number (att_PackGTIN)
 * globalTradeIdentificationNumbersRef--> Global Trade Identification Numbers (ref_GlobalTradeIdentificationNumbers)
 * externalGTINSEntity --> External GTINs (ExternalGTINS)
 */

//Retrieve attribute value Pack Global Trade Identification Number (att_CaseGTIN).
var packGTIN = node.getValue(att_PackPLU.getID()).getSimpleValue();
var found = false;
if(packGTIN){
	//create child object Packaging Unit 
	var packagingUnitPack = node.createProduct(null,prd_PackagingUnitPack.getID());
	var packName = node.getValue(att_PackName.getID()).getSimpleValue();
	if(packName){
		packagingUnitPack.setName(packName);
	}
	packagingUnitPack.getValue(att_PriceLookUp.getID()).setSimpleValue(packGTIN);

	//For PU [Pack], search under the same parent Article for a PU [Each]
	var children = node.getChildren().toArray();
	for(var x in children){
		var child = children[x];
		logger.info(child.getObjectType().getID());
		if(child.getObjectType().getID().equals(prd_PackagingUnitEach.getID())){
			log.info("1");
			//If found, create reference Next Lower Level between source PU [Pack] and target PU[Each]. 
			packagingUnitPack.createReference(child, ref_NextLowerLevel).getValue(att_QuantityOfNextLowerLevel.getID()).setSimpleValue(6);
			found = true;
			break;
			
		}
		
	}
	if(!found){
		log.info("2");
		//Else, create reference Next Lower Level between source PU [Pack] and target Article.
		packagingUnitPack.createReference(node, ref_NextLowerLevel).getValue(att_QuantityOfNextLowerLevel.getID()).setSimpleValue(6);
	}
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
