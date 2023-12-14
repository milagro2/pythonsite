/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_WebUIButtonCopyPackUnitInformation",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Web UI Button - Copy Packaging Unit Information",
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
    "contract" : "AttributeValidatedContextParameterStringBinding",
    "alias" : "groupSelectionVar",
    "parameterClass" : "com.stibo.core.domain.businessrule.attributecontextparameter.AttributeValidatedContextParameter",
    "value" : "<AttributeValidatedContextParameter>\n  <Parameters>\n    <Parameter ID=\"Attribute\" Type=\"java.lang.String\">att_TIIVisualCheckGroupPack</Parameter>\n    <Parameter ID=\"ID\" Type=\"java.lang.String\">groupSelection</Parameter>\n  </Parameters>\n</AttributeValidatedContextParameter>",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_TIIVisualCheckGroupPack",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_TIIVisualCheckGroupPack",
    "description" : null
  }, {
    "contract" : "BusinessActionBindContract",
    "alias" : "ba_CopyAttributeValuesForPackUnit",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessActionImpl",
    "value" : "ba_CopyAttributeValuesForPackUnit",
    "description" : null
  }, {
    "contract" : "BusinessActionBindContract",
    "alias" : "ba_CopyReferencesForPackUnit",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessActionImpl",
    "value" : "ba_CopyReferencesForPackUnit",
    "description" : null
  }, {
    "contract" : "BusinessActionBindContract",
    "alias" : "ba_CopyDataContainersForPackUnit",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessActionImpl",
    "value" : "ba_CopyDataContainersForPackUnit",
    "description" : null
  } ],
  "messages" : [ {
    "variable" : "Error",
    "message" : "Please select a group you would like to copy.",
    "translations" : [ {
      "language" : "nl",
      "message" : "Selecteer een groep die je wilt kopiëren"
    } ]
  } ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,groupSelectionVar,att_TIIVisualCheckGroupPack,ba_CopyAttributeValuesForPackUnit,ba_CopyReferencesForPackUnit,ba_CopyDataContainersForPackUnit,Error) {
log.info('THIS IS GROUP SELECTION ' + groupSelectionVar);

if (groupSelectionVar) {
	var groupSelectionSplit = groupSelectionVar.split('<multisep/>');
	for (var x in groupSelectionSplit) {
		node.getValue(att_TIIVisualCheckGroupPack.getID()).addLOVValueByID(groupSelectionSplit[x]);
	}
	ba_CopyAttributeValuesForPackUnit.execute(node);
	ba_CopyReferencesForPackUnit.execute(node);
	ba_CopyDataContainersForPackUnit.execute(node);
	node.getValue(att_TIIVisualCheckGroupPack.getID()).deleteCurrent();
} else {
	var error = new Error();
	throw error;
}
}