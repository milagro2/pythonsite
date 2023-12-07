/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_AddNewMappingExternalSubRegion",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Add new mapping for external sub region to sub region reference",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article" ],
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
    "alias" : "att_ExternalSubRegion",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ExternalSubRegion",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_SubRegion",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_SubRegion",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "ent_SubRegion",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "ent_SubRegion",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_ExternalSubRegionMapping",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ExternalSubRegionMapping",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_ProductActivityRegionDescription",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ProductActivityRegionDescription",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,ptp_PartnerArticle,att_ExternalSubRegion,ref_SubRegion,ent_SubRegion,att_ExternalSubRegionMapping,att_ProductActivityRegionDescription) {
/*If the attribute value External Sub Region Mapping (att_ExternalSubRegionMapping) does not contain the
 * External Sub Region (att_ExternalSubRegion) from the Trade Item, then add the value.
 * Bindings:
 * partnerArticleRef --> Partner Article - Information Provider (ptp_PartnerArticle)
 * externalSubRegionAtt --> External Sub Region (att_ExternalSubRegion)
 * subRegionRef -->Sub Region (ref_SubRegion)
 * subRegionObjectType --> Sub Region (ent_SubRegion)
 * externalSubRegionMappingAtt --> External Sub Region Mapping (att_ExternalSubRegionMapping)
 */

//For Article, retrieve the target Trade Item of reference Partner Article - Information Provider (ptp_PartnerArticle).
var references = node.getReferences(ptp_PartnerArticle).toArray();
var dcId = 'dct_ProductActivityRegion';
for (var x in references) {
    var tradeItem = references[x].getTarget();
    //For the target Trade Item, retrieve attribute value of External Sub Region (att_ExternalSubRegion).
    var dcs = tradeItem.getDataContainerByTypeID(dcId).getDataContainers().iterator();
    while (dcs.hasNext()) {
        var dc = dcs.next();
        var externalSubRegion = dc.getDataContainerObject().getValue(att_ProductActivityRegionDescription.getID()).getSimpleValue() || '';
        //For Article, retrieve the target Sub Region (ent_SubRegion) of reference Sub Region (ref_SubRegion).
        var subRegionReferences = node.getReferences(ref_SubRegion).toArray();
        if (subRegionReferences.length > 0) {
            //For the target Sub Region (ent_SubRegion) , retrieve attribute value of attribute External Sub Region Mapping (att_ExternalSubRegionMapping).
            var subRegioMapping = subRegionReferences[0].getTarget().getValue(att_ExternalSubRegionMapping.getID()).getValues().toArray();
            logger.info(subRegioMapping);
            var found = false;
            for (var y in subRegioMapping) {
            	logger.info(subRegioMapping[y].getSimpleValue());
                if (subRegioMapping[y].getSimpleValue().equals(externalSubRegion)) {
                    found = true;
                    break;
                }
            }
            //If External Sub Region (att_ExternalSubRegion) value is contained in the value of
            //External Sub Region Mapping (att_ExternalSubRegionMapping), end processing.
            if (!found) {
                //add External Sub Region (att_ExternalSubRegion) value to External Sub Region Mapping (att_ExternalSubRegionMapping.
                logger.info(externalSubRegion);
                subRegionReferences[0].getTarget().getValue(att_ExternalSubRegionMapping.getID()).addValue(externalSubRegion);
            }
        }
    }
}
}