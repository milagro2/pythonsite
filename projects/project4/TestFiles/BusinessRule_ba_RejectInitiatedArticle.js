/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_RejectInitiatedArticle",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Reject Initiated Article",
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
    "contract" : "AttributeBindContract",
    "alias" : "att_GlobalTradeIdentificationNumber",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_GlobalTradeIdentificationNumber",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_AvailabilityEndDate",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_AvailabilityEndDate",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_PricingValidityEndDate",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_PricingValidityEndDate",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_GlobalTradeIdentificationNumbers",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_GlobalTradeIdentificationNumbers",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ptp_PartnerArticle",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ptp_PartnerArticle",
    "description" : null
  }, {
    "contract" : "BusinessFunctionBindContract",
    "alias" : "bfGetAllPackgingUnits",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>bfGetAllPackgingUnits</BusinessFunction>\n</BusinessFunctionReference>\n",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "pte_TasteProfile",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "pte_TasteProfile",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_DataProvider",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_DataProvider",
    "description" : null
  }, {
    "contract" : "ProductBindContract",
    "alias" : "ArchivedArticles",
    "parameterClass" : "com.stibo.core.domain.impl.FrontProductImpl",
    "value" : "ArchivedArticles",
    "description" : null
  }, {
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_GlobalLocationNumber",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_GlobalLocationNumber",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,att_GlobalTradeIdentificationNumber,att_AvailabilityEndDate,att_PricingValidityEndDate,ref_GlobalTradeIdentificationNumbers,ptp_PartnerArticle,bfGetAllPackgingUnits,pte_TasteProfile,ref_DataProvider,ArchivedArticles,manager,att_GlobalLocationNumber) {
/*Retrieve all packaging units of the Article (bfGetAllPackgingUnits).
 * Remove all references for the Article and the Packaging Units.
 * Force delete and purge Article and Packaging Units.
 *
 * Bindings:
 * getAllPackgingUnits --> Get all packaging units for an article (bfGetAllPackgingUnits)
 * gtinRef --> Global Trade Identification Numbers (ref_GlobalTradeIdentificationNumbers)
 * tradeItemRef --> Partner Article - Information Provider (ptp_PartnerArticle)
 * tasteProfileRef --> Taste Profile (pte_TasteProfile)
 */

var emptyTradeItemKey = new java.util.HashMap();	//attributevalue map
emptyTradeItemKey.put(att_GlobalTradeIdentificationNumber.getID(), "");
emptyTradeItemKey.put(att_GlobalLocationNumber.getID(), "");

var packagingUnit = bfGetAllPackgingUnits.evaluate({node: node});
if (!packagingUnit.isEmpty()) {
	for (var i=0; i<packagingUnit.size(); i++) {
		deleteAllReferences(packagingUnit.get(i));
	}
}
var tradeItem = node.queryReferences(ptp_PartnerArticle).asList(10).get(0).getTarget();
deleteAllReferences(node);
var tradeItemKey = manager.getKeyHome().updateUniqueKeyValues2(emptyTradeItemKey, tradeItem);

log.info(tradeItem.getValue(att_GlobalTradeIdentificationNumber.getID()).getSimpleValue());

tradeItem.delete();
node.setParent(ArchivedArticles);

//Delete the object (article/ packaging unit)
function deleteObject(object) {
	try {
		object.delete();
	} catch (e) {
		if (e.javaException instanceof com.stibo.core.domain.DependencyException) {
			log.warning('Node '+object.getTitle()+' can\'t be deleted. '+e.javaException.getMessage());
			throw 'Node '+object.getTitle()+' can\'t be deleted. '+e.javaException.getMessage();
		} else {
			throw e;
		}
	}
}

//Remove the reference
function deleteAllReferences(object) {
	object.queryReferences(ref_GlobalTradeIdentificationNumbers).forEach(function(gtinReference) {
	     gtinReference.delete();
	     return true;
     });

     object.queryReferences(ptp_PartnerArticle).forEach(function(tradeItemReference) {
     	tradeItemReference.delete();
	     return true;
     });

     object.queryReferences(pte_TasteProfile).forEach(function(tasteProfileReference) {
	     tasteProfileReference.delete();
	     return true;
     });
	object.queryReferences(ref_DataProvider).forEach(function(dataProviderReference) {
	     dataProviderReference.delete();
	     return true;
     });
}
}