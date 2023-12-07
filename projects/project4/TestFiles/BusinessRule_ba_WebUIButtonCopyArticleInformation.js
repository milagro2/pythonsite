/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_WebUIButtonCopyArticleInformation",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Web UI Button - Copy Article Information",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article", "prd_GiftBoxArticle" ],
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
    "alias" : "groupSelection",
    "parameterClass" : "com.stibo.core.domain.businessrule.attributecontextparameter.AttributeValidatedContextParameter",
    "value" : "<AttributeValidatedContextParameter>\n  <Parameters>\n    <Parameter ID=\"Attribute\" Type=\"java.lang.String\">att_TIIVisualCheckGroupArticle</Parameter>\n    <Parameter ID=\"ID\" Type=\"java.lang.String\">groupSelection</Parameter>\n  </Parameters>\n</AttributeValidatedContextParameter>",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_TIIVisualCheckGroupArticle",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_TIIVisualCheckGroupArticle",
    "description" : null
  }, {
    "contract" : "BusinessActionBindContract",
    "alias" : "ba_CopyAttributeValuesForArticle",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessActionImpl",
    "value" : "ba_CopyAttributeValuesForArticle",
    "description" : null
  }, {
    "contract" : "BusinessActionBindContract",
    "alias" : "ba_CopyReferencesForArticle",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessActionImpl",
    "value" : "ba_CopyReferencesForArticle",
    "description" : null
  }, {
    "contract" : "BusinessActionBindContract",
    "alias" : "ba_CopyDataContainersForArticle",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessActionImpl",
    "value" : "ba_CopyDataContainersForArticle",
    "description" : null
  } ],
  "messages" : [ {
    "variable" : "Error",
    "message" : "Please select a group you would like to copy.",
    "translations" : [ {
      "language" : "nl",
      "message" : "Selecteer een groep die je wilt gaan kopiëren"
    } ]
  } ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,groupSelection,att_TIIVisualCheckGroupArticle,ba_CopyAttributeValuesForArticle,ba_CopyReferencesForArticle,ba_CopyDataContainersForArticle,Error) {
if (groupSelection){
	var groupSelectionSplit = groupSelection.split("<multisep/>");
	for(var x in groupSelectionSplit){
		node.getValue(att_TIIVisualCheckGroupArticle.getID()).addLOVValueByID(groupSelectionSplit[x]);
	}
	ba_CopyAttributeValuesForArticle.execute (node);
	ba_CopyReferencesForArticle.execute (node);
	ba_CopyDataContainersForArticle.execute (node);
	node.getValue(att_TIIVisualCheckGroupArticle.getID()).deleteCurrent();
}else{
	var error = new Error();
	throw error;
}
}