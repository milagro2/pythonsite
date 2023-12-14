/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SetTasteProfileErrorNoTPCombo",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_SetValuesAndLinkes" ],
  "name" : "Set taste profile error no taste profile combination known",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article" ],
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
    "contract" : "ReferenceTypeBindContract",
    "alias" : "pte_TasteProfile",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "pte_TasteProfile",
    "description" : null
  } ],
  "messages" : [ {
    "variable" : "ErrorMessage",
    "message" : "This combination of taste elements is not known, please select a taste profile manually.",
    "translations" : [ ]
  }, {
    "variable" : "ErrorMessageAtt",
    "message" : "Some of the taste elements are not filled, please check.",
    "translations" : [ ]
  } ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,pte_TasteProfile,ErrorMessage,ErrorMessageAtt) {
if (node.queryReferences(pte_TasteProfile).asList(1).size() == 0) {
	var error = new ErrorMessage();
	throw error;
}
}
/*===== business rule plugin definition =====
{
  "pluginId" : "JavaScriptBusinessConditionWithBinds",
  "binds" : [ {
    "contract" : "CurrentObjectBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_ProductType",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ProductType",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Precondition"
}
*/
exports.precondition0 = function (node,att_ProductType) {
/*Product Type (att_ProductType) = Wijn
 * Bindings:
 * productTypeAtt --> Product Type (att_ProductType)
 */

if ('Wijn'.equals(node.getValue(att_ProductType.getID()).getSimpleValue())) {
	return true;
} else {
	return false;
}
}