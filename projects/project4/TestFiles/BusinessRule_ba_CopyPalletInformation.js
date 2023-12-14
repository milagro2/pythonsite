/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_CopyPalletInformation",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Copy Pallet Information",
  "description" : "Copy Pallet Information",
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article", "prd_GiftBoxArticle" ],
  "allObjectTypesValid" : false,
  "runPrivileged" : false,
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
    "contract" : "BusinessFunctionBindContract",
    "alias" : "bfGetAllPackgingUnits",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>bfGetAllPackgingUnits</BusinessFunction>\n</BusinessFunctionReference>\n",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_PackagingUnitPack",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_PackagingUnitPack",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ptp_PartnerArticle",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ptp_PartnerArticle",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_QuantityOfLayers",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_QuantityOfLayers",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_QuantityPerLayer",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_QuantityPerLayer",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_PalletType",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_PalletType",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_GlobalTradeIdentificationNumber",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_GlobalTradeIdentificationNumber",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_ColloGlobalTradeIdentificationNumber",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ColloGlobalTradeIdentificationNumber",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_PackagingUnitCase",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_PackagingUnitCase",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_PackagingUnitPallet",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_PackagingUnitPallet",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,bfGetAllPackgingUnits,prd_PackagingUnitPack,ptp_PartnerArticle,att_QuantityOfLayers,att_QuantityPerLayer,att_PalletType,att_GlobalTradeIdentificationNumber,att_ColloGlobalTradeIdentificationNumber,prd_PackagingUnitCase,prd_PackagingUnitPallet) {
/* This functionality automatically copies pallet information from the Pallet, Pack or Case packaging unit, when such information is available.
 *
 * Bindings:
 * getAllPackgingUnitsBf --> Get all packaging units for an article (bfGetAllPackgingUnits)
 * packagingUnitPackObjectType --> Packaging Unit [Pack] (prd_PackagingUnitPack)
 * partnerArticleRef --> Partner Article - Information Provider (ptp_PartnerArticle)
 * quantityOfLayersAtt --> Quantity Of Layers (att_QuantityOfLayers)
 * quantityPerLayerAtt --> Quantity Per Layer (att_QuantityPerLayer)
 * palletTypeAtt --> Pallet Type (att_PalletType)
 * gtinAtt --> EAN Number (att_GlobalTradeIdentificationNumber)
 * collogtinAtt --> Collo EAN Number (att_ColloGlobalTradeIdentificationNumber)
 * packagingUnitCaseObjectType --> Packaging Unit [Case] (prd_PackagingUnitCase)
 * packagingUnitPalletObjectType --> Packaging Unit [Pallet] (prd_PackagingUnitPallet)
 */

//Using the business function Get all packaging units for an article (bfGetAllPackgingUnits), get all packaging units for the current node.
var result = bfGetAllPackgingUnits.evaluate({node: node}).toArray();
var objectTypeProductMap = new java.util.HashMap();	//map of object type and array list of product
//Add a object type as key and list of products as a value n map.
for (var x in result) {
	var objectType = result[x].getObjectType().getID();
	if (!objectTypeProductMap.get(objectType)) {
		var productList = new java.util.ArrayList;
		productList.add(result[x]);
		objectTypeProductMap.put(objectType,productList);
	} else {
		var productList = objectTypeProductMap.get(objectType);
		productList.add(result[x]);
		objectTypeProductMap.put(objectType,productList);
	}
}

//Based on the object type copy the values
if (objectTypeProductMap.get(prd_PackagingUnitPack.getID()) != null && !objectTypeProductMap.get(prd_PackagingUnitPack.getID()).isEmpty() &&
	doesAttributesHasValue(objectTypeProductMap.get(prd_PackagingUnitPack.getID()))) {
	//doesAttributesHasValue already copied the data
} else if (objectTypeProductMap.get(prd_PackagingUnitCase.getID()) != null && !objectTypeProductMap.get(prd_PackagingUnitCase.getID()).isEmpty() &&
	doesAttributesHasValue(objectTypeProductMap.get(prd_PackagingUnitCase.getID()))) {
	//doesAttributesHasValue already copied the data
} else if (objectTypeProductMap.get(prd_PackagingUnitPallet.getID()) != null && !objectTypeProductMap.get(prd_PackagingUnitPallet.getID()).isEmpty() &&
	doesAttributesHasValue(objectTypeProductMap.get(prd_PackagingUnitPallet.getID()))) {
	//doesAttributesHasValue already copied the data
}

function doesAttributesHasValue(productList) {
	var hasValue = false;
	for (var i=0; i<productList.size(); i++) {
		var packagingUnit = productList.get(i);
		//fetch the ptp_PartnerArticle references.
		packagingUnit.queryReferences(ptp_PartnerArticle).forEach(function (ptpref) {
			var partnerArticle = ptpref.getTarget();
			var quantityOfLayer = partnerArticle.getValue(att_QuantityOfLayers.getID()).getSimpleValue();
			var quantityPerLayer = partnerArticle.getValue(att_QuantityPerLayer.getID()).getSimpleValue();
			var palletType = partnerArticle.getValue(att_PalletType.getID()).getSimpleValue();
			var ean = partnerArticle.getValue(att_GlobalTradeIdentificationNumber.getID()).getSimpleValue();
			//Copy attribute values
			if (quantityOfLayer && quantityPerLayer) {
				node.getValue(att_QuantityOfLayers.getID()).setSimpleValue(quantityOfLayer);
				node.getValue(att_QuantityPerLayer.getID()).setSimpleValue(quantityPerLayer);
				node.getValue(att_PalletType.getID()).setSimpleValue(palletType);
				node.getValue(att_ColloGlobalTradeIdentificationNumber.getID()).setSimpleValue(ean);
				hasValue = true;
			}
			return true;
		});
	}
	return hasValue;
}
}