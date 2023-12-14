/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "bc_IsLOVRelevantForCOSMOS",
  "type" : "BusinessCondition",
  "setupGroups" : [ "brg_Conditions" ],
  "name" : "Is LOV Relevant For COSMOS",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "Domain user-type root" ],
  "allObjectTypesValid" : false,
  "runPrivileged" : true,
  "onApprove" : "Never",
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
  }, {
    "contract" : "LoggerBindContract",
    "alias" : "logger",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "ListOfValuesBindContract",
    "alias" : "lov_Color",
    "parameterClass" : "com.stibo.core.domain.impl.ListOfValuesImpl",
    "value" : "lov_Color",
    "description" : null
  }, {
    "contract" : "ListOfValuesBindContract",
    "alias" : "lov_GNCode",
    "parameterClass" : "com.stibo.core.domain.impl.ListOfValuesImpl",
    "value" : "lov_GNCode",
    "description" : null
  }, {
    "contract" : "ListOfValuesBindContract",
    "alias" : "lov_GrapeVariety",
    "parameterClass" : "com.stibo.core.domain.impl.ListOfValuesImpl",
    "value" : "lov_GrapeVariety",
    "description" : null
  }, {
    "contract" : "ListOfValuesBindContract",
    "alias" : "lov_DCFee",
    "parameterClass" : "com.stibo.core.domain.impl.ListOfValuesImpl",
    "value" : "lov_DCFee",
    "description" : null
  }, {
    "contract" : "ListOfValuesBindContract",
    "alias" : "lov_ItemAssortment",
    "parameterClass" : "com.stibo.core.domain.impl.ListOfValuesImpl",
    "value" : "lov_ItemAssortment",
    "description" : null
  }, {
    "contract" : "ListOfValuesBindContract",
    "alias" : "lov_AwardUOM",
    "parameterClass" : "com.stibo.core.domain.impl.ListOfValuesImpl",
    "value" : "lov_AwardUOM",
    "description" : null
  }, {
    "contract" : "ListOfValuesBindContract",
    "alias" : "lov_AwardUOMPlural",
    "parameterClass" : "com.stibo.core.domain.impl.ListOfValuesImpl",
    "value" : "lov_AwardUOMPlural",
    "description" : null
  }, {
    "contract" : "ListOfValuesBindContract",
    "alias" : "lov_ReturnEnballage",
    "parameterClass" : "com.stibo.core.domain.impl.ListOfValuesImpl",
    "value" : "lov_ReturnEnballage",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,logger,lov_Color,lov_GNCode,lov_GrapeVariety,lov_DCFee,lov_ItemAssortment,lov_AwardUOM,lov_AwardUOMPlural,lov_ReturnEnballage) {
/*
 *  Name: 	bc_IsLOVRelevantForCOSMOS
 *  Purpose: 	Event filter for oiep_OCOS1 to only include events for certain LOV objects.
 *  Binds:
 *  			node -> Current Object
 *  			logger -> Logger
 *  			lov_Color -> List Of Values -> Color (lov_Color)
 *  			lov_GNCode -> List Of Values -> GN Code (lov_GNCode)
 *  			lov_GrapeVariety -> List Of Values -> Grape Variety (lov_GrapeVariety)
 *  			lov_DCFee -> List Of Values -> DC Fee (lov_DCFee)
 *  			lov_ItemAssortment -> List Of Values -> Assortment code (lov_ItemAssortment)
 *  			lov_AwardUOM -> List Of Values -> Award unit of measure (singular) (lov_AwardUOM)
 *  			lov_AwardUOMPlural -> List Of Values -> Award unit of measure (plural) (lov_AwardUOMPlural)
 *  			lov_ReturnEnballage -> List Of Values -> Return Enballage (lov_ReturnEnballage)

*/

// Debug
var isDebug = false;
function logDebug(msg) {
  	if (isDebug) {
logger.info(msg);
}
}

var currLOV = node.getID();
logDebug('currLOV: ' + currLOV);

if (currLOV == lov_Color.getID() || currLOV == lov_GNCode.getID() || currLOV == lov_ItemAssortment.getID() ||
	currLOV == lov_GrapeVariety.getID() || currLOV == lov_DCFee.getID() || currLOV == lov_AwardUOM.getID() ||
	currLOV == lov_AwardUOMPlural.getID() || currLOV == lov_ReturnEnballage.getID()) {
	logDebug('currLOV is correct: ' + currLOV);
	return true;
} else {
	logDebug('currLOV is not correct: ' + currLOV);
	return false;
}
}