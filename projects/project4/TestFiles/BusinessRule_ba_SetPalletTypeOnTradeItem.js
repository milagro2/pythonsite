/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SetPalletTypeOnTradeItem",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_SetValuesAndLinkes" ],
  "name" : "Set Pallet Type on Trade Item",
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
    "alias" : "att_PlatformType",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_PlatformType",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_PalletType",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_PalletType",
    "description" : null
  }, {
    "contract" : "LookupTableHomeBindContract",
    "alias" : "lookupTableHome",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,att_PlatformType,att_PalletType,lookupTableHome) {
/*
 * Transform the value of the platform type into a pallet type using the transformation look up table
 *
 * Transformation look up table : tlt_PlatformTypeToPalletType
 *
 */

var platformtype = node.getValue(att_PlatformType.getID()).getLOVValue();
if (platformtype) {
	var palletTypeFromLookup = lookupTableHome.getLookupTableValue('tlt_PlatformTypeToPalletType',platformtype.getID());
	if (palletTypeFromLookup) {
		node.getValue(att_PalletType.getID()).setLOVValueByID(palletTypeFromLookup);
	}
}
}