/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_StartUpdateSeasonalAssetWorkflow",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_AssetRelatedActions" ],
  "name" : "Start Update Seasonal Asset Workflow",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article", "prd_BundleArticle", "prd_GiftBoxArticle", "prd_PackagingUnitCase", "prd_PackagingUnitPack", "prd_PackagingUnitPallet" ],
  "allObjectTypesValid" : false,
  "runPrivileged" : false,
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
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_AlternativeProductImage",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_AlternativeProductImage",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_PrimaryProductImage",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_PrimaryProductImage",
    "description" : null
  }, {
    "contract" : "LoggerBindContract",
    "alias" : "log",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "WebUiContextBind",
    "alias" : "web",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_Article",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_Article",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_PrimarySourceImage",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_PrimarySourceImage",
    "description" : null
  }, {
    "contract" : "AttributeValidatedContextParameterStringBinding",
    "alias" : "alternativeSetting",
    "parameterClass" : "com.stibo.core.domain.businessrule.attributecontextparameter.AttributeValidatedContextParameter",
    "value" : "<AttributeValidatedContextParameter>\n  <Parameters>\n    <Parameter ID=\"Attribute\" Type=\"java.lang.String\">att_AlternativePackshotSetting</Parameter>\n    <Parameter ID=\"ID\" Type=\"java.lang.String\">att_altSetting</Parameter>\n  </Parameters>\n</AttributeValidatedContextParameter>",
    "description" : null
  } ],
  "messages" : [ {
    "variable" : "aMessage",
    "message" : "Selected item is in create article workflow, or in a related asset workflow.",
    "translations" : [ {
      "language" : "nl",
      "message" : "Geselecteerde artikel is al in de creatie/asset workflow."
    } ]
  }, {
    "variable" : "bMessage",
    "message" : "No primary source image set. This is needed before starting the workflow.",
    "translations" : [ {
      "language" : "nl",
      "message" : "Er is geen 'primary source image' geselecteerd. Dit is nodig om de workflow te starten."
    } ]
  } ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,ref_AlternativeProductImage,ref_PrimaryProductImage,log,web,prd_Article,ref_PrimarySourceImage,alternativeSetting,aMessage,bMessage) {
var errorMessage;


if (prd_Article.getID() == node.getObjectType().getID()) {
	var primarySource = node.queryReferences(ref_PrimarySourceImage).asList(5);

	if (primarySource.size() == 0) {
		errorMessage = new bMessage;
		throw errorMessage;
	}
} else if (node.getObjectType().getID().substring(0,17).equals('prd_PackagingUnit')) {
	var primarySource = node.queryReferences(ref_PrimarySourceImage).asList(5);

	if (primarySource.size() == 0) {
		errorMessage = new bMessage;
		return errorMessage;
	}
}

if (!(node.isInWorkflow('wf_CreateArticle') || node.isInWorkflow('wf_CreateArticleOther') ||node.isInWorkflow('wf_RejectAsset')||node.isInWorkflow('wf_AddPrimaryAsset'))) {
	var wfi = node.startWorkflowByID('wf_AddPrimaryAsset','Initial');
} else {
	errorMessage = new aMessage();
	throw errorMessage;
}

if (wfi) {
	wfi.setSimpleVariable('alternativeSetting', alternativeSetting);
}
}