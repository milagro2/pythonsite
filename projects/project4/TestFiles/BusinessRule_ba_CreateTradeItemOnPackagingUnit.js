/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_CreateTradeItemOnPackagingUnit",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Create Trade Item object when a new Packaging Unit is initiated",
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
    "contract" : "BusinessActionBindContract",
    "alias" : "ba_PostEventToTIMS",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessActionImpl",
    "value" : "ba_PostEventToTIMS",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,manager,ref_DataProvider,att_GlobalLocationNumber,prd_PackagingUnitCase,prd_PackagingUnitPack,prd_PackagingUnitPallet,att_GlobalTradeIdentificationNumber,prd_TradeItem,ptp_PartnerArticle,prd_ProductFamily,prd_ProductCategory,ref_GlobalTradeIdentificationNumbers,ba_PostEventToTIMS) {
/*On the Article, retrieve Target of reference Data Provider (ref_DataProvider). 
 * On the target, retrieve attribute value for Global Location Number (att_GlobalLocationNumber). 
 * On the Article, retrieve children with object types Packaging Unit [Case] (prd_PackagingUnitCase), Packaging Unit [Pack] (prd_PackagingUnitPack) 
 * and Packaging Unit [Pallet] (prd_PackagingUnitPallet). On the children, retrieve attribute value Global Trade Identification Number (att_GlobalTradeIdentificationNumber).
 * Search for a Trade item (prd_TradeItem) objects where the concatenation of the children attribute value of Global Trade Identification Number 
 * (att_GlobalTradeIdentificationNumber) and the article reference Global Location Number (att_GlobalLocationNumber) is equal to the Trade Item Key (key_TradeItem).
 * If a Trade item (prd_TradeItem) object is found, create reference Partner Article (ptp_PartnerArticle) where the Source is the relevant child of the Article and the Target is the found Trade item (prd_TradeItem).
 * Else, create Trade item (prd_TradeItem) object where the Name is equal to the Name of the relevant child and the attribute value on the  Trade item (prd_TradeItem) of Global Trade Identification Number (att_GlobalTradeIdentificationNumber) equals to the attribute Global Trade Identification Number (att_GlobalTradeIdentificationNumber) on the relevant child. Further, create reference Partner Article (ptp_PartnerArticle) where the Source is the relevant child and the Target is the found Trade item (prd_TradeItem). Parent ID name for the Trade item (prd_TradeItem) equals the Parent ID name of the Article (prd_Article).
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

var globalLocationNo;
var dataProviderReference;
if(node.queryReferences(ref_DataProvider).asList(1).size()>0) {
	dataProviderReference= node.queryReferences(ref_DataProvider).asList(1).get(0);
}
if (dataProviderReference) {
    globalLocationNo = dataProviderReference.getTarget().getValue(att_GlobalLocationNumber.getID()).getSimpleValue();
}
var children = node.getChildren().toArray();
if (globalLocationNo) {
    for (var x in children) {
        var child = children[x];
        if (child.getObjectType().getID().equals(prd_PackagingUnitCase.getID())||
            child.getObjectType().getID().equals(prd_PackagingUnitPack.getID()) ||
            child.getObjectType().getID().equals(prd_PackagingUnitPallet.getID())) {
            	var gtin = child.getValue(att_GlobalTradeIdentificationNumber.getID()).getSimpleValue();
               if (gtin) {
               	var condition = com.stibo.query.condition.Conditions;
				var home = manager.getHome(com.stibo.query.home.QueryHome);
				var querySpecification = home.queryFor(com.stibo.core.domain.entity.Entity).where(
				   condition.objectType(prd_TradeItem)
				   .and(condition.valueOf(att_GlobalTradeIdentificationNumber).eq(gtin))
				   .and(condition.valueOf(att_GlobalLocationNumber).eq(globalLocationNo))
				);
				//If trade item is found, create reference Global Trade Identification Numbers
				var result = querySpecification.execute().asList(1);
				if (result.size() > 0) {
				  try {
				       child.createReference(result.get(0), ptp_PartnerArticle);
				   } catch (e) {
				       if (e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
				           log.info("Reference is present already  -->" + e);
				       } else {
				           throw (e);
				       }
				   }
				}else {
					//fetch the parent ID for trade item
					var parentID;
					var parentObjectType = node.getParent().getObjectType().getID();
					if (parentObjectType.equals(prd_ProductFamily.getID())) {
					  parentID = "Partner" + node.getParent().getParent().getID();
					} else if (parentObjectType.equals(prd_ProductCategory.getID())) {
					  parentID = "Partner" + node.getParent().getID();
					}
					log.info("parentID"+parentID);
					var idCondition = com.stibo.query.condition.Conditions.id();
					var querySpecificationToFindParent = home.queryFor(com.stibo.core.domain.Product).where(
					  idCondition.eq(parentID)
					);
					
					var parentResult = querySpecificationToFindParent.execute().asList(1);
					if (parentResult.size() > 0) {
						//create tradeItem
						var tradeItem = parentResult.get(0).createProduct(null, prd_TradeItem.getID());
						tradeItem.setName(child.getTitle());
						try{
							tradeItem.getValue(att_GlobalLocationNumber.getID()).setSimpleValue(globalLocationNo);
							tradeItem.getValue(att_GlobalTradeIdentificationNumber.getID()).setSimpleValue(gtin);
						}catch(e){
							throw "Exception occured while setting the GTIN and global location number "+e;
						}
						if(child.queryReferences(ref_GlobalTradeIdentificationNumbers).asList(1).size()>0){
							var gtin = child.queryReferences(ref_GlobalTradeIdentificationNumbers).asList(1).get(0).getTarget();							
							tradeItem.createReference(gtin, ref_GlobalTradeIdentificationNumbers);							
						}
						if(child.queryReferences(ref_DataProvider).asList(1).size()>0){
							var dataProv = child.queryReferences(ref_DataProvider).asList(1).get(0).getTarget();							
							tradeItem.createReference(dataProv, ref_DataProvider);							
						}	
											
						child.createReference(tradeItem, ptp_PartnerArticle);
                        }
                        ba_PostEventToTIMS.execute(tradeItem);
				}					 
               }else {
				log.info("global Trade Identification Number is not set for " + child.getID());
			}
		}   
    }                	

}else {
	throw "Global Location Number is not set"
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
