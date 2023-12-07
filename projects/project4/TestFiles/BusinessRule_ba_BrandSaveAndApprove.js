/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_BrandSaveAndApprove",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Brand Save And Approve",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "ast_Brand" ],
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
    "alias" : "att_BrandCity",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_BrandCity",
    "description" : null
  }, {
    "contract" : "SimpleValueBindContract",
    "alias" : "att_BrandProvince",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_BrandProvince",
    "description" : null
  } ],
  "messages" : [ {
    "variable" : "MessageBrandInWorkflow",
    "message" : "Kon niet goedkeuren. Merk bevindt zich in de workflow.",
    "translations" : [ {
      "language" : "nl",
      "message" : "Kon niet goedkeuren. Merk bevindt zich in de workflow."
    } ]
  }, {
    "variable" : "MessageBrandProvinceOrCityIsEmpty",
    "message" : "Merk plaats of regio is verplicht",
    "translations" : [ ]
  }, {
    "variable" : "MessageBrandProvinceOrCityBothAreFilled",
    "message" : "Merk plaats óf regio is verplicht",
    "translations" : [ ]
  } ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,att_BrandCity,att_BrandProvince,MessageBrandInWorkflow,MessageBrandProvinceOrCityIsEmpty,MessageBrandProvinceOrCityBothAreFilled) {
// If in workflow, throw error
if (node.isInWorkflow('wf_CreateNewBrand')) {
	throw new MessageBrandInWorkflow();
}

if (!att_BrandCity && !att_BrandProvince){
	throw new MessageBrandProvinceOrCityIsEmpty();
}

if (att_BrandCity && att_BrandProvince){
	throw new MessageBrandProvinceOrCityBothAreFilled();
}



// Otherwise we can approve
node.approve();
}