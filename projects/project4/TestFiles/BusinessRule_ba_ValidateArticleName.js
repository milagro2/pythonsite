/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_ValidateArticleName",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Validate Article Name",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article", "prd_BundleArticle", "prd_GiftBoxArticle" ],
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
    "alias" : "att_ProductShortDescription",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ProductShortDescription",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_ProductFullDescription",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ProductFullDescription",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,att_ProductShortDescription,att_ProductFullDescription) {
/*On Article, get Name.Trim name to 28 digits and capitalize all characters.
 *
 */
var name = node.getTitle();
node.getValue(att_ProductFullDescription.getID()).setValue(name);
node.getValue(att_ProductShortDescription.getID()).setValue(name.substring(0, Math.min(name.length(), 28)).toUpperCase());
}