/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SetAlcoholPercentageOnBundle",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Set Alcohol Percentage on Bundle",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_BundleArticle" ],
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
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_BundleComponent",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_BundleComponent",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_AlcoholPercentage",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_AlcoholPercentage",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_Quantity",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_Quantity",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,ref_BundleComponent,att_AlcoholPercentage,att_Quantity) {
/*This functionality automatically sets the alcohol percentage on Bundles, based on the linked components.
 *
 * Bindings:
 * bundleComponentRef --> Bundle Component (ref_BundleComponent)
 * alcoholPercentageAtt --> Alcohol percentage (att_AlcoholPercentage)
 */

var totalQuantity = 0;
var totalAlcoholPercentage = 0;
var references = node.queryReferences(ref_BundleComponent).asList(10);
if (references.size()>0) {
	node.queryReferences(ref_BundleComponent).forEach(function (ref) {
		var alcoholPercentage = ref.getTarget().getValue(att_AlcoholPercentage.getID()).getSimpleValue();
		log.info(ref.getTarget().getID()+' '+alcoholPercentage);
		var quantity = ref.getValue(att_Quantity.getID()).getSimpleValue();
		if (alcoholPercentage && alcoholPercentage!= 0.00 ) {
			//Add all the values
			alcoholPercentage=alcoholPercentage*quantity;
			totalAlcoholPercentage += parseFloat(alcoholPercentage);
			totalQuantity += parseFloat(quantity);
		}
		return true;
	});
}

if (totalQuantity> 0 && totalAlcoholPercentage >0) {
	//find the average
	log.info('Total quantity: '+totalQuantity);
	log.info('Total Alcohol Percentage: '+totalAlcoholPercentage);
	var average = (totalAlcoholPercentage/totalQuantity).toFixed(2);
	log.info(average);
	node.getValue(att_AlcoholPercentage.getID()).setSimpleValue(average);
}
}