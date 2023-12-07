/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SetCorrectUnitForNumberAttributes",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_SetValuesAndLinkes" ],
  "name" : "Set Correct Unit For Number Attributes",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article", "prd_BundleArticle", "prd_GiftBoxArticle", "prd_PackagingUnitCase", "prd_PackagingUnitEach", "prd_PackagingUnitPack", "prd_PackagingUnitPallet" ],
  "allObjectTypesValid" : false,
  "runPrivileged" : true,
  "onApprove" : "TriggerAndApproveNewParts",
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
    "alias" : "att_ConversionToBaseUnit",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ConversionToBaseUnit",
    "description" : null
  }, {
    "contract" : "BusinessFunctionBindContract",
    "alias" : "bfGetAllPackgingUnits",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>bfGetAllPackgingUnits</BusinessFunction>\n</BusinessFunctionReference>\n",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,att_ConversionToBaseUnit,bfGetAllPackgingUnits) {
/*
 * The the unit of the attribute values to the correct unit and convert the value to this unit
 *
 * for example cm ->> m
 *
 * - Get all values from the node
 * - for each value
 *   - get attribute default unit
 *   - get value unit
 *   - convert the value from the unit to the default unit
 *   - store the value and default unit
 *
 *   On the unit there is a value which shows the conversion to a base unit: Conversion To Base Unit (att_ConversionToBaseUnit)
 *   if there is no value skip the function
 *
 *   Calculation needs to be
 *
 *   Current Unit --> Base Unit : BaseValue = Value * conversion
 *   Base Unit --> Default Unit : DefaultValue = BaseValue / conversion
 *
 *
 *
 */

function convertToBaseUnits(values, node) {
	for (var x in values) {
		var value = values[x];
		if (value.isDerived() != true && value.isInherited() != true&& value.isDimensionPointInherited() != true ) {
			// get attribute default unit
			var defaultUnit = value.getAttribute().getDefaultUnit();
			//get value unit
			var valueUnit = null;
			try {
				valueUnit = value.getUnit();
			} catch (e) {
				continue;
			}
			if (defaultUnit && valueUnit && !defaultUnit.getID().equals(valueUnit.getID())) {
				log.info(value.getAttribute().getID());
				var conversionToBaseunit = valueUnit.getValue(att_ConversionToBaseUnit.getID()).getSimpleValue();
				log.info(conversionToBaseunit);
				var conversionToDefaultUnit = defaultUnit.getValue(att_ConversionToBaseUnit.getID()).getSimpleValue();
				if (conversionToBaseunit) {
					//Logic to convert to other unit
					var baseValue = value.getValue() * conversionToBaseunit;
					var defaultValue = baseValue / conversionToDefaultUnit;


					if (defaultValue) {
						node.getValue(value.getAttribute().getID()).setValue(defaultValue,defaultUnit);
					}
				}
			}
		}
	}
}
var valuesArticle = node.getValues().toArray();
convertToBaseUnits(valuesArticle, node);
var children = node.getChildren().toArray();
if (children.length > 0) {
	for (var y in children) {
		var valuesChildren = children[y].getValues().toArray();
		convertToBaseUnits(valuesChildren, children[y]);
	}
}
}