/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SetSearchTerms",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_SetValuesAndLinkes" ],
  "name" : "Set Search Terms",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article", "prd_BundleArticle", "prd_GiftBoxArticle" ],
  "allObjectTypesValid" : false,
  "runPrivileged" : true,
  "onApprove" : "TriggerAndApproveNewParts",
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
    "alias" : "att_SearchTerms",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_SearchTerms",
    "description" : null
  }, {
    "contract" : "BusinessFunctionBindContract",
    "alias" : "bf_GetLinkedGTINCodes",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>bf_GetLinkedGTINCodes</BusinessFunction>\n</BusinessFunctionReference>\n",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_ItemNumber",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ItemNumber",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,att_SearchTerms,bf_GetLinkedGTINCodes,att_ItemNumber) {
var valueBuilder = node.getValue(att_SearchTerms.getID()).replace();
var valueList = new java.util.ArrayList();
var children = node.getChildren();
children.add(node);
var childrenIterator = children.iterator();
while (childrenIterator.hasNext()) {
	var currentNode = childrenIterator.next();
	var gtinCodes = bf_GetLinkedGTINCodes.evaluate({node: currentNode});
	var gtinIterator = gtinCodes.iterator();
	while (gtinIterator.hasNext()) {
		var gtinValue = gtinIterator.next();
		if (valueList.contains(gtinValue) == false) {
			valueList.add(gtinValue);
		}
	}
	var itemCode = currentNode.getValue(att_ItemNumber.getID()).getSimpleValue();
	if (itemCode && valueList.contains(itemCode) == false) {
		valueList.add(itemCode);
	}
}
var valueIterator = valueList.iterator();
while (valueIterator.hasNext()) {
	var valueBuilder = valueBuilder.addValue(valueIterator.next());
}
valueBuilder.apply();
}