/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_RemoveUTF8Characters",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Remove UTF8 Characters",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ ],
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
    "contract" : "AttributeBindContract",
    "alias" : "att_ProductMarketingMessage",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ProductMarketingMessage",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_ProductCommercialDescription",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ProductCommercialDescription",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_ProductAdditionalDescription",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ProductAdditionalDescription",
    "description" : null
  }, {
    "contract" : "CurrentObjectBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (att_ProductMarketingMessage,att_ProductCommercialDescription,att_ProductAdditionalDescription,node) {
var longDesc = node.getValue(att_ProductMarketingMessage.getID()).getValue();
var mediumDesc = node.getValue(att_ProductCommercialDescription.getID()).getValue();
var shortDesc = node.getValue(att_ProductAdditionalDescription.getID()).getValue();
//

if (longDesc != '' && longDesc != null) {
	longDesc = longDesc.replace('‘','\'');
	longDesc = longDesc.replace('’','\'');
	longDesc = longDesc.replace('‛','\'');
	longDesc = longDesc.replace('“','"');
	longDesc = longDesc.replace('”','"');
	longDesc = longDesc.replace('‟','"');
	longDesc = longDesc.replace('❛','\'');
	longDesc = longDesc.replace('❜','\'');
	longDesc = longDesc.replace('❝','"');
	longDesc = longDesc.replace('❞','"');
	longDesc = longDesc.replace('','\'');
//	longDesc = longDesc.replace('',"*");
//	longDesc = longDesc.replace('',"-");
	node.getValue(att_ProductMarketingMessage.getID()).setValue(longDesc);
}

if (mediumDesc != '' && mediumDesc != null) {
	mediumDesc = mediumDesc.replace('‘','\'');
	mediumDesc = mediumDesc.replace('’','\'');
	mediumDesc = mediumDesc.replace('‛','\'');
	mediumDesc = mediumDesc.replace('“','"');
	mediumDesc = mediumDesc.replace('”','"');
	mediumDesc = mediumDesc.replace('‟','"');
	mediumDesc = mediumDesc.replace('❛','\'');
	mediumDesc = mediumDesc.replace('❜','\'');
	mediumDesc = mediumDesc.replace('❝','"');
	mediumDesc = mediumDesc.replace('❞','"');
	mediumDesc = mediumDesc.replace('','\'');
//	mediumDesc = mediumDesc.replace('',"*");
//	mediumDesc = mediumDesc.replace('',"-");
	node.getValue(att_ProductCommercialDescription.getID()).setValue(mediumDesc);
}

if (shortDesc != '' && shortDesc != null) {
	shortDesc = shortDesc.replace('‘','\'');
	shortDesc = shortDesc.replace('’','\'');
	shortDesc = shortDesc.replace('‛','\'');
	shortDesc = shortDesc.replace('“','"');
	shortDesc = shortDesc.replace('”','"');
	shortDesc = shortDesc.replace('‟','"');
	shortDesc = shortDesc.replace('❛','\'');
	shortDesc = shortDesc.replace('❜','\'');
	shortDesc = shortDesc.replace('❝','"');
	shortDesc = shortDesc.replace('❞','"');
	shortDesc = shortDesc.replace('','\'');
//	shortDesc = shortDesc.replace('',"*");
//	shortDesc = shortDesc.replace('',"-");
	node.getValue(att_ProductAdditionalDescription.getID()).setValue(shortDesc);
}
}