/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SetInitialPricing",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Set Initial Purchase Price",
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
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_NextLowerLevel",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_NextLowerLevel",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_InitialPurchasePrice",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_InitialPurchasePrice",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_QuantityOfNextLowerLevel",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_QuantityOfNextLowerLevel",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,ref_NextLowerLevel,att_InitialPurchasePrice,att_QuantityOfNextLowerLevel) {
/*Get the referenced by of the product
 *Get the source of reference ref_NextLowerLevel and meta attribute att_QuantityOfNextLowerLevel
 *multiple the value of att_QuantityOfNextLowerLevel with the value of  att_InitialPurchasePrice
 *Set the value on source 
 *Repeat untill there is no ref_NextLowerLevel
 * 
 * Binding:
 * nextLowerLevelRef --> Next Lower Level (ref_NextLowerLevel)
 * initialPurchasePriceAtt --> Initial Purchase Price (att_InitialPurchasePrice)
 * quantityOfNextLowerLevelAtt --> Quantity of Next Lower Level (att_QuantityOfNextLowerLevel)
 */
//Added set to remove infinite loop
var sourceSet = new  java.util.HashSet();
var purchasePrice = node.getValue(att_InitialPurchasePrice.getID()).getSimpleValue();
sourceSet.add(node.getID())
node.queryReferencedBy(ref_NextLowerLevel).forEach(function(reference){
	setPrice(reference,purchasePrice);
	return true;
});

function setPrice(reference,purchasePrice){
	var quantity = reference.getValue(att_QuantityOfNextLowerLevel.getID()).getSimpleValue();
	var source = reference.getSource();
	var sourcePurchasePrice = source.getValue(att_InitialPurchasePrice.getID()).getSimpleValue();
	if(sourceSet.contains(source.getID())){
		return false;
	}else{
		sourceSet.add(source.getID());
	}
	if(!quantity){
		quantity = 0;
	}
	if(!sourcePurchasePrice){
		sourcePurchasePrice = 0;
	}
	source.getValue(att_InitialPurchasePrice.getID()).setValue(parseFloat(purchasePrice)* parseFloat(quantity));
	source.queryReferencedBy(ref_NextLowerLevel).forEach(function(reference){
		setPrice(reference,sourcePurchasePrice);
		return true;
	});
}
}