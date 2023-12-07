/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_GenCopyAttributeValuesForArticle",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_CopyTradeItem" ],
  "name" : "Copy Attribute Values for Article",
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
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,atg_TIIArticle_AlwaysOverwrite,bf_GetDimensionAttributesFromGroup,bf_GetGlobalAttributesFromGroup,ptp_PartnerArticle,manager) {
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

var contextsToBeCopied = ['NL'];
var tradeItemRef = node.queryReferences(ptp_PartnerArticle).asList(100);
//get all the attribute groups
node.queryReferences(ptp_PartnerArticle).forEach(function (tradeItemRef) {
	var tradeItem = tradeItemRef.getTarget();
		//Copy all global attribute values
		var globalAttributes = bf_GetGlobalAttributesFromGroup.evaluate({attributeGroup: atg_TIIArticle_AlwaysOverwrite});
		for (var j=0; j < globalAttributes.size(); j++) {
			if (globalAttributes.get(j).isMultiValued()) {
				//handle multivalue attributes
				var multivalueList = new java.util.ArrayList();
				var articleValues = node.getValue(globalAttributes.get(j).getID()).getValues().toArray();
				for (var a in articleValues) {
					multivalueList.add(articleValues[a].getSimpleValue());
				}
				var valueItr = tradeItem.getValue(globalAttributes.get(j).getID()).getValues().iterator();
				////Remove current value from article only if trade item has data.

				if(valueItr.hasNext()) {
					log.info("Removing");
					node.getValue(globalAttributes.get(j).getID()).deleteCurrent();
				}
				
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
		var dimensionAttributes = bf_GetDimensionAttributesFromGroup.evaluate({attributeGroup: atg_TIIArticle_AlwaysOverwrite});
		for (var k=0; k < dimensionAttributes.size(); k++) {
			
			for (var context in contextsToBeCopied) {
				log.info(contextsToBeCopied[context]);	
				manager.executeInContext(contextsToBeCopied[context],function(contextManager) {
					var contextNode = contextManager.getObjectFromOtherManager(node);
					var contextTradeItem = contextManager.getObjectFromOtherManager(tradeItem);
				
					var contextValue = contextTradeItem.getValue(dimensionAttributes.get(k).getID()).getValue();
					log.info("Context att " + dimensionAttributes.get(k).getID() + " , value = " + contextTradeItem.getValue(dimensionAttributes.get(k).getID()).getSimpleValue());
					var contextUnit = contextTradeItem.getValue(dimensionAttributes.get(k).getID()).getUnit();
					if (contextValue) {
						contextNode.getValue(dimensionAttributes.get(k).getID()).setValue(contextValue,contextUnit);
					}
				});
			}
		}

	return true;
});
}