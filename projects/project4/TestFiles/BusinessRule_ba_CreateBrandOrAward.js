/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_CreateBrandOrAward",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Create Brand or Award",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "cla_AwardsIndexFolder", "cla_BrandIndexFolder" ],
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
    "contract" : "AttributeValidatedContextParameterStringBinding",
    "alias" : "name",
    "parameterClass" : "com.stibo.core.domain.businessrule.attributecontextparameter.AttributeValidatedContextParameter",
    "value" : "<AttributeValidatedContextParameter>\n  <Parameters>\n    <Parameter ID=\"Attribute\" Type=\"java.lang.String\"></Parameter>\n    <Parameter ID=\"ID\" Type=\"java.lang.String\">Name</Parameter>\n  </Parameters>\n</AttributeValidatedContextParameter>",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "ast_Award",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "ast_Award",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "cla_BrandIndexFolder",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "cla_BrandIndexFolder",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "cla_AwardsIndexFolder",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "cla_AwardsIndexFolder",
    "description" : null
  }, {
    "contract" : "WebUiContextBind",
    "alias" : "webUI",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,ast_Brand,att_COSMOSNumber,att_COSMOSNumberCounter,name,ast_Award,cla_BrandIndexFolder,cla_AwardsIndexFolder,webUI) {
if (node.getObjectType().getID() == cla_BrandIndexFolder.getID()) {
	var newBrand = node.createAsset('', ast_Brand);
	var newCOSMOSNumber = Number(node.getParent().getValue(att_COSMOSNumberCounter.getID()).getSimpleValue())+1;
	node.getParent().getValue(att_COSMOSNumberCounter.getID()).setSimpleValue(newCOSMOSNumber);
	newBrand.getValue(att_COSMOSNumber.getID()).setSimpleValue(newCOSMOSNumber);
	newBrand.setName(name);
	webUI.navigate('Brand_NodeDetails', newBrand);
} else if (node.getObjectType().getID() == cla_AwardsIndexFolder.getID()) {
	var newAward = node.createAsset('', ast_Award);
	var newCOSMOSNumber = Number(node.getParent().getValue(att_COSMOSNumberCounter.getID()).getSimpleValue())+1;
	node.getParent().getValue(att_COSMOSNumberCounter.getID()).setSimpleValue(newCOSMOSNumber);
	newAward.getValue(att_COSMOSNumber.getID()).setSimpleValue(newCOSMOSNumber);
	newAward.setName(name);
	webUI.navigate('Award_NodeDetails', newAward);
}
}