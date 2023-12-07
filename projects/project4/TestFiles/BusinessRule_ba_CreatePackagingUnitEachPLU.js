/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_CreatePackagingUnitEachPLU",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Create Packaging Unit [Each] when a new Article is initiated (PLU)",
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
    "alias" : "att_PriceLookUp",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_PriceLookUp",
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
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_ItemNumber",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ItemNumber",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ptp_PartnerArticle",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ptp_PartnerArticle",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_OperationalPackagingRoles",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_OperationalPackagingRoles",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,att_PriceLookUp,prd_PackagingUnitEach,ref_NextLowerLevel,att_QuantityOfNextLowerLevel,att_ItemNumber,ptp_PartnerArticle,att_OperationalPackagingRoles) {
/*Whenever a new Article is initiated for creation, if not already in STEP, a new Packaging Unit [Each] (prd_PackagingUnitEach) needs to be created.
 * Bindings:
 * globalTradeIdentificationNumberAtt --> Global Trade Identification Number (att_GlobalTradeIdentificationNumber)
 * packagingUnitEachObjectType --> Packaging Unit [Each] (prd_PackagingUnitEach)
 * globalTradeIdentificationNumbersRef --> Global Trade Identification Numbers (ref_GlobalTradeIdentificationNumbers)
 */
//Create child object Packaging Unit [Each] 
var packagingUnit = node.createProduct(null,prd_PackagingUnitEach.getID());
packagingUnit.setName(node.getTitle());
var eachPLU = node.getValue(att_PriceLookUp.getID()).getSimpleValue();
var itemNum = node.getValue(att_ItemNumber.getID()).getSimpleValue();
if(eachPLU){	
	packagingUnit.getValue(att_PriceLookUp.getID()).setSimpleValue(eachPLU);	
}
if(itemNum){	
	packagingUnit.getValue(att_ItemNumber.getID()).setSimpleValue(itemNum);	
}
//Set Next lower level reference to Article
packagingUnit.createReference(node, ref_NextLowerLevel).getValue(att_QuantityOfNextLowerLevel.getID()).setSimpleValue(1);
packagingUnit.getValue(att_OperationalPackagingRoles.getID()).addLOVValueByID('isTradeItemAConsumerUnit');
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
