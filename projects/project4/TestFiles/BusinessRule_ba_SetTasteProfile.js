/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SetTasteProfile",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_SetValuesAndLinkes" ],
  "name" : "Set taste profile based on taste elements",
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
    "contract" : "ReferenceTypeBindContract",
    "alias" : "pte_TasteProfile",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "pte_TasteProfile",
    "description" : null
  }, {
    "contract" : "BusinessActionBindContract",
    "alias" : "ba_SetTasteProfileBOTasteElIfAvailable",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessActionImpl",
    "value" : "ba_SetTasteProfileBOTasteElIfAvailable",
    "description" : null
  } ],
  "messages" : [ {
    "variable" : "ErrorMessage",
    "message" : "This combination of taste elements is not known, please select a taste profile manually.",
    "translations" : [ ]
  }, {
    "variable" : "ErrorMessageAtt",
    "message" : "Some of the taste elements are not filled, please check.",
    "translations" : [ ]
  } ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,att_AciditySpecification,att_ColorSpecification,att_ComplexitySpecification,att_SugarContentSpecification,att_TanninSpecification,att_TasteIntensitySpecification,att_TasteTypeSpecification,pte_TasteProfile,ba_SetTasteProfileBOTasteElIfAvailable,ErrorMessage,ErrorMessageAtt) {
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
 * tasteProfileRef --> Taste Profile (pte_TasteProfile)
 * tasteProfilesEntity --> Taste Profiles (TasteProfiles)
 * cosmosNumberAtt --> COSMOS Number (att_COSMOSNumber)
 */

//Retrieve node values

if  (!node.getValue(att_AciditySpecification.getID()).getSimpleValue() ||
	!node.getValue(att_ColorSpecification.getID()).getSimpleValue() ||
	!node.getValue(att_ComplexitySpecification.getID()).getSimpleValue() ||
	!node.getValue(att_SugarContentSpecification.getID()).getSimpleValue() ||
	!node.getValue(att_TanninSpecification.getID()).getSimpleValue() ||
	!node.getValue(att_TasteIntensitySpecification.getID()).getSimpleValue() ||
	!node.getValue(att_TasteTypeSpecification.getID()).getSimpleValue()) {
	errorMessageAtt = new ErrorMessageAtt();
	throw errorMessageAtt;
}
ba_SetTasteProfileBOTasteElIfAvailable.execute (node);
if (node.getReferences(pte_TasteProfile).size() == 0) {
	var errorMessage = new ErrorMessage();
	throw errorMessage;
}
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
    "contract" : "AttributeBindContract",
    "alias" : "att_ProductType",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ProductType",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Precondition"
}
*/
exports.precondition0 = function (node,att_ProductType) {
var prodCategory = node.getValue(att_ProductType.getID()).getLOVValue();
if (prodCategory){
	if(prodCategory.getID().equals("1")){
		return true
	}else{
		return false
	}
}else{
	return false
}
}