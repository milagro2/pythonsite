/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_CreateTIOnPUWorkflowCreatePU",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Create Trade Item object for a Packaging Unit",
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
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_DataProvider",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_DataProvider",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_GlobalLocationNumber",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_GlobalLocationNumber",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_PackagingUnitCase",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_PackagingUnitCase",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_PackagingUnitPack",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_PackagingUnitPack",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_PackagingUnitPallet",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_PackagingUnitPallet",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_GlobalTradeIdentificationNumber",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_GlobalTradeIdentificationNumber",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_TradeItem",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_TradeItem",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ptp_PartnerArticle",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ptp_PartnerArticle",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_ProductFamily",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_ProductFamily",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_ProductCategory",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_ProductCategory",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_GlobalTradeIdentificationNumbers",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_GlobalTradeIdentificationNumbers",
    "description" : null
  }, {
    "contract" : "BusinessFunctionBindContract",
    "alias" : "bf_GetArticleFromPackagingUnit",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>bf_GetArticleFromPackagingUnit</BusinessFunction>\n</BusinessFunctionReference>\n",
    "description" : null
  }, {
    "contract" : "BusinessActionBindContract",
    "alias" : "ba_PostEventToTIMS",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessActionImpl",
    "value" : "ba_PostEventToTIMS",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_MainIndicator",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_MainIndicator",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,manager,ref_DataProvider,att_GlobalLocationNumber,prd_PackagingUnitCase,prd_PackagingUnitPack,prd_PackagingUnitPallet,att_GlobalTradeIdentificationNumber,prd_TradeItem,ptp_PartnerArticle,prd_ProductFamily,prd_ProductCategory,ref_GlobalTradeIdentificationNumbers,bf_GetArticleFromPackagingUnit,ba_PostEventToTIMS,att_MainIndicator) {
/*On the Article, retrieve Target of reference Data Provider (ref_DataProvider).
 * On the target, retrieve attribute value for Global Location Number (att_GlobalLocationNumber).
 * On the Article, retrieve noderen with object types Packaging Unit [Case] (prd_PackagingUnitCase), Packaging Unit [Pack] (prd_PackagingUnitPack)
 * and Packaging Unit [Pallet] (prd_PackagingUnitPallet). On the noderen, retrieve attribute value Global Trade Identification Number (att_GlobalTradeIdentificationNumber).
 * Search for a Trade item (prd_TradeItem) objects where the concatenation of the noderen attribute value of Global Trade Identification Number
 * (att_GlobalTradeIdentificationNumber) and the article reference Global Location Number (att_GlobalLocationNumber) is equal to the Trade Item Key (key_TradeItem).
 * If a Trade item (prd_TradeItem) object is found, create reference Partner Article (ptp_PartnerArticle) where the Source is the relevant node of the Article and the Target is the found Trade item (prd_TradeItem).
 * Else, create Trade item (prd_TradeItem) object where the Name is equal to the Name of the relevant node and the attribute value on the  Trade item (prd_TradeItem) of Global Trade Identification Number (att_GlobalTradeIdentificationNumber) equals to the attribute Global Trade Identification Number (att_GlobalTradeIdentificationNumber) on the relevant node. Further, create reference Partner Article (ptp_PartnerArticle) where the Source is the relevant node and the Target is the found Trade item (prd_TradeItem). Parent ID name for the Trade item (prd_TradeItem) equals the Parent ID name of the Article (prd_Article).
 *
 * Bindings:
 * dataProviderRef --> Data Provider (ref_DataProvider)
 * globalLocationNumberAtt -->Global Location Number (att_GlobalLocationNumber)
 * packagingUnitCaseObjectType --> Packaging Unit [Case] (prd_PackagingUnitCase)
 * packagingUnitPackObjcetType --> Packaging Unit [Pack] (prd_PackagingUnitPack)
 * packagingUnitPalletObjectType --> Packaging Unit [Pallet] (prd_PackagingUnitPallet)
 * globalTradeIdentificationNumberAtt --> Global Trade Identification Number (att_GlobalTradeIdentificationNumber)
 * tradeItemObjectType --> Trade item (prd_TradeItem)
 * partnerArticleRef --> Partner Article - Information Provider (ptp_PartnerArticle)
 *
 */
//retrieve Target of reference Data Provider
var article = bf_GetArticleFromPackagingUnit.evaluate({node: node});
var globalLocationNo;
var dataProviderReference;
if (article.queryReferences(ref_DataProvider).asList(1).size()>0) {
	dataProviderReference= article.queryReferences(ref_DataProvider).asList(1).get(0);
}
if (dataProviderReference) {
	var existingTIReference = node.queryReferences(ptp_PartnerArticle).asList(10);
	if (existingTIReference.size()>0) {
		log.info('Reference exists');
		existingTIReference.forEach(function(tiRef) {
			tiRef.delete();
		});
	}
	globalLocationNo = dataProviderReference.getTarget().getValue(att_GlobalLocationNumber.getID()).getSimpleValue();
}

if (globalLocationNo) {
		var gtin = node.getValue(att_GlobalTradeIdentificationNumber.getID()).getSimpleValue();
		if (gtin) {
		var condition = com.stibo.query.condition.Conditions;
		var home = manager.getHome(com.stibo.query.home.QueryHome);
		var querySpecification = home.queryFor(com.stibo.core.domain.Product).where(
		   condition.objectType(prd_TradeItem)
		   .and(condition.valueOf(att_GlobalTradeIdentificationNumber).eq(gtin))
		   .and(condition.valueOf(att_GlobalLocationNumber).eq(globalLocationNo))
		);
		//If trade item is found, create reference Global Trade Identification Numbers
		var result = querySpecification.execute().asList(10);
		if (result.size() > 0) {
			log.info('result found');
		  try {
			   node.createReference(result.get(0), ptp_PartnerArticle);
		   } catch (e) {
			   if (e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
				   log.info('Reference is present already  -->' + e);
			   } else {
				   throw (e);
			   }
		   }
		} else {
			log.info('result not found');
			//fetch the parent ID for trade item
			var parentID;
			var parentObjectType = article.getParent().getObjectType().getID();
			if (parentObjectType.equals(prd_ProductFamily.getID())) {
			  parentID = 'Partner' + article.getParent().getParent().getID();
			} else if (parentObjectType.equals(prd_ProductCategory.getID())) {
			  parentID = 'Partner' + article.getParent().getID();
			}
			log.info('parentID'+parentID);
			var idCondition = com.stibo.query.condition.Conditions.id();
			var querySpecificationToFindParent = home.queryFor(com.stibo.core.domain.Product).where(
			  idCondition.eq(parentID)
			);

			var parentResult = querySpecificationToFindParent.execute().asList(1);
			if (parentResult.size() > 0) {
				//create tradeItem
				var tradeItem = parentResult.get(0).createProduct(null, prd_TradeItem.getID());
				tradeItem.setName(node.getTitle());
				try {
					log.info("Creating trade item with GLN/GTIN " + globalLocationNo + gtin);
					tradeItem.getValue(att_GlobalLocationNumber.getID()).setSimpleValue(globalLocationNo);
					tradeItem.getValue(att_GlobalTradeIdentificationNumber.getID()).setSimpleValue(gtin);
				} catch (e) {
					throw 'Exception occured while setting the GTIN and global location number '+e;
				}
				if (node.queryReferences(ref_GlobalTradeIdentificationNumbers).asList(1).size()>0) {
					var gtin;
					node.queryReferences(ref_GlobalTradeIdentificationNumbers).forEach(function(gtinPUReference) {
						var target = gtinPUReference.getTarget();
						var primary = gtinPUReference.getValue(att_MainIndicator.getID()).getSimpleValue();
						if (primary == 'true') {
							tradeItem.createReference(target, ref_GlobalTradeIdentificationNumbers);
						}
						return true;
					});
				}
				if (article.queryReferences(ref_DataProvider).asList(1).size()>0) {
					var dataProv = article.queryReferences(ref_DataProvider).asList(1).get(0).getTarget();
					tradeItem.createReference(dataProv, ref_DataProvider);
				}

				node.createReference(tradeItem, ptp_PartnerArticle);
				}
			ba_PostEventToTIMS.execute(tradeItem);
		}
	   } else {
		log.info('global Trade Identification Number is not set for ' + node.getID());
	}
} else {
	var message = ('<br/>'+'<br/>'+'Global Location Number is not set on the Data Provider.'+'<br/>'+'Please request this information from the Supplier and, later, inform Functional Support.'+'<br/>'+'<br/>').bold();
	throw message;
}
}
/*===== business rule plugin definition =====
{
  "pluginId" : "ReferenceOtherBCBusinessCondition",
  "parameters" : [ {
    "id" : "ReferencedBC",
    "type" : "com.stibo.core.domain.businessrule.BusinessCondition",
    "value" : "ba_IsPLUPopulated"
  }, {
    "id" : "ValueWhenReferencedIsNA",
    "type" : "com.stibo.util.basictypes.TrueFalseParameter",
    "value" : "false"
  } ],
  "pluginType" : "Precondition"
}
*/
