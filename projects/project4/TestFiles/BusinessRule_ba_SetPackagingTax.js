/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SetPackagingTax",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Set Packaging Tax",
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
    "alias" : "att_PackagingTaxAmount",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_PackagingTaxAmount",
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
exports.operation0 = function (node,ref_NextLowerLevel,att_PackagingTaxAmount,att_QuantityOfNextLowerLevel) {
/*Get the referenced by of the product
 *Get the source of reference ref_NextLowerLevel and meta attribute att_QuantityOfNextLowerLevel
 *multiple the value of att_QuantityOfNextLowerLevel with the value of  att_InitialpackTax
 *Set the value on source 
 *Repeat untill there is no ref_NextLowerLevel
 * 
 * Binding:
 * nextLowerLevelRef --> Next Lower Level (ref_NextLowerLevel)
 * initialpackTaxAtt --> Initial transport Price (att_InitialpackTax)
 * quantityOfNextLowerLevelAtt --> Quantity of Next Lower Level (att_QuantityOfNextLowerLevel)
 */
//Added set to remove infinite loop
var sourceSet = new  java.util.HashSet();
var packTax = node.getValue(att_PackagingTaxAmount.getID()).getSimpleValue();
if (packTax){
sourceSet.add(node.getID())
node.queryReferencedBy(ref_NextLowerLevel).forEach(function(reference){
	setPrice(reference,packTax);
	return true;
});
}

function setPrice(reference,packTax){
	var quantity = reference.getValue(att_QuantityOfNextLowerLevel.getID()).getSimpleValue();
	var source = reference.getSource();
	var sourcepackTax = source.getValue(att_PackagingTaxAmount.getID()).getSimpleValue();
	if(sourceSet.contains(source.getID())){
		return false;
	}else{
		sourceSet.add(source.getID());
	}
	if(!quantity){
		quantity = 0;
	}
	if(!sourcepackTax){
		sourcepackTax = 0;
	}
	source.getValue(att_PackagingTaxAmount.getID()).setValue(parseFloat(packTax)* parseFloat(quantity));
	source.queryReferencedBy(ref_NextLowerLevel).forEach(function(reference){
		setPrice(reference,sourcepackTax);
		return true;
	});
}
}