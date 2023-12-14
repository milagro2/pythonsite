/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_CombinePriceInfoDCOnArticle",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Combine price information data containers on Article",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_PackagingUnitCase", "prd_PackagingUnitEach", "prd_PackagingUnitPack", "prd_PackagingUnitPallet" ],
  "allObjectTypesValid" : false,
  "runPrivileged" : true,
  "onApprove" : "Never",
  "dependencies" : [ {
    "libraryId" : "lib_GeneralLibrary",
    "libraryAlias" : "general"
  } ]
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
    "contract" : "BusinessFunctionBindContract",
    "alias" : "bf_GetArticleFromPackagingUnit",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>bf_GetArticleFromPackagingUnit</BusinessFunction>\n</BusinessFunctionReference>\n",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_PricingPackUnit",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_PricingPackUnit",
    "description" : null
  }, {
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,bf_GetArticleFromPackagingUnit,att_PricingPackUnit,manager,general) {
/*
 * This functionality combines the price information from the various packaging units to the article
 *
 * Gets all the price data containers Price Information (dct_PriceInformation) from the packaging unit and adds them to the article if they don't exist on the article (based on the key of the data container)
 * Copy all the values of the data container to the data container on the article
 * Set the value of Packaging Unit (att_PricingPackUnit) to the item number and packaging name (each, box etc)
 *
 */

var dcId = 'dct_PriceInformation';
var att_PricingPackUnit = 'att_PricingPackUnit';
var att_PricingValidityStartDate = 'att_PricingValidityStartDate';

function getDcs(node_obj) {
    var existing_dcs = [];
    var article_dcs = node_obj.getDataContainerByTypeID(dcId).getDataContainers().iterator();
    while (article_dcs.hasNext()) {
        var article_dc = article_dcs.next();
        existing_dcs.push(article_dc.getDataContainerObject());
    }
    return existing_dcs;
}


var params = {};
params.node = node;
var dc_keyhome = manager.getHome(com.stibo.core.domain.datacontainerkey.keyhome.DataContainerKeyHome);
// removed below function because it was giving an error when lowernext level was not filled. 
// added getParent();
//var article = getArticleFromPackagingUnit.evaluate(params);
var article = node.getParent();
if (article) {
    var article_dcs = getDcs(article);
    var package_dcs = getDcs(node);
    for (var i in package_dcs) {
        var matching_key_exist = false;
        var package_dc = package_dcs[i];
        for (var j in article_dcs) {
            var article_dc = article_dcs[j];
            if (dc_keyhome.matchingKeys(package_dc, article_dc)) {
                matching_key_exist = true;
                break;
            }
        }
        if (matching_key_exist)//Data container exists. Do not create.
            {
continue;
}
        //Matching key does not exist. Add DC to article.
        //Create new keys
        var dc_keybuilder = dc_keyhome.getDataContainerKeyBuilder(dcId);
        var pack_unit = package_dcs[i].getValue(att_PricingPackUnit).getSimpleValue() || '';
        var start_date = package_dcs[i].getValue(att_PricingValidityStartDate).getSimpleValue() || '';
        dc_keybuilder.withAttributeValue(att_PricingPackUnit, pack_unit);
        dc_keybuilder.withAttributeValue(att_PricingValidityStartDate, start_date);
        var dc_key = dc_keybuilder.build();
        //Add data containers to article
        var datacontainer_single = article.getDataContainerByTypeID(dcId).addDataContainer();
        var datacontainer_new = datacontainer_single.createDataContainerObjectWithKey(dc_key);
        //Copy values from DC
        var dc_attr_values = package_dc.getValues().iterator();
        while (dc_attr_values.hasNext()) {
            var dc_attr_value = dc_attr_values.next();
            var simplevalue = dc_attr_value.getSimpleValue() || '';
            if (simplevalue != '') {
datacontainer_new.getValue(dc_attr_value.getAttribute().getID()).setSimpleValue(simplevalue);
}
        }
    }
}

//Partial approval of price datacontainer, used in inbound cosmos.
general.partiallyApproveObject(article, ["dct_PriceInformation"], "datacontainer", log);
}