/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_CopyReferencesForPackUnit",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Copy References for Packaging Unit",
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
    "alias" : "atg_TIIPack_AlwaysOverwrite",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeGroupImpl",
    "value" : "atg_TIIPack_AlwaysOverwrite",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_TIIVisualCheckGroupPack",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_TIIVisualCheckGroupPack",
    "description" : null
  }, {
    "contract" : "BusinessFunctionBindContract",
    "alias" : "bf_GetReferencesFromGroup",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>bf_GetReferencesFromGroup</BusinessFunction>\n</BusinessFunctionReference>\n",
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
exports.operation0 = function (node,atg_TIIPack_AlwaysOverwrite,att_TIIVisualCheckGroupPack,bf_GetReferencesFromGroup,ptp_PartnerArticle,manager) {
/* Copy the references from the trade item to the packaging unit, including all the metadata
 *
 *  The functionality copies the references from the trade item linked to the packaging unit through the reference tradeItemLinkReference.
 *
 *  Copy all references which are in the group(s)
 *  1. Attribute group alwaysCopyAttributeGroup
 *  2. The attribute groups stated in the value of the attribute visualCheckAttributeGroupAttribite, based on the LOV value ID
 *
 *  Bindings:
 *  alwaysCopyAttributeGroup --> Packaging Unit - Always Overwrite (atg_TIIPack_AlwaysOverwrite)
 *  visualCheckAttributeGroupAttribute --> Trade Item Information Groups (Packaging Unit) (att_TIIVisualCheckGroupPack)
 *  getReferencesFromGroup --> Get References from Group (bf_GetReferencesFromGroup)
 *  tradeItemLinkReferenceType --> Partner Article - Information Provider (ptp_PartnerArticle)
 */

//get all the attribute groups
var attributeGroups = new java.util.ArrayList();
attributeGroups.add(atg_TIIPack_AlwaysOverwrite);
var visualCheckAttributeValues = node.getValue(att_TIIVisualCheckGroupPack.getID()).getValues().toArray();
for (var attGrp in visualCheckAttributeValues) {
	var attrGroup = manager.getAttributeGroupHome().getAttributeGroupByID(visualCheckAttributeValues[attGrp].getID());
	if (attrGroup) {
		attributeGroups.add(attrGroup);
	}
}

node.queryReferences(ptp_PartnerArticle).forEach(function (tradeItemLink) {
	var tradeItem = tradeItemLink.getTarget();
	for (var i=0; i < attributeGroups.size(); i++) {
		//fetch the references from attribute group
		var references = bf_GetReferencesFromGroup.evaluate({attributeGroup: attributeGroups.get(i)});
		for (var j=0; j < references.size(); j++) {
			tradeItem.queryReferences(references.get(j)).forEach(function (tiRef) {
				var target = tiRef.getTarget();
				var newRef;
				try {
					newRef= node.createReference(target,tiRef.getReferenceType());
				} catch (e) {
					if (e.javaException instanceof com.stibo.core.domain.reference.SingleReferenceConstraintException) {
		 				log.info('Reference is already present for reference type '+ tiRef.getReferenceType().getID());
			 		} else if (e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
			 			log.info('Target already referenced for reference type '+ tiRef.getReferenceType().getID());
					} else {
		           		throw (e);
			 		}
				}
				if (newRef) {
					var value = tiRef.getValues().toArray();
					for (var val in value) {
						var attributeId = value[val].getAttribute().getID();
						var attributeValue = tiRef.getValue(attributeId).getValue();
						var unit = tiRef.getValue(attributeId).getUnit();
						if (value[val].getAttribute().isMultiValued()) {
							var multiValues = tiRef.getValue(attributeId).getValues().toArray();
							for (var mv in multiValues) {
								var multiValue = multiValues[mv].getValue();
								var multiValueUnit = multiValues[mv].getUnit();
								newRef.getValue(attributeId).addValue(multiValue, multiValueUnit);
							}
						} else if (attributeValue) {
							newRef.getValue(attributeId).setValue(attributeValue, unit);
						}
					}
				}
				return true;
			});
		}
	}
	return true;
});
}