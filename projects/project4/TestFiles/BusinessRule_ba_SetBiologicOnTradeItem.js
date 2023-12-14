/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SetBiologicOnTradeItem",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_SetValuesAndLinkes" ],
  "name" : "Set att_Biologic On TradeItem",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_TradeItem" ],
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
    "alias" : "TradeItem",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "LookupTableHomeBindContract",
    "alias" : "LookupTableHome",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_OrganicClaim",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_OrganicClaim",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_Biologic",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_Biologic",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (TradeItem,LookupTableHome,att_OrganicClaim,att_Biologic) {
//Transform the value of the OrganicClaim into a Biologic Value using the transformation look up table tlt_OrganicClaimToBiologic


var OrganicClaim = TradeItem.getValue(att_OrganicClaim.getID()).getLOVValue();

if (OrganicClaim) {
var BiologicTypeFromLookup = LookupTableHome.getLookupTableValue('tlt_OrganicClaimToBiologic',OrganicClaim.getID());
}

if (BiologicTypeFromLookup) {
TradeItem.getValue(att_Biologic.getID()).setLOVValueByID(BiologicTypeFromLookup);
}


}