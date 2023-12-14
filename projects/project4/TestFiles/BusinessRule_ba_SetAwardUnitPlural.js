/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SetAwardUnitPlural",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Set Award Unit Plural based on Singular",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "ast_Award" ],
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
    "alias" : "att_AwardUnits",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_AwardUnits",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_AwardUnit",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_AwardUnit",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,att_AwardUnits,att_AwardUnit) {
/*Based on the value of the Award Unit Singular, using the ID of the LOV value, set the Award Unit Plural
 * Bindings:
 * awardUnitsAtt --> Award unit of measure (plural) (att_AwardUnits)
 * awardUnitAtt --> Award unit of measure (singular) (att_AwardUnit)
 */
if (node.getValue(att_AwardUnit.getID()).getID()){	
	try{
 		node.getValue(att_AwardUnits.getID()).setLOVValueByID(node.getValue(att_AwardUnit.getID()).getID());
 	}catch(e){
 		throw new "Award unit of measure (plural) (att_AwardUnits) does not contain ID "+node.getValue(att_AwardUnit.getID()).getID();
 	}
}
}