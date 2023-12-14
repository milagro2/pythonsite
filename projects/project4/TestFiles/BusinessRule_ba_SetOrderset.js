/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SetOrderset",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Set Orderset (only now for packs and cases)",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_PackagingUnitCase", "prd_PackagingUnitPack", "prd_PackagingUnitPallet" ],
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
    "contract" : "AttributeBindContract",
    "alias" : "att_OrderSet",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_OrderSet",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,att_OrderSet) {
// This rule sets the orderset value for PU's in the PU WF. 
//This can be expanded to also work for a complete article if needed. 
//please remember that the PU workflow's nodes are PUs, so this rule should keep working for PUs!
//orderset is always 'no' for cases and packs. 

node.getValue(att_OrderSet.getID()).setLOVValueByID("0");
}