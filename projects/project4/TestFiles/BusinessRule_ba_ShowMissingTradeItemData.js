/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_ShowMissingTradeItemData",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_SetValuesAndLinkes" ],
  "name" : "Show missing trade item data",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article", "prd_GiftBoxArticle" ],
  "allObjectTypesValid" : false,
  "runPrivileged" : true,
  "onApprove" : "Never",
  "dependencies" : [ {
    "libraryId" : "lib_ValueList",
    "libraryAlias" : "libValueList"
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
    "contract" : "AttributeGroupBindContract",
    "alias" : "atg_CreateArticle_MissingGS1Data",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeGroupImpl",
    "value" : "atg_CreateArticle_MissingGS1Data",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_MissingGS1DataSupplier",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_MissingGS1DataSupplier",
    "description" : null
  }, {
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "AttributeGroupBindContract",
    "alias" : "atg_CreateArticle_MissingGS1Data_PU",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeGroupImpl",
    "value" : "atg_CreateArticle_MissingGS1Data_PU",
    "description" : null
  }, {
    "contract" : "AttributeGroupBindContract",
    "alias" : "atg_CreateArticle_MissingGS1Data_Wine",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeGroupImpl",
    "value" : "atg_CreateArticle_MissingGS1Data_Wine",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_ProductType",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ProductType",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,atg_CreateArticle_MissingGS1Data,att_MissingGS1DataSupplier,manager,atg_CreateArticle_MissingGS1Data_PU,atg_CreateArticle_MissingGS1Data_Wine,att_ProductType,libValueList) {
var missingList = new java.util.ArrayList();

function addMissing(valueName, objectName) {
	missingList.add(valueName + ' missing on ' + objectName);
}

function getErrorsForMultiValue() {
	var result = '';
	missingList.toArray().forEach(function (error) {
		result += result ? '<multisep/>' + error : error;
	});
	return result;
}

//Retrieve all attributes included in the attribute group
function validateAttributes (node, atg) {
	var attributes = atg.getAttributes().toArray();
	for (var att in attributes) {
		var attribute = attributes[att];
		if (!node.getValue(attribute.getID()).getSimpleValue()) {
			addMissing(attribute.getName(), node.getObjectType().getName());
		}
	}
}

//Retrieve all reference types included in the attribute group
function validateReferences(node, atg) {
	var links = atg.getLinkTypes().toArray();

	for (var index in links) {
		var reference = links[index];
		//Check whether it is a reference type or a product to classification link
		if (reference instanceof com.stibo.core.domain.impl.ClassificationProductLinkTypeImpl == true) {
			var references = node.queryClassificationProductLinks(reference).asList(100);
		} else {
			var references = node.queryReferences(reference).asList(100);
		}
		if (references.isEmpty()) {
			addMissing(reference.getName(), node.getObjectType().getName());
		}
	}
}

//Retrieve all data container types included in the attribute group
function validateDcs(node, atg) {
	var dataContainerType = atg.getDataContainerTypes().toArray();
	for (var index in dataContainerType) {
		var dataContainer = node.getDataContainer(dataContainerType[index]);
		if (dataContainer == null || dataContainer.getDataContainers().isEmpty()) {
			addMissing(dataContainerType[index].getName(), node.getObjectType().getName());
		}
	}
}

function validate(node, atg) {
	validateAttributes(node, atg);
	validateReferences(node, atg);
	validateDcs(node, atg);
}

var productType = node.getValue(att_ProductType.getID()).getLOVValue();
var valueList = libValueList.getValueList();

if (productType) {
	switch (String(productType.getID())) {
		case valueList.ProductType.Wijn:
		case valueList.ProductType.Whisky:
			validate(node, atg_CreateArticle_MissingGS1Data_Wine);
		default:
			validate(node, atg_CreateArticle_MissingGS1Data);
			break;
	}
}

//Validate children
node.queryChildren().forEach(function(child) {
	validate(child, atg_CreateArticle_MissingGS1Data_PU);
	return true;
});

//Clear missing attribute and set.
node.getValue(att_MissingGS1DataSupplier.getID()).deleteCurrent();
node.getValue(att_MissingGS1DataSupplier.getID()).setSimpleValue(getErrorsForMultiValue());
}