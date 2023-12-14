/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_CopyReferencesForArticle",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Copy References for Article",
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
exports.operation0 = function (node,atg_TIIArticle_AlwaysOverwrite,att_TIIVisualCheckGroupArticle,bf_GetReferencesFromGroup,ptp_PartnerArticle,manager) {
/* Copy the references from the trade item to the article, including all the metadata
 *
 *  The functionality copies the references from the trade item linked to the article through the reference tradeItemLinkReference.
 *
 *  Copy all references which are in the group(s)
 *  1. Attribute group alwaysCopyAttributeGroup
 *  2. The attribute groups stated in the value of the attribute visualCheckAttributeGroupAttribite, based on the LOV value ID
 *
 *  Bindings:
 *  alwaysCopyAttributeGroup --> Article - Always Overwrite (atg_TIIArticle_AlwaysOverwrite)
 *  visualCheckAttributeGroupAttribute --> Trade Item Information Groups (Article) (att_TIIVisualCheckGroupArticle)
 *  getReferencesFromGroup --> Get References from Group (bf_Get ReferencesFromGroup)
 *  tradeItemLinkReferenceType --> Partner Article - Information Provider (ptp_PartnerArticle)
 */
//get all the attribute groups
var attributeGroups = new java.util.ArrayList();
attributeGroups.add(atg_TIIArticle_AlwaysOverwrite);
var visualCheckAttributeValues = node.getValue(att_TIIVisualCheckGroupArticle.getID()).getValues().toArray();
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
		//delete existing references
			for (var j=0; j < references.size(); j++) {
				node.queryReferences(references.get(j)).forEach(function (articleReference) {
				articleReference.delete();
				return true;
			});
			//create new references
			var tradeItemReferences = tradeItem.queryReferences(references.get(j)).forEach(function(tiRef) {
				var target = tiRef.getTarget();
				var newRef;
				var validForObjects = references.get(j).getValidForObjectTypes().toArray();
				for (var x in validForObjects) {
					if (node.getObjectType().equals(validForObjects[x])) {
						try {
							newRef= node.createReference(target,tiRef.getReferenceType());
							log.info(newRef);
						} catch (e) {
							if (e.javaException instanceof com.stibo.core.domain.reference.SingleReferenceConstraintException) {
				 				log.info('Reference is already present for reference type '+ tiRef.getReferenceType().getID());
					 		} else if (e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
					 			log.info('Target already referenced for reference type '+ tiRef.getReferenceType().getID());
							} else {
				           		throw (e);
					 		}
						}
					}
				}
				if (newRef) {
					var value = tiRef.getValues().toArray();
					for (var val in value) {
						var attributeId = value[val].getAttribute().getID();
						var attributeValue = tiRef.getValue(attributeId).getValue();
						if (attributeValue) {
							newRef.getValue(attributeId).setValue(attributeValue);
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