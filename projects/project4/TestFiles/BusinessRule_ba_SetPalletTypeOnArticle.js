/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SetPalletTypeOnArticle",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Set Pallet Type on Article",
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
    "alias" : "att_PalletType",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_PalletType",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_QuantityPerLayer",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_QuantityPerLayer",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_QuantityOfLayers",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_QuantityOfLayers",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_PackagingUnitCase",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_PackagingUnitCase",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_PackagingUnitEach",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_PackagingUnitEach",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_PackagingUnitPack",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_PackagingUnitPack",
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
exports.operation0 = function (node,att_PalletType,att_QuantityPerLayer,att_QuantityOfLayers,prd_PackagingUnitCase,prd_PackagingUnitEach,prd_PackagingUnitPack,prd_PackagingUnitPallet) {
/*The Pallet Type (att_PalletType), Quantity Per Layer (att_QuantityPerLayer), Quantity Of Layers (att_QuantityOfLayers) on article is derived
 * from the corresponding attributes on the packaging unit where the value is filled. There could be multiple packaging units with the value, the value of the first encountered will be used.
 *
 * Bindings:
 * palletTypeAtt -->Pallet Type (att_PalletType)
 * quantityPerLayerAtt -->Quantity Per Layer (att_QuantityPerLayer)
 * quantityOfLayersAtt --> Quantity Of Layers (att_QuantityOfLayers)
 * packagingUnitCaseObjectType --> Packaging Unit [Case] (prd_PackagingUnitCase)
 * packagingUnitEachObjectType --> Packaging Unit [Each] (prd_PackagingUnitEach)
 * packagingUnitPackObjectType --> Packaging Unit [Pack] (prd_PackagingUnitPack)
 * packagingUnitPalletObjectType --> Packaging Unit [Pallet] (prd_PackagingUnitPallet)
 */
var children = node.getChildren().toArray();
var palletType;
var quantityPerLayer;
var quantityOfLayer;
for (var x in children) {
	var child = children[x];
	if (child.getObjectType().getID().equals(prd_PackagingUnitCase.getID()) ||
		child.getObjectType().getID().equals(prd_PackagingUnitEach.getID()) ||
		child.getObjectType().getID().equals(prd_PackagingUnitPack.getID()) ||
		child.getObjectType().getID().equals(prd_PackagingUnitPallet.getID())) {
		if (!palletType && child.getValue(att_PalletType.getID()).getSimpleValue()) {
			palletType = child.getValue(att_PalletType.getID()).getSimpleValue();
		}
		if (!quantityPerLayer && child.getValue(att_QuantityPerLayer.getID()).getSimpleValue()) {
			quantityPerLayer = child.getValue(att_QuantityPerLayer.getID()).getSimpleValue();
		}
		if (!quantityOfLayer && child.getValue(att_QuantityOfLayers.getID()).getSimpleValue()) {
			quantityOfLayer = child.getValue(att_QuantityOfLayers.getID()).getSimpleValue();
		}

		if (quantityOfLayer && quantityPerLayer && palletType) {
			break;
		}
	}
}
if (palletType) {
	node.getValue(att_PalletType.getID()).setValue(palletType);
}

if (quantityPerLayer) {
	node.getValue(att_QuantityPerLayer.getID()).setValue(quantityPerLayer);
}
if (quantityOfLayer) {
	node.getValue(att_QuantityOfLayers.getID()).setValue(quantityOfLayer);
}
}