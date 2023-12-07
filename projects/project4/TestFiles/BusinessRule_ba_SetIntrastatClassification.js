/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SetIntrastatClassification",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Set Intrastat Classification",
  "description" : "Set Intrastat Classifcation based on Intrastat code text value.",
  "scope" : "Global",
  "validObjectTypes" : [ "prd_TradeItem" ],
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
    "contract" : "LoggerBindContract",
    "alias" : "logger",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_IntrastatClassification",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_IntrastatClassification",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_IntrastatClassification_Text",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_IntrastatClassification_Text",
    "description" : null
  }, {
    "contract" : "CurrentObjectBindContract",
    "alias" : "obj",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (logger,att_IntrastatClassification,att_IntrastatClassification_Text,obj) {
/*
 *  Name: 	ba_SetIntrastatClassifcation - Set Intrastat Classification
 *  Purpose: 	Set Intrastat Classifcation based on Intrastat code text value.
 *  Binds:
 *  			logger -> Logger
 *  			attIntrastatClassification -> Attribute -> Intrastat Classification (att_IntrastatClassification)
 *  			attIntrastatClassificationText -> Attribute -> Intrastat Classification Text (att_IntrastatClassification_Text)
 *  			obj -> Current Object
 *
*/

// Debug
var isDebug = false;
function logDebug(msg) {
  	if (isDebug) {
logger.info(msg);
}
}

var IntrastatClassification = obj.getValue(att_IntrastatClassification_Text.getID()).getValue();
if (IntrastatClassification != '' && IntrastatClassification != null) {
	logDebug('Instrastat code text value found: ' + IntrastatClassification);
	IntrastatClassification = 'I' + IntrastatClassification;
	IntrastatClassification = IntrastatClassification.replace(/\D/g,'');
	IntrastatClassification = IntrastatClassification.substring(0,8);
	logDebug('Instrastat code transformed to: ' + IntrastatClassification);
	try {
		obj.getValue(att_IntrastatClassification.getID()).setLOVValueByID(IntrastatClassification);
	} catch (e) {
	    logDebug('Intrastat code not found.');
	    obj.getValue(att_IntrastatClassification.getID()).setValue('');
	    //throw new RuntimeException(e);
	}
} else {
	obj.getValue(att_IntrastatClassification.getID()).setValue('');
}
}