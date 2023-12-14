/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_CopyAttributeValuesForPackUnit",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Copy Attribute Values for Packaging Unit",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_PackagingUnitCase", "prd_PackagingUnitEach", "prd_PackagingUnitPack", "prd_PackagingUnitPallet" ],
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
    "alias" : "atg_TIIPack_AlwaysOverwriteCreate",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeGroupImpl",
    "value" : "atg_TIIPack_AlwaysOverwriteCreate",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_TIIVisualCheckGroupPack",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_TIIVisualCheckGroupPack",
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
exports.operation0 = function (node,atg_TIIPack_AlwaysOverwriteCreate,att_TIIVisualCheckGroupPack,bf_GetDimensionAttributesFromGroup,bf_GetGlobalAttributesFromGroup,ptp_PartnerArticle,manager) {
/* Copy the attribute values from the trade item to the article
 *
 *  The functionality copies the values from the trade item linked to the packaging unit through the reference tradeItemLinkReference.
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
 *  alwaysCopyAttributeGroup -->Packaging Unit - Always Overwrite (atg_TIIPack_AlwaysOverwrite)
 *  visualCheckAttributeGroupAttribute --> Trade Item Information Groups (Packaging Unit) (att_TIIVisualCheckGroupPack)
 *  getDimensionAttributesFromGroup --> Get Dimension Attributes from Group (bf_GetDimensionAttributesFromGroup)
 *  getGlobalAttributesFromGroup --> Get Global Attributes from Group (bf_GetGlobalAttributesFromGroup)
 *  tradeItemLinkReferenceType --> Partner Article - Information Provider (ptp_PartnerArticle)
 */

var contextsToBeCopied = ['NL'];
//get all the attribute groups
var attributeGroups = new java.util.ArrayList();
attributeGroups.add(atg_TIIPack_AlwaysOverwriteCreate);
var visualCheckAttributeValues = node.getValue(att_TIIVisualCheckGroupPack.getID()).getValues().toArray();
for (var attGrp in visualCheckAttributeValues) {
	var attrGroup = manager.getAttributeGroupHome().getAttributeGroupByID(visualCheckAttributeValues[attGrp].getID());
	attributeGroups.add(attrGroup);
}

node.queryReferences(ptp_PartnerArticle).forEach(function (tradeItemRef) {
	var tradeItem = tradeItemRef.getTarget();
	for (var i=0; i < attributeGroups.size(); i++) {
		//Copy all global attribute values
		var globalAttributes = bf_GetGlobalAttributesFromGroup.evaluate({attributeGroup: attributeGroups.get(i)});
		for (var j=0; j < globalAttributes.size(); j++) {
			if (globalAttributes.get(j).isMultiValued()) {
				var globalMultiValues = tradeItem.getValue(globalAttributes.get(j).getID()).getValues().toArray();
				for (var gmv in globalMultiValues) {
					var globalMultiValue = globalMultiValues[gmv].getValue();
					var globalMultiValueUnit = globalMultiValues[gmv].getUnit();
					node.getValue(globalAttributes.get(j).getID()).addValue(globalMultiValue, globalMultiValueUnit);
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
					if (dimensionAttributes.get(k).isMultiValued()) {
						var multiValues = contextTradeItem.getValue(dimensionAttributes.get(k).getID()).getValues().toArray();
						for (var mv in multiValues) {
							var multiValue = multiValues[mv].getValue();
							var multiValueUnit = multiValues[mv].getUnit();
							contextNode.getValue(dimensionAttributes.get(k).getID()).addValue(multiValue, multiValueUnit);
						}
					} else {
						var contextValue = contextTradeItem.getValue(dimensionAttributes.get(k).getID()).getValue();
						var contextUnit = contextTradeItem.getValue(dimensionAttributes.get(k).getID()).getUnit();
						if (contextValue) {
							contextNode.getValue(dimensionAttributes.get(k).getID()).setValue(contextValue, contextUnit);
						}
					}
				});
			}
		}
	}
	return true;
});
}