/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SetTasteProfileBOTasteElIfAvailable",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_SetValuesAndLinkes" ],
  "name" : "Set taste profile based on taste elements if available",
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
    "contract" : "QueryHomeBindContract",
    "alias" : "queryHome",
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
exports.operation0 = function (node,att_Acidity,att_Color,att_Complexity,att_SugarContent,att_Tannin,att_TasteIntensity,att_TasteType,pte_TasteProfile,TasteProfiles,manager,att_COSMOSNumber,queryHome,att_AciditySpecification,att_ColorSpecification,att_ComplexitySpecification,att_SugarContentSpecification,att_TanninSpecification,att_TasteIntensitySpecification,att_TasteTypeSpecification,att_TasteProfileCombinationKey) {
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


if (node.getValue(att_AciditySpecification.getID()).getSimpleValue() &&
	node.getValue(att_ColorSpecification.getID()).getSimpleValue() &&
	node.getValue(att_ComplexitySpecification.getID()).getSimpleValue() &&
	node.getValue(att_SugarContentSpecification.getID()).getSimpleValue() &&
	node.getValue(att_TanninSpecification.getID()).getSimpleValue() &&
	node.getValue(att_TasteIntensitySpecification.getID()).getSimpleValue() &&
	node.getValue(att_TasteTypeSpecification.getID()).getSimpleValue()) {
	var articleAcidity = node.getValue(att_AciditySpecification.getID()).getID();
	var articleColor = node.getValue(att_ColorSpecification.getID()).getID();
	var articleComplexity = node.getValue(att_ComplexitySpecification.getID()).getID();
	var articleSugarContent = node.getValue(att_SugarContentSpecification.getID()).getID();
	var articleTannin = node.getValue(att_TanninSpecification.getID()).getID();
	var articleTasteIntensity = node.getValue(att_TasteIntensitySpecification.getID()).getID();
	var articleTasteType = node.getValue(att_TasteTypeSpecification.getID()).getID();

	var keyCombination = articleAcidity + '|' +
						articleColor + '|' +
						articleComplexity + '|' +
						articleSugarContent + '|' +
						articleTannin + '|' +
						articleTasteIntensity + '|' +
						articleTasteType;

	var dataContainerHome = manager.getHome(com.stibo.core.domain.datacontainertype.DataContainerTypeHome);
	var dataContainerConditionBuilder = com.stibo.query.condition.Conditions.hasDataContainer(dataContainerHome.getDataContainerTypeByID('dct_TasteProfileValueSet'));
	var condition = com.stibo.query.condition.Conditions;
	var querySpecification = queryHome.queryFor(com.stibo.core.domain.entity.Entity).where(
		dataContainerConditionBuilder.where(com.stibo.query.condition.Conditions.valueOf(att_TasteProfileCombinationKey).eq(keyCombination)));
	var result = querySpecification.execute().asList(100);
	if (result.size() > 0) {
		var tasteProfile = result.get(0);
		var dataContainerType = tasteProfile.getDataContainerByTypeID('dct_TasteProfileValueSet');
		var dataContainerArray = dataContainerType.getDataContainers().toArray();
		var cosmosNumber;
		for (var dc in dataContainerArray) {
			var dataContainer = dataContainerArray[dc].getDataContainerObject();
			if (dataContainer.getValue(att_TasteProfileCombinationKey.getID()).getSimpleValue() == keyCombination) {
				cosmosNumber = dataContainer.getValue(att_COSMOSNumber.getID()).getSimpleValue();
				log.info('Cosmos Number: ' + cosmosNumber);
			}
		}
		var existingRef;
		log.info('Retrieved Target '+tasteProfile.getID());
		node.queryReferences(pte_TasteProfile).forEach(function (reference) {
			log.info('Existing Target '+reference.getTarget().getID());
			if (reference.getTarget().getID().equals(tasteProfile.getID())) {
				existingRef = reference;
				return false;
			} else {
				reference.delete();
			}
			return true;
		});
		if (existingRef) {
			if (cosmosNumber) {
				existingRef.getValue(att_COSMOSNumber.getID()).setSimpleValue(cosmosNumber);
				log.info('Taste Profile Target:'+existingRef.getTarget().getID());
			}
		} else {
			existingRef = node.createReference(result.get(0), pte_TasteProfile);
			if (cosmosNumber) {
				existingRef.getValue(att_COSMOSNumber.getID()).setSimpleValue(cosmosNumber);
				log.info('Taste Profile Target: '+existingRef.getTarget().getID());
			}
		}
	} else {
		log.info('No Cosmos Number found');
		log.info(node.queryReferences(pte_TasteProfile));
		node.queryReferences(pte_TasteProfile).forEach(function (reference) {
			if (reference.getValue(att_COSMOSNumber.getID()).getSimpleValue()) {
			reference.delete();
			return false;
			}
			return true;
			});
		}
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
/*Product Type (att_ProductType) = Wijn
 * Bindings:
 * productTypeAtt --> Product Type (att_ProductType)
 */

if ('Wijn'.equals(node.getValue(att_ProductType.getID()).getSimpleValue())) {
	return true;
} else {
	return false;
}
}