/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_CopyOverwriteAttValuesForArticle",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Copy Overwrite Attribute Values for Article",
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
    "contract" : "AttributeGroupBindContract",
    "alias" : "atg_TIIArticle_AlwaysOverwrite",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeGroupImpl",
    "value" : "atg_TIIArticle_AlwaysOverwrite",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_TIIVisualCheckGroupArticle",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_TIIVisualCheckGroupArticle",
    "description" : null
  }, {
    "contract" : "BusinessFunctionBindContract",
    "alias" : "bf_GetDimensionAttributesFromGroup",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>bf_GetDimensionAttributesFromGroup</BusinessFunction>\n</BusinessFunctionReference>\n",
    "description" : null
  }, {
    "contract" : "BusinessFunctionBindContract",
    "alias" : "bf_GetGlobalAttributesFromGroup",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>bf_GetGlobalAttributesFromGroup</BusinessFunction>\n</BusinessFunctionReference>\n",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ptp_PartnerArticle",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ptp_PartnerArticle",
    "description" : null
  }, {
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "BusinessActionBindContract",
    "alias" : "ba_CopyDataContainersForArticle",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessActionImpl",
    "value" : "ba_CopyDataContainersForArticle",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,atg_TIIArticle_AlwaysOverwrite,att_TIIVisualCheckGroupArticle,bf_GetDimensionAttributesFromGroup,bf_GetGlobalAttributesFromGroup,ptp_PartnerArticle,manager,ba_CopyDataContainersForArticle) {
/* Copy the attribute values from the trade item to the article
 *
 *  The functionality copies the values from the trade item linked to the article through the reference tradeItemLinkReference.
 *
 *  Copy all global attribute values (not language dependent) for the attributes which are in the group(s)
 *  1. Attribute group alwaysCopyAttributeGroup
 *  2. The attribute groups stated in the value of the attribute visualCheckAttributeGroupAttribite, based on the LOV value ID
 *
 *  Copy all language dependent attribute values in all relevant contexts for the attributes which are in the group(s)
 *  1. Attribute group alwaysCopyAttributeGroup
 *  2. The attribute groups stated in the value of the attribute visualCheckAttributeGroupAttribite, based on the LOV value ID
 *
 *  Bindings:
 *  alwaysCopyAttributeGroup --> Article - Always Overwrite (atg_TIIArticle_AlwaysOverwrite)
 *  visualCheckAttributeGroupAttribute --> Trade Item Information Groups (Article) (att_TIIVisualCheckGroupArticle)
 *  getDimensionAttributesFromGroup --> Get Dimension Attributes from Group (bf_GetDimensionAttributesFromGroup)
 *  getGlobalAttributesFromGroup --> Get Global Attributes from Group (bf_GetGlobalAttributesFromGroup)
 *  tradeItemLinkReferenceType --> Partner Article - Information Provider (ptp_PartnerArticle)
 */

// Copy data containers
ba_CopyDataContainersForArticle.execute(node);

var contextsToBeCopied = ['NL'];
var tradeItemRef = node.queryReferences(ptp_PartnerArticle).asList(100);
//get all the attribute groups
var attributeGroups = new java.util.ArrayList();
attributeGroups.add(atg_TIIArticle_AlwaysOverwrite);

node.queryReferences(ptp_PartnerArticle).forEach(function (tradeItemRef) {
	var tradeItem = tradeItemRef.getTarget();
	for (var i=0; i < attributeGroups.size(); i++) {
		//Copy all global attribute values
		log.info('Copying for attribute group = ' + attributeGroups.get(i).getID());
		var globalAttributes = bf_GetGlobalAttributesFromGroup.evaluate({attributeGroup: attributeGroups.get(i)});
		for (var j=0; j < globalAttributes.size(); j++) {
			if (globalAttributes.get(j).isMultiValued()) {
				//handle multivalue attributes
				var multivalueList = new java.util.ArrayList();
				var articleValues = node.getValue(globalAttributes.get(j).getID()).getValues().toArray();
				for (var a in articleValues) {
					multivalueList.add(articleValues[a].getSimpleValue());
				}
				var valueItr = tradeItem.getValue(globalAttributes.get(j).getID()).getValues().iterator();
				while (valueItr.hasNext()) {
					var value = valueItr.next();
					if (!multivalueList.contains(value.getSimpleValue())) {
						node.getValue(globalAttributes.get(j).getID()).addValue(value.getSimpleValue());
					}
				}
			} else {
				var value = tradeItem.getValue(globalAttributes.get(j).getID()).getValue();
				var unit = tradeItem.getValue(globalAttributes.get(j).getID()).getUnit();
				if (value) {
					node.getValue(globalAttributes.get(j).getID()).setValue(value,unit);
				}
			}
		}

		//Copy all language dependent attribute values in all relevant contexts for the attributes which are in the group(s)
		var dimensionAttributes = bf_GetDimensionAttributesFromGroup.evaluate({attributeGroup: attributeGroups.get(i)});
		for (var k=0; k < dimensionAttributes.size(); k++) {
			for (var context in contextsToBeCopied) {
				manager.executeInContext(contextsToBeCopied[context],function(contextManager) {
					var contextNode = contextManager.getProductHome().getProductByID(node.getID());
					var contextTradeItem = contextManager.getProductHome().getProductByID(tradeItem.getID());
					var contextValue = contextTradeItem.getValue(dimensionAttributes.get(k).getID()).getValue();
					var contextUnit = contextTradeItem.getValue(dimensionAttributes.get(k).getID()).getUnit();
					if (contextValue) {
						contextNode.getValue(dimensionAttributes.get(k).getID()).setValue(contextValue,contextUnit);
					}
				});
			}
		}
	}
	return true;
});
}