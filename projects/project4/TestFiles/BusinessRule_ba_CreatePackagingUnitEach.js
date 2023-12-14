/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_CreatePackagingUnitEach",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Create Packaging Unit [Each] when a new Article is initiated",
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
    "alias" : "prd_PackagingUnitEach",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_PackagingUnitEach",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_GlobalTradeIdentificationNumbers",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_GlobalTradeIdentificationNumbers",
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
  }, {
    "contract" : "BusinessActionBindContract",
    "alias" : "ba_CopyTIInformation",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessActionImpl",
    "value" : "ba_CopyTIInformation",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,att_GlobalTradeIdentificationNumber,prd_PackagingUnitEach,ref_GlobalTradeIdentificationNumbers,ref_NextLowerLevel,att_QuantityOfNextLowerLevel,att_ItemNumber,ptp_PartnerArticle,att_OperationalPackagingRoles,ba_CopyTIInformation) {
/*Whenever a new Article is initiated for creation, if not already in STEP, a new Packaging Unit [Each] (prd_PackagingUnitEach) needs to be created.
 * Bindings:
 * globalTradeIdentificationNumberAtt --> Global Trade Identification Number (att_GlobalTradeIdentificationNumber)
 * packagingUnitEachObjectType --> Packaging Unit [Each] (prd_PackagingUnitEach)
 * globalTradeIdentificationNumbersRef --> Global Trade Identification Numbers (ref_GlobalTradeIdentificationNumbers)
 */
//Create child object Packaging Unit [Each] 
var packagingUnit = node.createProduct(null,prd_PackagingUnitEach.getID());
packagingUnit.setName(node.getTitle());
var gtin = node.getValue(att_GlobalTradeIdentificationNumber.getID()).getSimpleValue();
var itemNum = node.getValue(att_ItemNumber.getID()).getSimpleValue();
if(gtin){	
	packagingUnit.getValue(att_GlobalTradeIdentificationNumber.getID()).setSimpleValue(gtin);	
}
if(itemNum){	
	packagingUnit.getValue(att_ItemNumber.getID()).setSimpleValue(itemNum);	
}
//Create reference Global Trade Identification Numberswhere the Source is the Packaging Unit [Each] 
//and the Target is equal to the Target of the same reference on Article.

node.queryReferences(ref_GlobalTradeIdentificationNumbers).forEach(function (ref){
	var reference = packagingUnit.createReference(ref.getTarget(), ref_GlobalTradeIdentificationNumbers);
	var values = ref.getValues().toArray();
	for (var x in values) {
		reference.getValue(values[x].getAttribute().getID()).setSimpleValue(values[x].getSimpleValue());
	}
	return true;
});

node.queryReferences(ptp_PartnerArticle).forEach(function (referencesTradeItem){
	var reference = packagingUnit.createReference(referencesTradeItem.getTarget(), ptp_PartnerArticle);
/*	var valuesTI = references[refTI].getValues().toArray();
	for (var y in valuesTI) {
		reference.getValue(valuesTI[y].getAttribute().getID()).setSimpleValue(valuesTI[y].getSimpleValue());
	}*/
	return true;
});

packagingUnit.createReference(node, ref_NextLowerLevel).getValue(att_QuantityOfNextLowerLevel.getID()).setSimpleValue(1);
packagingUnit.getValue(att_OperationalPackagingRoles.getID()).addLOVValueByID('isTradeItemAConsumerUnit');
ba_CopyTIInformation.execute(packagingUnit);
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
