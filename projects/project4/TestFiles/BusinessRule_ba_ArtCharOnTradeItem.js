/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_ArtCharOnTradeItem",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_SetValuesAndLinkes" ],
  "name" : "Set Article Characteristics On Trade Item",
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
    "alias" : "att_DietType",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_DietType",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_ItemCharacteristic",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ItemCharacteristic",
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
exports.operation0 = function (node,att_DietType,att_ItemCharacteristic,lookupTable) {
/*Transform the value of the att_DietType into att_ItemCharacteristic using the transformation look up table
 * Transformation look up table : tlt_PlatformTypeToPalletType.
 * If not found in the lookup table, do nothing.
 *
 * Bindings:
 * dietTypeAtt --> Diet Type (att_DietType)
 * itemCharacteristicAtt --> Article Characteristics (att_ItemCharacteristic)
 */
var itemCharExistingValues = new java.util.ArrayList;
var multivalues = node.getValue(att_ItemCharacteristic.getID()).getValues().toArray();
for (var i in multivalues) {
	itemCharExistingValues.add(multivalues[i].getID());
}

// retrieve attribute LoV value ID of dietTypeAtt
var dietTypeItr = node.getValue(att_DietType.getID()).getValues().iterator();
while (dietTypeItr.hasNext()) {
	var dietType = dietTypeItr.next().getLOVValue().getID();
	//log.info(dietType);
	//fetch the value from lookup table
	var itemCharLookUpData = lookupTable.getLookupTableValue('tlt_DietTypeToArtCharac', dietType);
	//if the lookup table doesn't contain the value it returns the same thing which is configured. This can be changed in configuration
	//log.info(itemCharLookUpData);
	if (itemCharLookUpData) {
		if (!itemCharExistingValues.contains(itemCharLookUpData)) {
			node.getValue(att_ItemCharacteristic.getID()).addLOVValueByID(itemCharLookUpData);
			itemCharExistingValues.add(itemCharLookUpData);
		}
	}
}
}