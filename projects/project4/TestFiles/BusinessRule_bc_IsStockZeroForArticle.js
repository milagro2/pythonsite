/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "bc_IsStockZeroForArticle",
  "type" : "BusinessCondition",
  "setupGroups" : [ "brg_Conditions" ],
  "name" : "Is Stock Zero for Article",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article", "prd_BundleArticle", "prd_GiftBoxArticle" ],
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
    "contract" : "GatewayBinding",
    "alias" : "giep_GCOS1",
    "parameterClass" : "com.stibo.core.domain.impl.integrationendpoint.gateway.FrontGatewayIntegrationEndpointImpl",
    "value" : "giep_GCOS1",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_ItemNumber",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ItemNumber",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_ArticleDate",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ArticleDate",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_NextLowerLevel",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_NextLowerLevel",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_OperationalPackagingRoles",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_OperationalPackagingRoles",
    "description" : null
  } ],
  "messages" : [ {
    "variable" : "returnMessage1",
    "message" : "The stock of cosmos number(s) {numbers} is not zero, please make sure they are before proceding",
    "translations" : [ {
      "language" : "nl",
      "message" : "De voorraad van cosmos nummer(s) {numbers} is niet 0, pas dit aan om door te gaan"
    } ]
  }, {
    "variable" : "returnMessage2",
    "message" : "Failed to retrieve stock levels from Cosmos",
    "translations" : [ {
      "language" : "nl",
      "message" : "Kan de voorraadniveaus niet ophalen uit Cosmos"
    } ]
  }, {
    "variable" : "returnMessage3",
    "message" : "Empty date or article no. Failed to retrieve stock levels from Cosmos",
    "translations" : [ {
      "language" : "nl",
      "message" : "Lege datum/artikel nr. , de voorraadniveaus kunnen niet worden opgehaald uit Cosmos"
    } ]
  }, {
    "variable" : "returnMessage4",
    "message" : "Objects has no packaging units. Can't retrieve stock levels",
    "translations" : [ {
      "language" : "nl",
      "message" : "Objecten hebben geen verpakkingseenheden, de voorraadniveaus kunnen niet worden opgehaald"
    } ]
  } ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,giep_GCOS1,att_ItemNumber,att_ArticleDate,ref_NextLowerLevel,att_OperationalPackagingRoles,returnMessage1,returnMessage2,returnMessage3,returnMessage4) {
/*
 * This condition will check for each packaging unit of the article which has a COSMOS item number,
 * whether the stock is zero by calling the gateway integration endpoint
 *
 * Return true if stock is zero for all
 * Return message if stock of one is not zero
 *
 *
 --Having Stock--
({ itemnumber: "511005", itemdate: "1990-04-17"});
package_itemnumber = "511005";
package_itemdate  = "1990-04-17";
 */
var key = lib_Keys.getKey('GCOS1');
var non_zero_packages = [];
var doLog = true;
var request = giep_GCOS1.get();
request.header('api-key', key);
//request.header('client-id', '0724960117014473a48fd76fdde39acc');
//request.header('client-secret', 'EDc80834BDfb4114aB2F5f607dc487A6');


var childItems = node.getChildren().toArray();
if (doLog) {
 log.info('Number of children found = ' + childItems.length);
}

if (childItems.length == 0) {
	// No PU found, return false?
	var message4 = new returnMessage4();
	return message4;
}

for (var i = 0; i < childItems.length; i++) {
	var packaging_unit = childItems[i];
	var package_itemnumber = packaging_unit.getValue(att_ItemNumber.getID()).getSimpleValue() || '';
	var package_itemdate = packaging_unit.getValue(att_ArticleDate.getID()).getSimpleValue() || '';
	var operationalPackingRoles = packaging_unit.getValue(att_OperationalPackagingRoles.getID()).getValues().toArray();
	log.info(operationalPackingRoles[0]);
	var foundOpRole = false;
	for (var x in operationalPackingRoles) {
		if (operationalPackingRoles[x].getID().equals('isTradeItemADespatchUnit') || operationalPackingRoles[x].getID().equals('isTradeItemAConsumerUnit')) {
			foundOpRole = true;
		}
	}

	log.info('found opRole = ' + foundOpRole);

    //---Testing purposes---
    //var package_itemnumber = "23123123123";
    //var package_itemdate = "";
    //var package_itemdate = "";

    if (doLog) {
 log.info('Package itemnumber = ' + package_itemnumber);
}

    if (doLog) {
 log.info('Package itemdate = ' + package_itemdate);
}


    if (foundOpRole) {
	    log.info('found oprole');
	    if (package_itemdate == '') {
			var message3 = new returnMessage3();
			return message3;
	    }

	    request.pathQuery({itemnumber: package_itemnumber, itemdate: package_itemdate});
	    try {
	        var response = request.invoke();
	        if (doLog) {
 log.info(response);
}
	        if (response.contains('"hasStock": true')) {//Has stock
	            non_zero_packages.push('(' + package_itemnumber + ' / ' + package_itemdate + ')');
	        }
	    } catch (err) {//If invalid  package_itemnumber & package_itemdate is passed, API throws 500 error. Not handling the error
			// Check is response message differs if we request an incorrect package_itemnuimber or package_itemdate. Handle these errors accordingly. eg; response.contains something.
			log.info('First error');
		    var message2 = new returnMessage2();
		    return message2;
	    }
    }
}

if (non_zero_packages.length > 0) {
    var message1 = new returnMessage1();
    message1.numbers = '"' + non_zero_packages.join(',') + '"';
    return message1;
} else if (non_zero_packages.length == 0) {
	return true;
}

log.info('Second error');
var message2 = new returnMessage2();
return message2;
}