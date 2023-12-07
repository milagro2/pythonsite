/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SetIsAllergenInformationAvailable",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Set Is Allergen Information Available attribute",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_TradeItem" ],
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
    "contract" : "SimpleValueBindContract",
    "alias" : "att_ContainsAllergen",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ContainsAllergen",
    "description" : null
  }, {
    "contract" : "SimpleValueBindContract",
    "alias" : "att_DerivedFromAllergen",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_DerivedFromAllergen",
    "description" : null
  }, {
    "contract" : "SimpleValueBindContract",
    "alias" : "att_FreeFromAllergen",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_FreeFromAllergen",
    "description" : null
  }, {
    "contract" : "SimpleValueBindContract",
    "alias" : "att_MayContainAllergen",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_MayContainAllergen",
    "description" : null
  }, {
    "contract" : "SimpleValueBindContract",
    "alias" : "att_NotDerivedFromAllergen",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_NotDerivedFromAllergen",
    "description" : null
  }, {
    "contract" : "SimpleValueBindContract",
    "alias" : "att_NotIntentionallyIncludedAllergen",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_NotIntentionallyIncludedAllergen",
    "description" : null
  }, {
    "contract" : "SimpleValueBindContract",
    "alias" : "att_UndeclaredAllergen",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_UndeclaredAllergen",
    "description" : null
  }, {
    "contract" : "SimpleValueBindContract",
    "alias" : "att_AllergenStatement",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_AllergenStatement",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_IsAllergenInformationAvailable",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_IsAllergenInformationAvailable",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,att_ContainsAllergen,att_DerivedFromAllergen,att_FreeFromAllergen,att_MayContainAllergen,att_NotDerivedFromAllergen,att_NotIntentionallyIncludedAllergen,att_UndeclaredAllergen,att_AllergenStatement,att_IsAllergenInformationAvailable) {
/*If information are populated on any of the below attributes, set Is Allergen Information Available attribute to Yes. Otherwise set it to No.
 *
 * Bindings:
 * containsAllergenAttVal --> Allergen: Contains (att_ContainsAllergen)
 * derivedFromAllergenAttVal --> Allergen: Derived from (att_DerivedFromAllergen)
 * freeFromAllergenAttVal --> Allergen: Free from (att_FreeFromAllergen)
 * mayContainAllergenAttVal --> Allergen: May Contain (att_MayContainAllergen)
 * notDerivedFromAllergenAttVal --> Allergen: Not Derived From (att_NotDerivedFromAllergen)
 * notIntentionallyIncludedAllergenAttVal --> Allergen: Not Intentionally Included (att_NotIntentionallyIncludedAllergen)
 * undeclaredAllergenAttVal --> Allergen: Undeclared (att_UndeclaredAllergen)
 * allergenStatementAttVal --> Allergen Statement (att_AllergenStatement)
 * isAllergenInformationAvailableAtt --> Is Allergen Information Available (att_IsAllergenInformationAvailable)
 */

if (att_ContainsAllergen != null ||att_DerivedFromAllergen != null ||att_FreeFromAllergen != null ||
	att_MayContainAllergen != null || att_NotDerivedFromAllergen != null ||att_NotIntentionallyIncludedAllergen != null ||
		att_UndeclaredAllergen != null || att_AllergenStatement != null) {
	//	set LoV ID value for attribute Is Allergen Information Available (att_IsAllergenInformationAvailable) to -1.
	node.getValue(att_IsAllergenInformationAvailable.getID()).setLOVValueByID('-1');
} else {
	node.getValue(att_IsAllergenInformationAvailable.getID()).setLOVValueByID('0');
}
}