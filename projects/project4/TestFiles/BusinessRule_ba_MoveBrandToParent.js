/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_MoveBrandToParent",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_MigrationActions" ],
  "name" : "Move Brand to Parent",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "ast_Brand" ],
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
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "ClassificationBindContract",
    "alias" : "Brands",
    "parameterClass" : "com.stibo.core.domain.impl.FrontClassificationImpl",
    "value" : "Brands",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,manager,Brands) {
var name = node.getName();
var parentLetter = name.slice(0, 1);
var parentID = 'BrandIndex_'+ parentLetter.toUpperCase();
node.addClassification(manager.getClassificationHome().getClassificationByID(parentID));
node.removeClassification(Brands);
}