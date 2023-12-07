/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_AddNutrientHeader",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Add Nutrient Header",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article", "prd_GiftBoxArticle", "prd_ProductFamily" ],
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
    "alias" : "NutritionalInformation",
    "parameterClass" : "com.stibo.core.domain.impl.entity.FrontEntityImpl$$Generated$$12",
    "value" : "NutritionalInformation",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_NutritionalInformation",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_NutritionalInformation",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "ent_NutritionalValuesHeader",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "ent_NutritionalValuesHeader",
    "description" : null
  }, {
    "contract" : "SimpleValueBindContract",
    "alias" : "att_GlobalTradeIdentificationNumber",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_GlobalTradeIdentificationNumber",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_PortionSizeDescription",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_PortionSizeDescription",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_Nutrient",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_Nutrient",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_QuantityContained",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_QuantityContained",
    "description" : null
  }, {
    "contract" : "AttributeValidatedContextParameterStringBinding",
    "alias" : "portionDescription",
    "parameterClass" : "com.stibo.core.domain.businessrule.attributecontextparameter.AttributeValidatedContextParameter",
    "value" : "<AttributeValidatedContextParameter>\n  <Parameters>\n    <Parameter ID=\"Attribute\" Type=\"java.lang.String\">att_PortionSizeDescription</Parameter>\n    <Parameter ID=\"ID\" Type=\"java.lang.String\">Portion Description</Parameter>\n  </Parameters>\n</AttributeValidatedContextParameter>",
    "description" : null
  }, {
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_NutrientValueUnit",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_NutrientValueUnit",
    "description" : null
  }, {
    "contract" : "ListOfValuesBindContract",
    "alias" : "lov_Nutrients",
    "parameterClass" : "com.stibo.core.domain.impl.ListOfValuesImpl",
    "value" : "lov_Nutrients",
    "description" : null
  }, {
    "contract" : "ListOfValuesBindContract",
    "alias" : "lov_Unit",
    "parameterClass" : "com.stibo.core.domain.impl.ListOfValuesImpl",
    "value" : "lov_Unit",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,NutritionalInformation,ref_NutritionalInformation,ent_NutritionalValuesHeader,att_GlobalTradeIdentificationNumber,att_PortionSizeDescription,att_Nutrient,att_QuantityContained,portionDescription,manager,att_NutrientValueUnit,lov_Nutrients,lov_Unit) {
var nutrientHeader = NutritionalInformation.createEntity('', ent_NutritionalValuesHeader);
nutrientHeader.setName(att_GlobalTradeIdentificationNumber + '-' + portionDescription);
nutrientHeader.getValue(att_PortionSizeDescription.getID()).setSimpleValue(portionDescription);
node.createReference(nutrientHeader, ref_NutritionalInformation);

var dataContainer = nutrientHeader.getDataContainerByTypeID('dct_NutritionalValue');
var detailValueTypes = ['ENER-','ENER-','FAT','FASAT','PRO-','CHOAVL','SUGAR-','SALTEQ'];
var detailValueQuantities = ['0 kJ','0 kcal','0 g','0 g','0 g','0 g','0 g','0 g'];
var detailValueUnits = ['KJO','E14','GRM','GRM','GRM','GRM','GRM','GRM'];
for (var x in detailValueTypes) {
	var keyHome = manager.getHome(com.stibo.core.domain.datacontainerkey.keyhome.DataContainerKeyHome);
	var dataContainerBuilder = keyHome.getDataContainerKeyBuilder('dct_NutritionalValue');
	/* get the correct value from the LOV first before storing the information */
	var valueType = lov_Nutrients.getListOfValuesValueByID(detailValueTypes[x]).getValue();
	dataContainerBuilder.withAttributeValue(att_Nutrient.getID(),valueType);
	var valueUnit = lov_Unit.getListOfValuesValueByID(detailValueUnits[x]).getValue();
	dataContainerBuilder.withAttributeValue(att_NutrientValueUnit.getID(),valueUnit);
	var key = dataContainerBuilder.build();
	var singleDataContainer = nutrientHeader.getDataContainerByTypeID('dct_NutritionalValue').addDataContainer().createDataContainerObjectWithKey(key);
	singleDataContainer.getValue(att_QuantityContained.getID()).setSimpleValue(detailValueQuantities[x]);
}
}