/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SetDecimalsOnNumberValues",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_SetValuesAndLinkes" ],
  "name" : "Set Decimals on Number Values",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article", "prd_GiftBoxArticle", "prd_PackagingUnitCase", "prd_PackagingUnitEach", "prd_PackagingUnitPack", "prd_PackagingUnitPallet" ],
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
    "alias" : "att_NumberOfDecimals",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_NumberOfDecimals",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,att_NumberOfDecimals) {
var values = node.getValues().toArray();
for (var x in values) {
	if (values[x].getSimpleValue() != null && values[x].isLocal() == true && values[x].isDerived() == false) {
		var numberOfDecimals = values[x].getAttribute().getValue(att_NumberOfDecimals.getID()).getSimpleValue();
		if (numberOfDecimals) {
			if (values[x].getAttribute().isMultiValued() == true) {
				var singleValues = values[x].getValues().toArray();
			} else {
				var singleValues = [values[x]];
			}
			for (var y in singleValues) {
				singleValues[y].setValue(Number(singleValues[y].getValue()).toFixed(numberOfDecimals), singleValues[y].getUnit());
			}
		}
	}
}
}