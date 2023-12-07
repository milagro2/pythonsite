/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_AddTasteProfileCombination",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Add taste profile combination",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article" ],
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
    "contract" : "AttributeBindContract",
    "alias" : "att_Acidity",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_Acidity",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_Color",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_Color",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_Complexity",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_Complexity",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_SugarContent",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_SugarContent",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_Tannin",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_Tannin",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_TasteIntensity",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_TasteIntensity",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_TasteType",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_TasteType",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_COSMOSNumberCounter",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_COSMOSNumberCounter",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "pte_TasteProfile",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "pte_TasteProfile",
    "description" : null
  }, {
    "contract" : "EntityBindContract",
    "alias" : "TasteProfiles",
    "parameterClass" : "com.stibo.core.domain.impl.entity.FrontEntityImpl$$Generated$$12",
    "value" : "TasteProfiles",
    "description" : null
  }, {
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_COSMOSNumber",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_COSMOSNumber",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_AciditySpecification",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_AciditySpecification",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_ColorSpecification",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ColorSpecification",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_ComplexitySpecification",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ComplexitySpecification",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_SugarContentSpecification",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_SugarContentSpecification",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_TanninSpecification",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_TanninSpecification",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_TasteIntensitySpecification",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_TasteIntensitySpecification",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_TasteTypeSpecification",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_TasteTypeSpecification",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_TasteProfileCombinationKey",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_TasteProfileCombinationKey",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,att_Acidity,att_Color,att_Complexity,att_SugarContent,att_Tannin,att_TasteIntensity,att_TasteType,att_COSMOSNumberCounter,pte_TasteProfile,TasteProfiles,manager,att_COSMOSNumber,att_AciditySpecification,att_ColorSpecification,att_ComplexitySpecification,att_SugarContentSpecification,att_TanninSpecification,att_TasteIntensitySpecification,att_TasteTypeSpecification,att_TasteProfileCombinationKey) {
/*Based on the entered taste elements on the article, search for the data container containing the exact combination of values. 
 * Create a reference between the article and the taste profile found. 
 * On the reference set the code of the combination found.
 * 
 * Bindings:
 * acidityAtt--> Acidity (att_Acidity)
 * colorAtt --> Color (att_Color)
 * complexityAtt --> Complexity (att_Complexity)
 * sugarContentAtt -->Sugar Content (att_SugarContent)
 * tanninAtt --> Tannin (att_Tannin)
 * tasteIntensityAtt --> Taste Intensity (att_TasteIntensity)
 * tasteTypeAtt--> Taste Type (att_TasteType)
 * cosmosNumberCounterAtt --> COSMOS Number Counter (att_COSMOSNumberCounter)
 * tasteProfileRef --> Taste Profile (pte_TasteProfile)
 * tasteProfilesEntity --> Taste Profiles (TasteProfiles)
 * cosmosNumberAtt --> COSMOS Number (att_COSMOSNumber)
 */

//Retrieve node values
var articleAcidity = node.getValue(att_AciditySpecification.getID()).getID();
var articleColor = node.getValue(att_ColorSpecification.getID()).getID();
var articleComplexity = node.getValue(att_ComplexitySpecification.getID()).getID();
var articleSugarContent = node.getValue(att_SugarContentSpecification.getID()).getID();
var articleTannin = node.getValue(att_TanninSpecification.getID()).getID();
var articleTasteIntensity = node.getValue(att_TasteIntensitySpecification.getID()).getID();
var articleTasteType = node.getValue(att_TasteTypeSpecification.getID()).getID();
var keyCombination =  articleAcidity + '|' +
					articleColor + '|' +
					articleComplexity + '|' +
					articleSugarContent + '|' +
					articleTannin + '|' +
					articleTasteIntensity + '|' +
					articleTasteType;
//logger.info (keyCombination);
var cosmosCounter = TasteProfiles.getValue(att_COSMOSNumberCounter.getID()).getSimpleValue();
var tasteProfileReferences = node.queryReferences(pte_TasteProfile).forEach(function(tasteProfileReference){
	var tasteProfile = tasteProfileReference.getTarget();
	var keyHome = manager.getHome(com.stibo.core.domain.datacontainerkey.keyhome.DataContainerKeyHome);
	var dataContainerBuilder = keyHome.getDataContainerKeyBuilder("dct_TasteProfileValueSet");
		//Create a new Data Container Taste Profile Value Set
		dataContainerBuilder.withAttributeValue(att_TasteProfileCombinationKey.getID(),keyCombination)
		var key = dataContainerBuilder.build();
		if(cosmosCounter){
			cosmosCounter = parseInt(cosmosCounter)+1;
		}else{
			cosmosCounter = 1;
		}
		var newDC = tasteProfile.getDataContainerByTypeID("dct_TasteProfileValueSet").addDataContainer().createDataContainerObjectWithKey(key);
//		newDC.getValue(combinationKeyAttribute.getID()).setSimpleValue(keyCombination);
		newDC.getValue(att_Acidity.getID()).setLOVValueByID(articleAcidity);
		newDC.getValue(att_Color.getID()).setLOVValueByID(articleColor);
		newDC.getValue(att_Complexity.getID()).setLOVValueByID(articleComplexity);
		newDC.getValue(att_SugarContent.getID()).setLOVValueByID(articleSugarContent);
		newDC.getValue(att_Tannin.getID()).setLOVValueByID(articleTannin);
		newDC.getValue(att_TasteIntensity.getID()).setLOVValueByID(articleTasteIntensity);
		newDC.getValue(att_TasteType.getID()).setLOVValueByID(articleTasteType);
		newDC.getValue(att_COSMOSNumber.getID()).setSimpleValue(cosmosCounter);
//	}
	//Update COSMOS Number Counter value with COSMOS Number Counter
	TasteProfiles.getValue(att_COSMOSNumberCounter.getID()).setSimpleValue(cosmosCounter);
	tasteProfileReference.getValue(att_COSMOSNumber.getID()).setSimpleValue(cosmosCounter);
	return true;
});
}
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
    "alias" : "pte_TasteProfile",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "pte_TasteProfile",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_COSMOSNumber",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_COSMOSNumber",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_ProductType",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ProductType",
    "description" : null
  } ],
  "messages" : [ {
    "variable" : "ErrorMessage",
    "message" : "Please select the correct Taste Profile",
    "translations" : [ ]
  } ],
  "pluginType" : "Precondition"
}
*/
exports.precondition0 = function (node,pte_TasteProfile,att_COSMOSNumber,att_ProductType,ErrorMessage) {
/*Product Type (att_ProductType) = Wijn
 * Bindings:
 * productTypeAtt --> Product Type (att_ProductType)
 */

if("Wijn".equals(node.getValue(att_ProductType.getID()).getSimpleValue())){
var reference = node.queryReferences(pte_TasteProfile).asList(10);
	if (reference.size() > 0) {
		var cosmosNumber = reference.get(0).getValue(att_COSMOSNumber.getID()).getSimpleValue();
		if (cosmosNumber) {
			return false
		} else {
			return true
		}
	} else {
		errorMessage = new ErrorMessage();
		return errorMessage;
	}
}else{
	return false;
}
}