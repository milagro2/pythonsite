/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "bf_GetValueInBaseUnit",
  "type" : "BusinessFunction",
  "setupGroups" : [ "brg_Functions" ],
  "name" : "Get Value in base unit",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ ],
  "allObjectTypesValid" : true,
  "runPrivileged" : false,
  "onApprove" : "Never",
  "dependencies" : [ ]
}
*/
/*===== business rule plugin definition =====
{
  "pluginId" : "JavaScriptBusinessFunctionWithBinds",
  "binds" : [ {
    "contract" : "AttributeBindContract",
    "alias" : "att_ConversionToBaseUnit",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ConversionToBaseUnit",
    "description" : null
  }, {
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "LoggerBindContract",
    "alias" : "log",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation",
  "functionReturnType" : "java.lang.String",
  "functionParameterBinds" : [ {
    "contract" : "NodeBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : "current node"
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "attribute",
    "parameterClass" : "null",
    "value" : null,
    "description" : "which attribute value "
  }, {
    "contract" : "StringBindContract",
    "alias" : "workspace",
    "parameterClass" : "null",
    "value" : null,
    "description" : "Main or Approved"
  } ]
}
*/
exports.operation0 = function (att_ConversionToBaseUnit,manager,log,node,attribute,workspace) {
// Get workspace appropriate value 
var value;
if (workspace == "Approved") {
	manager.executeInWorkspace('Approved', function (approvedManager) {
		var approvedNode = approvedManager.getProductHome().getProductByID(node.getID());
		if (approvedNode) {
			value = approvedNode.getValue(attribute.getID());
		}
	});
} else {
	value = node.getValue(attribute.getID());

}


// Return undefined if derived / inherited
if(value !== undefined) {

	if (value.isDerived() || value.isInherited() || value.isDimensionPointInherited()) {
		return;
	}
	
	var defaultUnit = value.getAttribute().getDefaultUnit();
	var currentAttribute = value.getAttribute().getID();
	if(!value.getAttribute().isMultiValued() && !value.getAttribute().hasLOV()) {

		var valueUnit = value.getUnit();
		
		// If there's no unit attached, return the simple value
		if (valueUnit === null) {
			return value.getSimpleValue();
		}
		
		var valueUnitID = String(valueUnit.getID());
		
		if (defaultUnit && valueUnit && !defaultUnit.getID().equals(valueUnit.getID())) {
			if ((currentAttribute.equals('att_NetContents'))) {
				var currentValue = +value.getValue();
		
				if (valueUnitID.equals('unece.unit.KGM')) {
					return (currentValue * 100) + defaultUnit.getName();
				}
		
				if (valueUnitID.equals('unece.unit.GRM')) {
					return (currentValue / 10) + defaultUnit.getName();
				}
			}
		
			// Old functionality
			var conversionToBaseunit = valueUnit.getValue(att_ConversionToBaseUnit.getID()).getSimpleValue();
			var conversionToDefaultUnit = defaultUnit.getValue(att_ConversionToBaseUnit.getID()).getSimpleValue();
		
			if (conversionToBaseunit) {
				// Logic to convert to other unit
				var baseValue = value.getValue() * conversionToBaseunit;
				baseValue = +baseValue.toFixed(8);
				var defaultValue = baseValue / conversionToDefaultUnit;
		
		
				if (defaultValue) {
					return (defaultValue + defaultUnit.getName());
				}
			}
		}
	
		return value.getValue() + defaultUnit.getName();
	} else {
		return value.getSimpleValue();
	}
} else {
	return null;
}
}