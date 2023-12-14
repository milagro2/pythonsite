/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_CreateBrand",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Create Brand",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "ast_Brand" ],
  "allObjectTypesValid" : true,
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
    "contract" : "ObjectTypeBindContract",
    "alias" : "ast_Brand",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "ast_Brand",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_COSMOSNumber",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_COSMOSNumber",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_COSMOSNumberCounter",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_COSMOSNumberCounter",
    "description" : null
  }, {
    "contract" : "WebUiContextBind",
    "alias" : "webUI",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "AttributeValidatedContextParameterStringBinding",
    "alias" : "brandName",
    "parameterClass" : "com.stibo.core.domain.businessrule.attributecontextparameter.AttributeValidatedContextParameter",
    "value" : "<AttributeValidatedContextParameter>\n  <Parameters>\n    <Parameter ID=\"Attribute\" Type=\"java.lang.String\">att_BrandName</Parameter>\n    <Parameter ID=\"ID\" Type=\"java.lang.String\">Name</Parameter>\n  </Parameters>\n</AttributeValidatedContextParameter>",
    "description" : null
  }, {
    "contract" : "AttributeValidatedContextParameterStringBinding",
    "alias" : "brandType",
    "parameterClass" : "com.stibo.core.domain.businessrule.attributecontextparameter.AttributeValidatedContextParameter",
    "value" : "<AttributeValidatedContextParameter>\n  <Parameters>\n    <Parameter ID=\"Attribute\" Type=\"java.lang.String\">att_BrandType</Parameter>\n    <Parameter ID=\"ID\" Type=\"java.lang.String\">Type</Parameter>\n  </Parameters>\n</AttributeValidatedContextParameter>",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_BrandType",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_BrandType",
    "description" : null
  } ],
  "messages" : [ {
    "variable" : "MessageNoBrandName",
    "message" : "No brand name was specified",
    "translations" : [ {
      "language" : "nl",
      "message" : "Er is geen merknaam opgegeven"
    } ]
  }, {
    "variable" : "MessageNoClassification",
    "message" : "No classification could be found. Brand names can only start with A-z or 0-9",
    "translations" : [ {
      "language" : "nl",
      "message" : "Er kon geen classificatie gevonden worden. Merknamen mogen alleen beginnen met A-z of 0-9"
    } ]
  } ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,ast_Brand,att_COSMOSNumber,att_COSMOSNumberCounter,webUI,manager,brandName,brandType,att_BrandType,MessageNoBrandName,MessageNoClassification) {
// Ensure name
if (!brandName) {
	throw new MessageNoBrandName();
}

// Find correct folder from name
var firstLetter = brandName[0].toUpperCase();
var classificationHome = manager.getClassificationHome();
var brandClassification = classificationHome.getClassificationByID('BrandIndex_' + firstLetter);

// If no folder could be found throw an error
if (!brandClassification) {
	throw new MessageNoClassification();
}

// Get COSMOS number
var COSMOSNumber = Number(brandClassification.getParent().getValue(att_COSMOSNumberCounter.getID()).getSimpleValue())+1;

// Update COSMOS number counter
brandClassification.getParent().getValue(att_COSMOSNumberCounter.getID()).setSimpleValue(COSMOSNumber);

// Create brand
var brand = brandClassification.createAsset('', ast_Brand);

// Set initial attributes
brand.setName(brandName);
brand.getValue(att_COSMOSNumber.getID()).setSimpleValue(COSMOSNumber);
brand.getValue(att_BrandType.getID()).setLOVValueByID(brandType);

// Alert users
webUI.showAlert('ACKNOWLEDGMENT', 'Nieuw merk gecreëerd', 'Het merk is met succes gecreëerd. Wacht op goedkeuring van Commercial Operations/Support en ga naar de Merk Workflow om het merk compleet te maken en goed te keuren.');

}