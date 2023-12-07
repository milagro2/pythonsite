/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SetMarginOnDC",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Set Margin On DC Price Information",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article", "prd_GiftBoxArticle", "prd_PackagingUnitCase", "prd_PackagingUnitEach", "prd_PackagingUnitPack", "prd_PackagingUnitPallet" ],
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
    "contract" : "LoggerBindContract",
    "alias" : "logger",
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
    "contract" : "AttributeBindContract",
    "alias" : "att_VATGroup",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_VATGroup",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,logger,manager,att_VATGroup) {
//Get all DataContainers under PriceInformation
var dcId = 'dct_PriceInformation';

function getDcs(node_obj) {
    var existing_dcs = [];
    var article_dcs = node_obj.getDataContainerByTypeID(dcId).getDataContainers().iterator();
    while (article_dcs.hasNext()) {
        var article_dc = article_dcs.next();
        existing_dcs.push(article_dc.getDataContainerObject());
    }
    return existing_dcs;
}


//if DataContainer get information
function calculateMargin(object) {
	var priceInformationDataContainers = getDcs(object);
	if (priceInformationDataContainers) {
	    for (var j in priceInformationDataContainers) {
	            var priceInformationDataContainer = priceInformationDataContainers[j];

				var salesPriceValue = priceInformationDataContainer.getValue('att_SalesPrice').getValue();
				var chargePriceValue = priceInformationDataContainer.getValue('att_ChargePrice').getValue();
				var vatGroupValue;
				vatGroupValue = object.getValue(att_VATGroup.getID()).getLOVValue().getID();

				var vatPerc;
				switch (String(vatGroupValue)) {
					case '0':
					vatPerc = 0;
					case '1':
					vatPerc = 9;
					case '2':
					vatPerc = 21;
				}

				//Calculation Margin
				if (salesPriceValue && chargePriceValue && vatPerc) {
					if (salesPriceValue != 0 && chargePriceValue != 0) {
						var calculation = (((salesPriceValue*(100/(100+vatPerc))-chargePriceValue)/salesPriceValue)*100).toFixed(2);
						priceInformationDataContainer.getValue('att_Margin').setSimpleValue(calculation);
					}
				}
	    }
	}
}
var article = node.getParent();
calculateMargin(node);
calculateMargin(article);
}