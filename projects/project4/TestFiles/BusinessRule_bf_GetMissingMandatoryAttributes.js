/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "bf_GetMissingMandatoryAttributes",
  "type" : "BusinessFunction",
  "setupGroups" : [ "brg_Functions" ],
  "name" : "Get Missing Mandatory Attributes",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ ],
  "allObjectTypesValid" : true,
  "runPrivileged" : true,
  "onApprove" : "Never",
  "dependencies" : [ ]
}
*/
/*===== business rule plugin definition =====
{
  "pluginId" : "JavaScriptBusinessFunctionWithBinds",
  "binds" : [ {
    "contract" : "AttributeGroupBindContract",
    "alias" : "atg_MandatoryInformation",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeGroupImpl",
    "value" : "atg_MandatoryInformation",
    "description" : null
  }, {
    "contract" : "BusinessFunctionBindContract",
    "alias" : "bf_ValidateSupplierReferences",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>bf_ValidateSupplierReferences</BusinessFunction>\n</BusinessFunctionReference>\n",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation",
  "functionReturnType" : "java.util.List<java.lang.String>",
  "functionParameterBinds" : [ {
    "contract" : "NodeBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : ""
  } ]
}
*/
exports.operation0 = function (atg_MandatoryInformation,bf_ValidateSupplierReferences,node) {
var missingList = new java.util.ArrayList();

var objcetType = node.getObjectType().getID();
var mandatoryElement = objcetType.replace('prd_','atg_Mandatory_');
var attributeGroups = atg_MandatoryInformation.getChildren().toArray();

for (var x in attributeGroups) {
	if (mandatoryElement.equals(attributeGroups[x].getID())) {
		//Retrieve all attributes included in the attribute group
		var attributes = attributeGroups[x].getAttributes().toArray();
		for (var att in attributes) {
			var attribute = attributes[att];
			if (!node.getValue(attribute.getID()).getSimpleValue()) {
				missingList.add(attribute.getName());
			}
		}

		//Retrieve all reference types included in the attribute group
		var referenceType = attributeGroups[x].getLinkTypes().toArray();
		for (var ref in referenceType ) {
			//Check whether it is a reference type or a product to classification link
			if (referenceType[ref] instanceof com.stibo.core.domain.impl.ClassificationProductLinkTypeImpl == true) {
				var references = node.queryClassificationProductLinks(referenceType[ref]).asList(100);
			} else {
				var references = node.queryReferences(referenceType[ref]).asList(100);
			}
			if (references.isEmpty()) {
				missingList.add(referenceType[ref].getName());
			}
		}

		//Retrieve all data container types included in the attribute group
		var dataContainerType = attributeGroups[x].getDataContainerTypes().toArray();
		for (var dc in dataContainerType) {
			if (node.getDataContainer(dataContainerType[dc]) == null) {
				missingList.add(dataContainerType[dc].getName());
			}
		}
		break;
	}
}

var supplierRefResult = bf_ValidateSupplierReferences.evaluate({node: node});
var result;
if(supplierRefResult.size() > 0){
	var errors = new java.util.ArrayList();
	supplierRefResult.toArray().forEach(function(err) {
		result = err;
		missingList.add(result);
	});
}
return missingList;
}