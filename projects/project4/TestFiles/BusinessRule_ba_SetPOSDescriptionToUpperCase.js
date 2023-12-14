/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SetPOSDescriptionToUpperCase",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_SetValuesAndLinkes" ],
  "name" : "Set POS Description to Upper Case",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_BundleArticle", "prd_PackagingUnitCase", "prd_PackagingUnitEach", "prd_PackagingUnitPack", "prd_PackagingUnitPallet" ],
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
    "alias" : "att_POSDescription",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_POSDescription",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,att_POSDescription) {
var value = node.getValue(att_POSDescription.getID()).getSimpleValue();
if (value && node.getValue(att_POSDescription.getID()).isInherited() == false && node.getValue(att_POSDescription.getID()).isLanguageInherited() == false) {
	node.getValue(att_POSDescription.getID()).setSimpleValue(String(value).toUpperCase());
}
}