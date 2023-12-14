/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SetTransportCost",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Set Transport Cost",
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
    "alias" : "att_TransportationCost",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_TransportationCost",
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
exports.operation0 = function (node,ref_NextLowerLevel,att_TransportationCost,att_QuantityOfNextLowerLevel) {
/*Get the referenced by of the product
 *Get the source of reference ref_NextLowerLevel and meta attribute att_QuantityOfNextLowerLevel
 *multiple the value of att_QuantityOfNextLowerLevel with the value of  att_InitialtransportPrice
 *Set the value on source 
 *Repeat untill there is no ref_NextLowerLevel
 * 
 * Binding:
 * nextLowerLevelRef --> Next Lower Level (ref_NextLowerLevel)
 * initialtransportPriceAtt --> Initial transport Price (att_InitialtransportPrice)
 * quantityOfNextLowerLevelAtt --> Quantity of Next Lower Level (att_QuantityOfNextLowerLevel)
 */
//Added set to remove infinite loop
var sourceSet = new  java.util.HashSet();
var transportPrice = node.getValue(att_TransportationCost.getID()).getSimpleValue();
if (transportPrice){
sourceSet.add(node.getID())
node.queryReferencedBy(ref_NextLowerLevel).forEach(function(reference){
	setPrice(reference,transportPrice);
	return true;
});
}
function setPrice(reference,transportPrice){
	var quantity = reference.getValue(att_QuantityOfNextLowerLevel.getID()).getSimpleValue();
	var source = reference.getSource();
	var sourcetransportPrice = source.getValue(att_TransportationCost.getID()).getSimpleValue();
	if(sourceSet.contains(source.getID())){
		return false;
	}else{
		sourceSet.add(source.getID());
	}
	if(!quantity){
		quantity = 0;
	}
	if(!sourcetransportPrice){
		sourcetransportPrice = 0;
	}
	source.getValue(att_TransportationCost.getID()).setValue(parseFloat(transportPrice)* parseFloat(quantity));
	source.queryReferencedBy(ref_NextLowerLevel).forEach(function(reference){
		setPrice(reference,sourcetransportPrice);
		return true;
	});
}
}