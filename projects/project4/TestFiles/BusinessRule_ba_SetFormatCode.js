/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SetFormatCode",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_SetValuesAndLinkes" ],
  "name" : "Set Format Code",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article", "prd_GiftBoxArticle" ],
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
    "alias" : "article",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_NetContents",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_NetContents",
    "description" : null
  }, {
    "contract" : "UnitBindContract",
    "alias" : "unece_unit_LTR",
    "parameterClass" : "com.stibo.core.domain.impl.UnitImpl",
    "value" : "unece.unit.LTR",
    "description" : null
  }, {
    "contract" : "UnitBindContract",
    "alias" : "unece_unit_CLT",
    "parameterClass" : "com.stibo.core.domain.impl.UnitImpl",
    "value" : "unece.unit.CLT",
    "description" : null
  }, {
    "contract" : "UnitBindContract",
    "alias" : "unece_unit_MLT",
    "parameterClass" : "com.stibo.core.domain.impl.UnitImpl",
    "value" : "unece.unit.MLT",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_FormatCode",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_FormatCode",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (article,att_NetContents,unece_unit_LTR,unece_unit_CLT,unece_unit_MLT,att_FormatCode) {
// This BR runs on exit of commercial enrichment of both WF and fills att_FormatCode for two rules:
// Formaatcode 1 = Inhoud equal to 50CL or smaller
// Formaatcode 0 = Inhoud larger than 50CL and other

function getCentiliters(volume, unit) {
	if (unit == String(unece_unit_MLT)) {
		return volume / 10;
	}
	if (unit == String(unece_unit_CLT)) {
		return volume;
	}
	if (unit == String(unece_unit_LTR)) {
		return volume * 100;
	}	
	return;
}

// Get PU each
var articleChildren = article.getChildren().toArray();
var PUEach;
for (var i in articleChildren) {
	if (articleChildren[i].getObjectType().getID() == 'prd_PackagingUnitEach'){
		PUEach = articleChildren[i];
		break;
	}
}

// Error message if no each is found
if (!PUEach) {
	logger.warning('No PUEach is found!')
}

// Return if no contents or unit
var unit = PUEach.getValue(att_NetContents.getID()).getUnit();
var contents = PUEach.getValue(att_NetContents.getID()).getValue();

if (!contents || !unit) {
	return logger.warning('Missing contents or unit!');
}

// If unit is not l, cl or ml: formatcode = 0 and return
if (unit != String(unece_unit_MLT) && unit != String(unece_unit_CLT) && unit != String(unece_unit_LTR)){
	logger.info('unit is not CL, Ml of L: Setting 0 to format code');
	article.getValue(att_FormatCode.getID()).setSimpleValue('0');
	return; 
}

// Recalculate liters and ml to cl
var contentsCL = getCentiliters(contents, unit);

// If netcontentsCl is smaller than or equal to 50CL format code = 1
// Else format code is 0.  
if (contentsCL <= 50) {
	article.getValue(att_FormatCode.getID()).setSimpleValue('1');
	logger.info('Netcontents is 50cl or smaller: Set Format Code to 1');
}	else {
		article.getValue(att_FormatCode.getID()).setSimpleValue('0');
		logger.info('Netcontents is larger than 50cl: Set Format code to 0');
	}
}