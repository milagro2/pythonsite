/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_BumpPrimaryImageVersionAndApprove",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_AssetRelatedActions" ],
  "name" : "Bump Primary Image Version And Approve",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "ast_PrimaryProductImage" ],
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
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node) {
var name = node.getName();
node.setName(name + '*');
node.setName(name);
node.approve();
}