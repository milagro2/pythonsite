/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "bc_CompletenessOfOriginSource",
  "type" : "BusinessCondition",
  "setupGroups" : [ "brg_Conditions" ],
  "name" : "Completeness Of Origin Source",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article", "prd_BundleArticle", "prd_GiftBoxArticle", "prd_ProductFamily" ],
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
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_PlaceOfOrigin",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_PlaceOfOrigin",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_PlaceOfSourcing",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_PlaceOfSourcing",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_ProductType",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ProductType",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_Article",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_Article",
    "description" : null
  } ],
  "messages" : [ {
    "variable" : "UserMessage",
    "message" : "Please enter information for Place of Origin and Sourcing before submitting.",
    "translations" : [ {
      "language" : "nl",
      "message" : "Voeg informatie over land van oorsprong/herkomst toe"
    } ]
  } ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,ref_PlaceOfOrigin,ref_PlaceOfSourcing,att_ProductType,prd_Article,UserMessage) {
/*For all wine products, the place of origin and place of sourcing are mandatory
 * Bindings:
 * placeOfOriginRef --> Place of Origin (ref_PlaceOfOrigin)
 * placeOfSourcingRef --> Place of Sourcing (ref_PlaceOfSourcing)
 */
//get the References
/*Product Type (att_ProductType) = Wijn
 * Bindings:
 * productTypeAtt --> Product Type (att_ProductType)
 */
if (node.getObjectType().equals(prd_Article)) {
	if ('1'.equals(node.getValue(att_ProductType.getID()).getLOVValue().getID()) ||
	   '4'.equals(node.getValue(att_ProductType.getID()).getLOVValue().getID()) ||
	   '7'.equals(node.getValue(att_ProductType.getID()).getLOVValue().getID()) ||
	   '3'.equals(node.getValue(att_ProductType.getID()).getLOVValue().getID())) {
		var placeOfOriginReferences = node.queryReferences(ref_PlaceOfOrigin).asList(10);
		var placeOfSourcingReferences = node.queryReferences(ref_PlaceOfSourcing).asList(10);

		if (placeOfOriginReferences.isEmpty() || placeOfSourcingReferences.isEmpty() ) {
			errorMessage = new UserMessage();
			return errorMessage;
		} else {
			return true;
		}
	} else {
		return true;
	}
} else {
	return true;
}
}