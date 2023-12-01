/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_MapExtSubRegionToSubRegionRef",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Map External SubRegion To SubRegion Reference",
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
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_SubRegion",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_SubRegion",
    "description" : null
  }, {
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_ProductActivityRegionDescription",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ProductActivityRegionDescription",
    "description" : null
  } ],
  "messages" : [ {
    "variable" : "errorMessage",
    "message" : "The external sub region of the trade item is {value}. No matching SubRegion has been found. Please select one manually from the available list",
    "translations" : [ {
      "language" : "nl",
      "message" : "De externe subregio van het trade item is {value}, er is geen overeenkomende subregio gevonden. Selecteer er handmatig één."
    } ]
  } ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,ptp_PartnerArticle,att_ExternalSubRegion,ent_SubRegion,att_ExternalSubRegionMapping,ref_SubRegion,manager,att_ProductActivityRegionDescription,errorMessage) {
/*When a Sub Region is added for the Trade Item a reference needs to be created between the Article and the SubRegion.
 * Bindings:
 * partnerArticleRef --> Partner Article - Information Provider (ptp_PartnerArticle)
 * externalSubRegionAtt --> External Sub Region (att_ExternalSubRegion)
 * subRegionObjectType --> Sub Region (ent_SubRegion)
 * externalSubRegionMappingAtt --> External Sub Region Mapping (att_ExternalSubRegionMapping)
 * subRegionRef --> Sub Region (ref_SubRegion)
 */
//For Article, retrieve the target Trade Item of reference Partner Article - Information Provider (ptp_PartnerArticle).
var references = node.getReferences(ptp_PartnerArticle).toArray();
var dcId = 'dct_ProductActivityRegion';
for (var x in references) {
//For the target Trade Item, retrieve attribute value of External Sub Region (att_ExternalSubRegion).
    var tradeItem = references[x].getTarget();
    var dcs = tradeItem.getDataContainerByTypeID(dcId).getDataContainers().iterator();
    while (dcs.hasNext()) {
        var dc = dcs.next();
        var externalSubRegion = dc.getDataContainerObject().getValue(att_ProductActivityRegionDescription.getID()).getSimpleValue() || '';
        if (externalSubRegion == '') {
continue;
}
        //If External Sub Region (att_ExternalSubRegion) has a value, search for Sub Region (ent_SubRegion), an object
        // where the value of attribute External Sub Region Mapping (att_ExternalSubRegionMapping) matches External Sub Region (att_ExternalSubRegion).
        var condition = com.stibo.query.condition.Conditions;
        var home = manager.getHome(com.stibo.query.home.QueryHome);
        var querySpecification = home.queryFor(com.stibo.core.domain.entity.Entity).where(
                condition.objectType(ent_SubRegion)
                .and(condition.valueOf(att_ExternalSubRegionMapping).eq(externalSubRegion)));
        var result_found = false;
        var result = querySpecification.execute().forEach(function (subRegion) {
            result_found = true;
            /*If a Sub Region (ent_SubRegion) is found, create reference Sub Region (ref_SubRegion),
             * where the source is the Article and the target is the Sub Region (ent_SubRegion).
             * If a reference already exists and the target is different from the found Sub Region (ent_SubRegion),
             * remove existing reference and create a new reference with the found Sub Region (ent_SubRegion).
             */
            var subRegionReferences = node.getReferences(ref_SubRegion);
            var refExist = false;
            if (subRegionReferences.size() > 0) {
                if (!subRegionReferences.get(0).getTarget().getID().equals(subRegion.getID())) {
                    subRegionReferences.get(0).delete();
                } else {
                    refExist = true;
                }
            }
            if (!refExist) {
                node.createReference(subRegion, ref_SubRegion);
            }
            return true;
        });
        if (!result_found && node.getReferences(ref_SubRegion).size() == 0) {
            var error = new errorMessage();
            error.value = externalSubRegion;
            throw error;
        }
    }
}
}