/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SetExpiryGroup",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_SetValuesAndLinkes" ],
  "name" : "Set Expiry Group",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article", "prd_GiftBoxArticle" ],
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
    "contract" : "LoggerBindContract",
    "alias" : "log",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_ExpiryGroup",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ExpiryGroup",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_ProductType",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ProductType",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_Biologic",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_Biologic",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_AlcoholPercentage",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_AlcoholPercentage",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,manager,log,att_ExpiryGroup,att_ProductType,att_Biologic,att_AlcoholPercentage) {
//Get variables.
var productType = node.getValue(att_ProductType.getID()).getID();
var biologic = node.getValue(att_Biologic.getID()).getID();
var alcoholPerc = node.getValue(att_AlcoholPercentage.getID()).getSimpleValue();


var isBiologic = false;
if(String(biologic) == "1" || String(biologic) == "2") {
	isBiologic = true;
}


switch(String(productType)) {
	
	case "1": //1 = wine 
		if(alcoholPerc > 0.5 && isBiologic) {
			node.getValue(att_ExpiryGroup.getID()).setLOVValueByID("BIO");
		} else if (isBiologic && alcoholPerc < 0.5) {
			node.getValue(att_ExpiryGroup.getID()).setLOVValueByID("BAV");
		} else if (alcoholPerc > 0.5) {
			node.getValue(att_ExpiryGroup.getID()).setLOVValueByID("VIN");
		} else {
			node.getValue(att_ExpiryGroup.getID()).setLOVValueByID("RCD");
		}
		break;

	case "4": // 4 = mousserend
		if(alcoholPerc > 0.5 && isBiologic) {
			node.getValue(att_ExpiryGroup.getID()).setLOVValueByID("BMS");
		} else if (isBiologic && alcoholPerc < 0.5) {
			node.getValue(att_ExpiryGroup.getID()).setLOVValueByID("BAV");
		} else {
			node.getValue(att_ExpiryGroup.getID()).setLOVValueByID("RCD");
		}
		break;

	case "10": //10 = beer
	case "12": //12 = softdrink
		node.getValue(att_ExpiryGroup.getID()).setLOVValueByID("BBD");
		break;
		
	default:
		node.getValue(att_ExpiryGroup.getID()).setLOVValueByID("RCD");
		break;
}
}