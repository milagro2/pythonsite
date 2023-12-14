/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SetVatGroupBasedOnDC",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_SetValuesAndLinkes" ],
  "name" : "Set Vat Group based on data container",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_TradeItem" ],
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
    "alias" : "att_DutyFeeTaxCategory",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_DutyFeeTaxCategory",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_VATGroup",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_VATGroup",
    "description" : null
  }, {
    "contract" : "LookupTableHomeBindContract",
    "alias" : "lookupTable",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,att_DutyFeeTaxCategory,att_VATGroup,lookupTable) {
/*On trade item, for each of the data container of type 'dct_ProductDutyFeeTax' retrieve the LoV value ID of attribute att_DutyFeeTaxCategory.
 * On trade item, use the retrieved the LoV value ID to set the LoV value ID of attribute att_VATGroup using the transformation lookup table tlt_TaxCategoryToVatGroup.
 *
 * Bindings:
 * dutyFeeTaxCategoryAtt --> Duty, Fee and Tax Category (att_DutyFeeTaxCategory)
 * vatGroupAtt --> VAT Group (att_VATGroup)
 */

 //get the data containers
var containers = node.getDataContainerByTypeID('dct_ProductDutyFeeTax').getDataContainers().iterator();
while (containers.hasNext()) {
	var containerObject = containers.next().getDataContainerObject();
	//fetch the Duty, Fee and Tax Category (att_DutyFeeTaxCategory) value
	var dutyFreeTaxValue = containerObject.getValue(att_DutyFeeTaxCategory.getID()).getLOVValue();
	if (dutyFreeTaxValue) {
		var taxCategoryVat = lookupTable.getLookupTableValue('tlt_TaxCategoryToVatGroup', dutyFreeTaxValue.getID());
		log.info(taxCategoryVat);
		if (taxCategoryVat) {
				node.getValue(att_VATGroup.getID()).setLOVValueByID(taxCategoryVat);
		}
	}
}
}