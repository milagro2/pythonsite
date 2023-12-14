/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_BulkDeleteDataContainer",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Bulk Delete Data Container",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article", "prd_BundleArticle", "prd_GiftBoxArticle", "prd_TradeItem" ],
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
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,general) {
var dct_ProductContactInformation = 'dct_ProductContactInformation';
var tradeItemDCTs = node.getDataContainerByTypeID(dct_ProductContactInformation).getDataContainers().forEach(function(dct) {
	dct.deleteLocal();
	logger.info('delete');
	return true;
});

//var ToBeApproved = node.getDataContainerByTypeID(dct_ProductContactInformation);
//node.approve(ToBeApproved);
general.partiallyApproveObject(node, ["dct_ProductContactInformation"], "datacontainer", log);
}