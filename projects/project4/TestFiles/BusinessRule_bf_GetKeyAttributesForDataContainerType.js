/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "bf_GetKeyAttributesForDataContainerType",
  "type" : "BusinessFunction",
  "setupGroups" : [ "brg_Functions" ],
  "name" : "Get Key Attributes For Data Container Type",
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
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation",
  "functionReturnType" : "java.util.List<? extends com.stibo.core.domain.Node>",
  "functionParameterBinds" : [ {
    "contract" : "DataContainerTypeBindContract",
    "alias" : "dataContainerType",
    "parameterClass" : "null",
    "value" : null,
    "description" : ""
  } ]
}
*/
exports.operation0 = function (manager,dataContainerType) {
const keyAttributePerDataContainer = [["dct_ProductClassificationInformation","att_ProductClassificationSystem"],
    ["dct_ProductPackagingHierarchyInformation","att_LowerLevelGTIN"],
    ["dct_ProductRelationInformation","att_ProductRelationType|att_TargetGTIN"],
    ["dct_PackagingCompositeMaterialInfo","att_PackagingMaterialType"],
    ["dct_ProductDutyFeeTax","att_DutyFeeTaxType"],
    ["dct_NutritionalValue","att_Nutrient|att_NutrientValueUnit"],
    ["dct_ProductCharacteristicsInformation","att_CharacteristicAttributeID"],
    ["dct_TasteProfileValueSet","att_Acidity|att_TasteType|att_TasteIntensity|att_Color|att_SugarContent|att_Complexity|att_Tannin"],
    ["dct_ProductAssetInformation","att_FileName"],
    ["dct_ProductAdditionalIdentification","att_ProductAdditionalIndentifier|att_ProductAdditionalIdentificationType"],
    ["dct_Awards","att_AwardCode"],
    ["dct_GallAwards","att_VintageDescription|ref_Awards"],
    ["dct_ProductContactCommunicationChannels","att_ContactName|att_ContactType|att_CommunicationChannel"],
    ["dct_ProductContacts","att_ContactName|att_ContactType"],
    ["dct_ProductActivityRegion","att_ProductActivityType"],
    ["dct_TIMSUpdateLog", "att_ComponentID|att_TIMSTradeItemDescriptor"]];

//Based on the data container type provided get the relevant attributes from the array mentioned, and return the list of the attributes (attribute objects, not only the IDs)
var dataContainerID = dataContainerType.getID();
var dcKeysList =new java.util.ArrayList;
for(var x in keyAttributePerDataContainer){
	if(keyAttributePerDataContainer[x][0].equals(dataContainerID)){
		var attributeList = keyAttributePerDataContainer[x][1].split("|");
		log.info(keyAttributePerDataContainer[x][1]);
		for(var y in attributeList){			
			var attribute = manager.getAttributeHome().getAttributeByID(attributeList[y]);
			if(attribute){
				dcKeysList.add(attribute);
			}else{
				var referenceType = manager.getReferenceTypeHome().getReferenceTypeByID(attributeList[y]);
				if(referenceType){
					dcKeysList.add(referenceType);
				}
			}			
		}		
	}	
}
return dcKeysList;
}