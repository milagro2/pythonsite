/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "bc_IsThereExactlyOnePrimaryAsset",
  "type" : "BusinessCondition",
  "setupGroups" : [ "brg_AssetRelatedConditions" ],
  "name" : "Is There Exactly One Primary Asset",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article", "prd_BundleArticle", "prd_GiftBoxArticle", "prd_PackagingUnitCase", "prd_PackagingUnitPack", "prd_PackagingUnitPallet" ],
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
    "alias" : "ref_PrimaryProductImage",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_PrimaryProductImage",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_Stroom",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_Stroom",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_ProductType",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ProductType",
    "description" : null
  } ],
  "messages" : [ {
    "variable" : "InvalidMessageImage",
    "message" : "The Article {no} has no primary product Image.",
    "translations" : [ {
      "language" : "nl",
      "message" : "Er moet minimaal een Packshot aanwezig zijn om verder te gaan."
    } ]
  } ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,ref_PrimaryProductImage,att_Stroom,att_ProductType,InvalidMessageImage) {
var isStroom = node.getValue(att_Stroom.getID()).getSimpleValue();
var productType = node.getValue(att_ProductType.getID()).getLOVValue().getID();
if (!(isStroom == 'RZ' || productType == '14' || productType == '13')) {
var image = node.queryReferences(ref_PrimaryProductImage).asList(10);
	if (image.size()==0) {
		var errorImage = new InvalidMessageImage();
		errorImage.no= node.getID() + ' - ' + node.getName();
		return errorImage;
	}
}

return true;
}