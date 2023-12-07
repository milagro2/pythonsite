/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "bc_STEPNameMaxLength70",
  "type" : "BusinessCondition",
  "setupGroups" : [ "brg_Conditions" ],
  "name" : "STEP Name - Max length 70",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "ast_Award", "ast_Brand" ],
  "allObjectTypesValid" : false,
  "runPrivileged" : true,
  "onApprove" : "ValidateBefore",
  "dependencies" : [ ]
}
*/
/*===== business rule plugin definition =====
{
  "pluginId" : "JavaScriptBusinessConditionWithBinds",
  "binds" : [ {
    "contract" : "CurrentObjectBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ {
    "variable" : "errorMessage",
    "message" : "The name of the object is too long (max 70 characters)",
    "translations" : [ {
      "language" : "nl",
      "message" : "De naam van het object is te lang (max. 70 tekens)"
    } ]
  } ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,errorMessage) {
if (String(node.getName()).length > 70) {
	var errMSG = new errorMessage();
	return errMSG;
}
return true;
}