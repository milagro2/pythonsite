/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_ReleaseGTINForPallet",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_SetValuesAndLinkes" ],
  "name" : "Release GTIN for pallet",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_PackagingUnitPallet" ],
  "allObjectTypesValid" : false,
  "runPrivileged" : true,
  "onApprove" : "Never",
  "dependencies" : [ ]
}
*/
/*===== business rule plugin definition =====
{
  "pluginId" : "ReleaseGeneratedValueAction",
  "parameters" : [ {
    "id" : "Attribute",
    "type" : "com.stibo.core.domain.Attribute",
    "value" : "att_GlobalTradeIdentificationNumber"
  }, {
    "id" : "ValueGeneratorConfiguration",
    "type" : "com.stibo.valuegenerator.domain.configuration.ValueGeneratorConfiguration",
    "value" : "vg_AssignGTIN"
  } ],
  "pluginType" : "Operation"
}
*/
