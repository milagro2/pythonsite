/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_LinkTradeItemNextLowerLevel",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Link Trade Item Next Lower Level",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_TradeItem" ],
  "allObjectTypesValid" : false,
  "runPrivileged" : false,
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
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_NumberOfChildren",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_NumberOfChildren",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_QuantityOfNextLowerLevel",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_QuantityOfNextLowerLevel",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_LowerLevelGTIN",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_LowerLevelGTIN",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_GlobalLocationNumber",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_GlobalLocationNumber",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_NextLowerLevel",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_NextLowerLevel",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_GiftBoxContent",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_GiftBoxContent",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "EAN",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_GlobalTradeIdentificationNumber",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ptp_PartnerArticle",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ptp_PartnerArticle",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_PackagingUnitEach",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_PackagingUnitEach",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_GiftBoxArticle",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_GiftBoxArticle",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,manager,att_NumberOfChildren,att_QuantityOfNextLowerLevel,att_LowerLevelGTIN,att_GlobalLocationNumber,ref_NextLowerLevel,ref_GiftBoxContent,EAN,ptp_PartnerArticle,prd_PackagingUnitEach,prd_GiftBoxArticle) {
/* From node retrieve attribute value for Number Of Children (att_NumberOfChildren).
 *  If value is 1, then
 *  		retrieve attributes Quantity of Next Lower Level (att_QuantityOfNextLowerLevel) and Lower Level GTIN (att_LowerLevelGTIN)
 *  		on data container Product Packaging Hierarchy Information (dct_ProductPackagingHierarchyInformation) for node.
 *  		Further, retrieve on the node the attribute value for Global Location Number (att_GlobalLocationNumber).
 *  		If values for att_LowerLevelGTIN and att_GlobalLocationNumber are found, search for a Trade item (prd_TradeItem)
 *  		where the Trade Item Key (key_TradeItem) is equal to concatenate(value('att_GlobalLocationNumber'),'-', right(concatenate('00000000000000', value('att_GlobalTradeIdentificationNumber')),14)).
 *  		If a Trade Item is found, check if reference Next Lower Level (ref_NextLowerLevel) already exists
 *  		between the current node (source) and the found Trade Item (target).
 *  		If not or different, create reference Next Lower Level (ref_NextLowerLevel) between the current node (source) and
 *  		the found Trade Item (target) and set the attribute value Quantity of Next Lower Level (att_QuantityOfNextLowerLevel)
 *  		on the reference equal to att_QuantityOfNextLowerLevel found on the data container.
 *
 * If value is not 1, do the same as above, but set the reference GiftBox Content (ref_GiftBoxContent) instead of Next Lower Level (ref_NextLowerLevel).
 *
 * Bindings:
 * noOfChildrenAtt --> Number Of Children (att_NumberOfChildren)
 * quantityOfNextLowerLevelAtt --> Quantity of Next Lower Level (att_QuantityOfNextLowerLevel)
 * lowerLevelGTINAtt --> Lower Level GTIN (att_LowerLevelGTIN)
 * nextLowerLevelRef --> Next Lower Level (ref_NextLowerLevel)
 * giftBoxContentRef --> GiftBox Content (ref_GiftBoxContent)
 * EAN --> EAN Number (att_GlobalTradeIdentificationNumber)
 */

 var numOfChildren = node.getValue(att_NumberOfChildren.getID()).getSimpleValue();
 if (numOfChildren == 1) {
 	performAction(true);
 } else {
 	performAction(false);
 }

function performAction(isSingleChild) {
	var containers = node.getDataContainerByTypeID('dct_ProductPackagingHierarchyInformation').getDataContainers().iterator();
	while (containers.hasNext()) {
		var dataContainer = containers.next().getDataContainerObject();
		var quantityOfNextLowerLevelValue = dataContainer.getValue(att_QuantityOfNextLowerLevel.getID()).getSimpleValue();
		var lowerLevelGTINValue = dataContainer.getValue(att_LowerLevelGTIN.getID()).getSimpleValue();
		var globalLocationNumberValue = node.getValue(att_GlobalLocationNumber.getID()).getSimpleValue();
		var globalTradeIdentificationNumber = node.getValue(EAN.getID()).getSimpleValue();
		if (lowerLevelGTINValue && globalLocationNumberValue) {
			//earch for a Trade item (prd_TradeItem) where the Trade Item Key (key_TradeItem) is equal to
			//concatenate(value('att_GlobalLocationNumber'),'-', right(concatenate('00000000000000', value('att_GlobalTradeIdentificationNumber')),14)).
			var GTIN = '00000000000000'+lowerLevelGTINValue;
			var formattedGTIN = GTIN.slice(-14);
			var key = globalLocationNumberValue + '-'+formattedGTIN;
			var tradeItem = manager.getNodeHome().getObjectByKey('key_TradeItem', key);
			if (tradeItem) {
				var found = false;
				var referenceType = null;
				if (isSingleChild) {
					referenceType = ref_NextLowerLevel;
					var parent = tradeItem.getParent();
					node.setParent(parent);
				} else {
					referenceType = ref_GiftBoxContent;
				}
				node.queryReferences(referenceType).forEach(function (tradeItemRef) {
					if (tradeItemRef.getTarget().getID().equals(tradeItem.getID())) {
						found = true;
					}
					return true;
				});
				if (!found) {
					var ref = node.createReference(tradeItem, referenceType.getID());
					ref.getValue(att_QuantityOfNextLowerLevel.getID()).setSimpleValue(quantityOfNextLowerLevelValue);
				}
				if (!isSingleChild) {
					var references = tradeItem.queryReferencedBy(ptp_PartnerArticle).asList(10);
					if (references.size() > 0) {
						tradeItem.queryReferencedBy(ptp_PartnerArticle).forEach(function(referencePU) {
							var source = referencePU.getSource();
							if (source.getObjectType().getID().equals(prd_PackagingUnitEach.getID())) {
								node.queryReferencedBy(ptp_PartnerArticle).forEach(function(referenceGiftBox) {
									var giftBox = referenceGiftBox.getSource();
									var refContent;
									if (giftBox.getObjectType().getID().equals(prd_GiftBoxArticle.getID())) {
										try {
											refContent = giftBox.createReference(source,ref_GiftBoxContent);
											refContent.getValue(att_QuantityOfNextLowerLevel.getID()).setSimpleValue(quantityOfNextLowerLevelValue);
										} catch (e) {
											if (e.javaException instanceof com.stibo.core.domain.reference.SingleReferenceConstraintException) {
													log.info('Reference is already present for reference type '+ ref_GiftBoxContent);
									 		} else if (e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
									 			log.info('Target already referenced for reference type '+ ref_GiftBoxContent);
											} else {
									      		throw (source+': '+e);
									 		}
										}
									}
									return true;
								});
							}
							return true;
						});
					}
				}
			}
		}
	}
}

function createreference(source,target,reference) {

}
}