/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SetRegionAndSubRegionRef",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_SetValuesAndLinkes" ],
  "name" : "Set Region and SubRegion based on Provenance Statement",
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
    "contract" : "AttributeBindContract",
    "alias" : "att_ProvenanceStatement",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ProvenanceStatement",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_PlaceOfOrigin",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_PlaceOfOrigin",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_PlaceOfSourcing",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_PlaceOfSourcing",
    "description" : null
  }, {
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_SubRegion",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_SubRegion",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_ExternalSubRegionMapping",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ExternalSubRegionMapping",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "ent_SubRegion",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "ent_SubRegion",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "ent_Region",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "ent_Region",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,att_ProvenanceStatement,ref_PlaceOfOrigin,ref_PlaceOfSourcing,manager,ref_SubRegion,att_ExternalSubRegionMapping,ent_SubRegion,ent_Region) {
/*On trade item, retrieve attribute LoV value ID of att_CountryOfOrigin.
 * Set references ref_PlaceOfOrigin and ref_PlaceOfSourcing based on the LoV value ID of att_CountryOfOrigin.
 * Source of the references is the trade item, while the Target ID is "Country_"+ LoV value ID.
 *
 * Bindings:
 * countryOfOriginAtt --> Country of Origin (att_CountryOfOrigin)
 * placeOfOriginRef --> Place of Origin (ref_PlaceOfOrigin)
 * placeOfSourcingRef --> Place of Sourcing (ref_PlaceOfSourcing)
 */

//On trade item, retrieve attribute LoV value ID of att_CountryOfOrigin.
manager.executeInContext('nl-NL', function(contextManager) {
	var contextNode = contextManager.getProductHome().getProductByID(node.getID());
	var provenanceStatementsValue = contextNode.getValue(att_ProvenanceStatement.getID()).getSimpleValue();

	if (provenanceStatementsValue) {
		var provenanceStatements = provenanceStatementsValue.split('<multisep/>');
		for (var x in provenanceStatements) {
			//get the target object
			//log.info(provenanceStatements[x]);
			var condition = com.stibo.query.condition.Conditions;
			var home = manager.getHome(com.stibo.query.home.QueryHome);
			var result_found = false;
			var querySpecificationSubRegion = home.queryFor(com.stibo.core.domain.entity.Entity).where(
	                condition.objectType(ent_SubRegion)
	                .and(condition.valueOf(att_ExternalSubRegionMapping).eq(provenanceStatements[x])));
			var resultSubRegion = querySpecificationSubRegion.execute().forEach(function(subRegion) {
				//log.info(subRegion);
	          	result_found = true;
				try {
					//Set references ref_PlaceOfOrigin
					var subRegionReferences = node.queryReferences(ref_SubRegion).asList(1);
					if (subRegionReferences.size()>0 && subRegionReferences.get(0).getTarget().getID()!=subRegion.getID()) {
						//placeOfOriginRef doesn't allow multiple reference.
						subRegionReferences.get(0).delete();
						node.createReference(subRegion, ref_SubRegion);
					}
				} catch (e) {
					throw 'Error while creating the Place of Origin (ref_PlaceOfOrigin) or Place of Sourcing (ref_SubRegion) references'+ e.javaException.getMessage();
				}
				return true;
			});
			var querySpecificationRegion = home.queryFor(com.stibo.core.domain.entity.Entity).where(
	                condition.objectType(ent_Region)
	                .and(condition.valueOf(att_ExternalSubRegionMapping).eq(provenanceStatements[x])));
			var resultRegion = querySpecificationRegion.execute().forEach(function(region) {
				//log.info(region);
	          	result_found = true;
				try {
					//Set references ref_PlaceOfOrigin
					var originRef = node.queryReferences(ref_PlaceOfOrigin).asList(1);
					if (originRef.size()>0 && originRef.get(0).getTarget().getID()!=region.getID()) {
						//placeOfOriginRef doesn't allow multiple reference.
						originRef.get(0).delete();
						node.createReference(region, ref_PlaceOfOrigin);
					}
				} catch (e) {
					throw 'Error while creating the Place of Origin (ref_PlaceOfOrigin) or Place of Sourcing (ref_PlaceOfOrigin) references'+ e.javaException.getMessage();
				}
				try {
					//Set references ref_PlaceOfOrigin
					var sourcingRef = node.queryReferences(ref_PlaceOfSourcing).asList(1);
					if (sourcingRef.size()>0 && sourcingRef.get(0).getTarget().getID()!=region.getID()) {
						//placeOfOriginRef doesn't allow multiple reference.
						sourcingRef.get(0).delete();
						node.createReference(region, ref_PlaceOfSourcing);
					}
				} catch (e) {
					throw 'Error while creating the Place of Origin (ref_PlaceOfOrigin) or Place of Sourcing (ref_PlaceOfSourcing) references'+ e.javaException.getMessage();
				}
				return true;
			});
		}
	}
});
}