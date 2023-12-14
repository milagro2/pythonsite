/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_AddPackagingMaterial",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Add Packaging Material",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_PackagingUnitCase", "prd_PackagingUnitEach", "prd_PackagingUnitPack", "prd_PackagingUnitPallet" ],
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
    "contract" : "EntityBindContract",
    "alias" : "PackagingMaterialInformation",
    "parameterClass" : "com.stibo.core.domain.impl.entity.FrontEntityImpl$$Generated$$12",
    "value" : "PackagingMaterialInformation",
    "description" : null
  }, {
    "contract" : "AttributeValidatedContextParameterStringBinding",
    "alias" : "packagingMaterialType",
    "parameterClass" : "com.stibo.core.domain.businessrule.attributecontextparameter.AttributeValidatedContextParameter",
    "value" : "<AttributeValidatedContextParameter>\n  <Parameters>\n    <Parameter ID=\"Attribute\" Type=\"java.lang.String\">att_PackagingMaterialType</Parameter>\n    <Parameter ID=\"ID\" Type=\"java.lang.String\">packagingMaterialType</Parameter>\n  </Parameters>\n</AttributeValidatedContextParameter>",
    "description" : null
  }, {
    "contract" : "AttributeValidatedContextParameterStringBinding",
    "alias" : "packagingMaterialQuantity",
    "parameterClass" : "com.stibo.core.domain.businessrule.attributecontextparameter.AttributeValidatedContextParameter",
    "value" : "<AttributeValidatedContextParameter>\n  <Parameters>\n    <Parameter ID=\"Attribute\" Type=\"java.lang.String\"></Parameter>\n    <Parameter ID=\"ID\" Type=\"java.lang.String\">packagingMaterialQuantity</Parameter>\n  </Parameters>\n</AttributeValidatedContextParameter>",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_PackagingMaterialInformation",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_PackagingMaterialInformation",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "ent_PackagingMaterial",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "ent_PackagingMaterial",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_GlobalTradeIdentificationNumber",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_GlobalTradeIdentificationNumber",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_PackagingMaterialType",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_PackagingMaterialType",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_QuantityContained",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_QuantityContained",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_GlobalLocationNumber",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_GlobalLocationNumber",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ptp_PartnerArticle",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ptp_PartnerArticle",
    "description" : null
  }, {
    "contract" : "ListOfValuesBindContract",
    "alias" : "lov_PackagingMaterialTypeCode",
    "parameterClass" : "com.stibo.core.domain.impl.ListOfValuesImpl",
    "value" : "lov_PackagingMaterialTypeCode",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,PackagingMaterialInformation,packagingMaterialType,packagingMaterialQuantity,ref_PackagingMaterialInformation,ent_PackagingMaterial,att_GlobalTradeIdentificationNumber,att_PackagingMaterialType,att_QuantityContained,att_GlobalLocationNumber,ptp_PartnerArticle,lov_PackagingMaterialTypeCode) {
var gtin = node.getValue(att_GlobalTradeIdentificationNumber.getID()).getSimpleValue();
var globalLocationNumberValue;
var article = node.getParent();
var partnerArticleReference = article.queryReferences(ptp_PartnerArticle).asList(1);

if (partnerArticleReference.size()>0) {
	globalLocationNumberValue = partnerArticleReference.get(0).getTarget().getValue(att_GlobalLocationNumber.getID()).getSimpleValue();
}
var packagingMaterialTypeValue = lov_PackagingMaterialTypeCode.getListOfValuesValueByID(packagingMaterialType).getValue();

logger.info(gtin);
logger.info(globalLocationNumberValue);
logger.info(packagingMaterialTypeValue);
logger.info(packagingMaterialType);

var packagingString = 'pm_'+globalLocationNumberValue+'_'+gtin+'_'+packagingMaterialTypeValue;
var packagingID = String(packagingString).substring(0,40);


var packagingMaterial = PackagingMaterialInformation.createEntity(packagingID,ent_PackagingMaterial.getID());
packagingMaterial.setName(gtin + '--' + packagingMaterialTypeValue);
packagingMaterial.getValue(att_PackagingMaterialType.getID()).setLOVValueByID(packagingMaterialType);
packagingMaterial.getValue(att_QuantityContained.getID()).setSimpleValue(packagingMaterialQuantity);
node.createReference(packagingMaterial,ref_PackagingMaterialInformation.getID());
}