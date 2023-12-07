/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SetAwardReferencesBasedOnDC",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_SetValuesAndLinkes" ],
  "name" : "Set Award references based on data container",
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
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_Awards",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_Awards",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_AwardCode",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_AwardCode",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "ast_Award",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "ast_Award",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_AwardScore",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_AwardScore",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_Vintage",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_Vintage",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_VintageDescription",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_VintageDescription",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,manager,ref_Awards,att_AwardCode,ast_Award,att_AwardScore,att_Vintage,att_VintageDescription) {
/*For each of the data container of type 'dct_Awards'
 * Search for the award asset object type using the award code attribute value and the key 'key_AwardCodeKey'
 * Search for the data container of type 'dct_GallAwards' on the trade item. Data Container Key = Vintage + Award asset reference
 * If the data container is not found, then create the data container between on trade item
 * Set the following metadata elements
 * Award score from the data container
 * Vintage from the trade item
 * Set reference between data container and award asset
 *
 *
 * Bindings:
 * awardsRef --> Awards (ref_Awards)
 * awardCodeAtt --> Award code (att_AwardCode)
 * awardObjectType --> Award (ast_Award)
 * awardScoreAtt --> awardScoreAtt
 * vintageAtt --> vintageAtt
 * vintageDescriptionAtt --> vintageDescriptionAtt
 */
var vintage = node.getValue(att_Vintage.getID()).getSimpleValue();
//get the data container
var dataContainers = node.getDataContainerByTypeID('dct_Awards').getDataContainers();
var datContainerIterator = dataContainers.iterator();
while (datContainerIterator.hasNext()) {
    var singleDataContainer = datContainerIterator.next();
    var awardCode = singleDataContainer.getDataContainerObject().getValue(att_AwardCode.getID()).getSimpleValue();
    var awardScore = singleDataContainer.getDataContainerObject().getValue(att_AwardScore.getID()).getSimpleValue();

    //Search for the award asset object type
    var condition = com.stibo.query.condition.Conditions;
    var home = manager.getHome(com.stibo.query.home.QueryHome);
    var querySpecification = home.queryFor(com.stibo.core.domain.Asset).where(
        condition.objectType(ast_Award)
        .and(condition.valueOf(att_AwardCode).eq(awardCode)));

    var result = querySpecification.execute().forEach(function(award) {
	   if (vintage) {
	        var found = false;
	        var gallAwardDCs = node.getDataContainerByTypeID('dct_GallAwards').getDataContainers();
	        var gallAwardDCsIterator = gallAwardDCs.iterator();
	        while (gallAwardDCsIterator.hasNext()) {
	            var singlegallAwardDC = gallAwardDCsIterator.next();
	            var gallAwardVintage = singlegallAwardDC.getDataContainerObject().getValue(att_VintageDescription.getID()).getSimpleValue();
	            var gallAwardRef = singlegallAwardDC.getDataContainerObject().getDataContainerReferences(ref_Awards).toArray();
	            for (var i in gallAwardRef) {
	                var target = gallAwardRef[i].getTarget();
	                if (target.getID().equals(award.getID()) && gallAwardVintage.equals(vintage)) {
	                    found = true;
	                    if (awardScore) { //Set this information on the data container (same attribute ID)
	                        singlegallAwardDC.getDataContainerObject().getValue(att_AwardScore.getID()).setSimpleValue(awardScore);
	                    }
	                }
	            }
	        }

	        //if not exist create a new data container
	        if (!found) {
	            var keyHome = manager.getHome(com.stibo.core.domain.datacontainerkey.keyhome.DataContainerKeyHome);
	            var dataContainerBuilder = keyHome.getDataContainerKeyBuilder('dct_GallAwards');
	            dataContainerBuilder.withAttributeValue(att_VintageDescription.getID(), vintage);
	            dataContainerBuilder.withReferenceTarget('ref_Awards', award.getID());
	            var key = dataContainerBuilder.build();
	            var newDC = node.getDataContainerByTypeID('dct_GallAwards').addDataContainer().createDataContainerObjectWithKey(key);
	            newDC.getValue(att_AwardScore.getID()).setSimpleValue(awardScore);
	        }
	   }
        return true;
    });
}
}