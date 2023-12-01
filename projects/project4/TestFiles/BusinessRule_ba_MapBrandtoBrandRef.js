/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_MapBrandtoBrandRef",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Map Brand To Brand Reference",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_TradeItem" ],
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
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ptp_PartnerArticle",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ptp_PartnerArticle",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_BrandName",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_BrandName",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "ast_Brand",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "ast_Brand",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_ExternalBrandMapping",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ExternalBrandMapping",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_Brand",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_Brand",
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
exports.operation0 = function (node,ptp_PartnerArticle,att_BrandName,ast_Brand,att_ExternalBrandMapping,ref_Brand,manager) {
/*When a Sub Region is added for the Trade Item a reference needs to be created between the Article and the SubRegion.
 * Bindings:
 * partnerArticleRef --> Partner Article - Information Provider (ptp_PartnerArticle)
 * externalSubRegionAtt --> External Sub Region (att_ExternalSubRegion)
 * subRegionObjectType --> Sub Region (ent_SubRegion)
 * externalSubRegionMappingAtt --> External Sub Region Mapping (att_ExternalSubRegionMapping)
 * subRegionRef --> Sub Region (ref_SubRegion)
 */
//For Article, retrieve the target Trade Item of reference Partner Article - Information Provider (ptp_PartnerArticle).
var brandName= node.getValue('att_BrandName').getSimpleValue();
if (brandName) {
		/*search for entity with brand name(att_name)*/
		var condition = com.stibo.query.condition.Conditions;
	     var home = manager.getHome(com.stibo.query.home.QueryHome);
	     var querySpecification = home.queryFor(com.stibo.core.domain.Asset).where(
	                condition.objectType(ast_Brand)
	                .and(condition.valueOf(att_ExternalBrandMapping).eq(brandName)));
	     var result_found = false;
	     var result = querySpecification.execute().forEach(function (brandresult) {
	         result_found = true;

		/*If a brand (ast_Brand) is found, create reference ref_brand (ref_brand), */
	            var brandReferences = node.queryReferences(ref_Brand).asList(100);
	            var refExist = false;
	            if (brandReferences.size() > 0) {
	                if (!brandReferences.get(0).getTarget().getID().equals(brandresult.getID())) {
	                    brandReferences.get(0).delete();
	                } else {
	                    refExist = true;
	                }
	            }
	            if (!refExist) {
	                node.createReference(brandresult, ref_Brand);
	            }
	            return true;
	        });
}
}