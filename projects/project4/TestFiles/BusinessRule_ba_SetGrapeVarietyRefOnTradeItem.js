/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SetGrapeVarietyRefOnTradeItem",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Set Grape Variety Reference on Trade Item",
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
    "alias" : "ref_GrapeSpeciesCultivar",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_GrapeSpeciesCultivar",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_Sequence",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_Sequence",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "ent_GrapeSpeciesCultivar",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "ent_GrapeSpeciesCultivar",
    "description" : null
  }, {
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "EntityBindContract",
    "alias" : "GrapeSpeciesCultivar",
    "parameterClass" : "com.stibo.core.domain.impl.entity.FrontEntityImpl$$Generated$$12",
    "value" : "GrapeSpeciesCultivar",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,ref_GrapeSpeciesCultivar,att_Sequence,ent_GrapeSpeciesCultivar,manager,GrapeSpeciesCultivar) {
var dcType = node.getDataContainerByTypeID('dtc_GrapeVariatal');
var dataContainers = dcType.getDataContainers().toArray();
var referenceTargets = new java.util.ArrayList;
var referenceID;
var map = new java.util.TreeMap(java.util.Collections.reverseOrder());
//Check if there already are Grape Variety References
node.queryReferences(ref_GrapeSpeciesCultivar).forEach(function(reference) {
	referenceID = reference;
	referenceTargets.add(reference.getTarget().getID());
	return true;
});
//log.info(referenceTargets);
//Iterate through all single data containers
for (var x in dataContainers) {
	var grapeVariatal = dataContainers[x].getDataContainerObject().getValue('att_GrapeVariatal').getSimpleValue().toLowerCase();
	var grapeVariatalPercentage = parseInt(dataContainers[x].getDataContainerObject().getValue('att_GrapeVariatalPercentage').getSimpleValue());
	if (grapeVariatal && grapeVariatalPercentage) {
		log.info(grapeVariatal+' '+grapeVariatalPercentage);
	map.put(grapeVariatalPercentage+grapeVariatal, grapeVariatal);
	}
}
var keys = map.keySet().iterator();
var sequence = 0;
var targetID;
var grapeVarietyTarget;
var existingReference;

while (keys.hasNext()) {
	var key = keys.next();
	log.info(key);
	var grapeVarietalName = map.get(key);
	sequence = sequence+1;
	//log.info(grapeVarietalName);
	//Query for Grape Variety Entity
	var condition = com.stibo.query.condition.Conditions;
	var home = manager.getHome(com.stibo.query.home.QueryHome);
	var nameCondition = com.stibo.query.condition.Conditions.name();
	var querySpecification = home.queryFor(com.stibo.core.domain.entity.Entity).where(
         nameCondition.eq(grapeVarietalName).and(condition.objectType(ent_GrapeSpeciesCultivar)));
	var result = querySpecification.execute().asList(10);
	//log.info(result);
	if (result.size() > 0) {
		//log.info("Result found");
		var grapeSpecies = result.get(0);
		//log.info(grapeSpecies.getID());
		//Set Reference if none exist
		if (!referenceID) {
			try {
				var reference = node.createReference(grapeSpecies, ref_GrapeSpeciesCultivar);
				if (sequence) {
					reference.getValue(att_Sequence.getID()).setSimpleValue(sequence);
				}
			} catch (e) {
				if (e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
				log.info('Reference is present already  -->' + e);
				}
			}
		} else {
			//Delete existing References if different from Data Container and set new References values
			node.queryReferences(ref_GrapeSpeciesCultivar).forEach(function(reference) {
				if (!referenceTargets.contains(grapeSpecies.getID())) {
					reference.delete();
				}
				return true;
			});

			try {
				var reference = node.createReference(grapeSpecies, ref_GrapeSpeciesCultivar);
				if (sequence) {
					reference.getValue(att_Sequence.getID()).setSimpleValue(sequence);
				}
			} catch (e) {
				if (e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
				log.info('Reference is present already  -->' + e);
				}
			}
		}
	} else {
	//Create grape species if it doesn't exist and create Reference
		log.info('New GV');
		var grapeSpeciesObject = GrapeSpeciesCultivar.createEntity('', ent_GrapeSpeciesCultivar);
	 	grapeSpeciesObject.setName(grapeVarietalName);
		try {
			var reference = node.createReference(grapeSpeciesObject, ref_GrapeSpeciesCultivar);
			if (sequence) {
				reference.getValue(att_Sequence.getID()).setSimpleValue(sequence);
			}
			} catch (e) {
				if (e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
				log.info('Reference is present already  -->' + e);
				}
			}
	}
}
}