/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_CopyTIMSUpdateValues",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Copy TIMS Update Values",
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
    "contract" : "AttributeGroupBindContract",
    "alias" : "atg_TIIArticle_AlwaysOverwriteCreate",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeGroupImpl",
    "value" : "atg_TIIArticle_AlwaysOverwriteCreate",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_TIIVisualCheckGroupArticle",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_TIIVisualCheckGroupArticle",
    "description" : null
  }, {
    "contract" : "BusinessFunctionBindContract",
    "alias" : "bf_GetDimensionAttributesFromGroup",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>bf_GetDimensionAttributesFromGroup</BusinessFunction>\n</BusinessFunctionReference>\n",
    "description" : null
  }, {
    "contract" : "BusinessFunctionBindContract",
    "alias" : "bf_GetGlobalAttributesFromGroup",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>bf_GetGlobalAttributesFromGroup</BusinessFunction>\n</BusinessFunctionReference>\n",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ptp_PartnerArticle",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ptp_PartnerArticle",
    "description" : null
  }, {
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "BusinessFunctionBindContract",
    "alias" : "bf_GetAllObjectsForAnArticle",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>bf_GetAllObjectsForAnArticle</BusinessFunction>\n</BusinessFunctionReference>\n",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,atg_TIIArticle_AlwaysOverwriteCreate,att_TIIVisualCheckGroupArticle,bf_GetDimensionAttributesFromGroup,bf_GetGlobalAttributesFromGroup,ptp_PartnerArticle,manager,bf_GetAllObjectsForAnArticle) {
var contextsToBeCopied = ['NL'];
var tradeItemRef = node.queryReferences(ptp_PartnerArticle).asList(100);

//get all the attribute groups
var attributeGroups = new java.util.ArrayList();
attributeGroups.add(atg_TIIArticle_AlwaysOverwriteCreate);
var visualCheckAttributeValues = node.getValue(att_TIIVisualCheckGroupArticle.getID()).getValues().toArray();
for(var attGrp in visualCheckAttributeValues){
	var attrGroup = manager.getAttributeGroupHome().getAttributeGroupByID(visualCheckAttributeValues[attGrp].getID());
	attributeGroups.add(attrGroup);
}

var allObjects = bf_GetAllObjectsForAnArticle.evaluate({"node" : node});
allObjects.add(node);

allObjects = allObjects.toArray();

for(var i in allObjects) {
	allObjects[i].queryReferences(ptp_PartnerArticle).forEach(function (tradeItemRef){
		var tradeItem = tradeItemRef.getTarget();
		var dcType = tradeItem.getDataContainerByTypeID("dct_TIMSUpdateLog");	
		var sourceDataContainers = dcType.getDataContainers().toArray();
		//Iterate through all single data containers
		for (var x in sourceDataContainers) {
			var sourceDataContainerObject = sourceDataContainers[x].getDataContainerObject();	
			var compType = sourceDataContainerObject.getValue("att_ComponentType").getSimpleValue();
			if(compType == "Attribute"){
				var attribute = manager.getAttributeHome().getAttributeByID(sourceDataContainerObject.getValue("att_ComponentID").getSimpleValue());
				var validForObjects = attribute.getValidForObjectTypes().toArray();
				for (var x in validForObjects) {
					//Article...
					if (allObjects[i].getObjectType().equals(validForObjects[x])) {
						log.info("Attribute "+ sourceDataContainerObject.getValue("att_ComponentID").getSimpleValue() + " for " + allObjects[i].getObjectType().getID());
						if(attribute.isMultiValued()){
							//handle multivalue attributes
							var multivalueList = new java.util.ArrayList();
							var articleValues = allObjects[i].getValue(attribute.getID()).getValues().toArray();
							for (var a in articleValues){
								multivalueList.add(articleValues[a].getSimpleValue());
							}
							var valueItr = tradeItem.getValue(attribute.getID()).getValues().iterator();
							while(valueItr.hasNext()){
								var value = valueItr.next();
								if (!multivalueList.contains(value.getSimpleValue())){
									allObjects[i].getValue(attribute.getID()).addValue(value.getSimpleValue());
								}
							}
							
						}else{
							var value = tradeItem.getValue(attribute.getID()).getValue();
							var unit = tradeItem.getValue(attribute.getID()).getUnit();
							if(value){
								allObjects[i].getValue(attribute.getID()).setValue(value,unit);
							}
						}
					}
				}
			}

			if(compType == "Reference") {
				var reference = manager.getReferenceHome().getReferenceByID(sourceDataContainerObject.getValue("att_ComponentID").getSimpleValue());
				var validForObjects = reference.getValidForObjectTypes().toArray();
				for (var x in validForObjects) {
					if (allObjects[i].getObjectType().equals(validForObjects[x])) {
						log.info("Reference "+ sourceDataContainerObject.getValue("att_ComponentID").getSimpleValue() + " for " + allObjects[i].getObjectType().getID());
							var tradeItemReferences = tradeItem.queryReferences(reference).forEach(function(tiRef){			
							var target = tiRef.getTarget();
							var newRef;
							for (var x in validForObjects) {
								if (allObjects[i].getObjectType().equals(validForObjects[x])){
									//Remove current ref
									allObjects[i].queryReferences(reference).forEach(function (articleReference){
										articleReference.delete();
										return true;
									});
									
									try{
										newRef= allObjects[i].createReference(target,tiRef.getReferenceType());
										log.info(newRef);
									}catch(e){
										if (e.javaException instanceof com.stibo.core.domain.reference.SingleReferenceConstraintException) {					
							 				log.info("Reference is already present for reference type "+ tiRef.getReferenceType().getID());
								 		}else if(e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException){
								 			log.info("Target already referenced for reference type "+ tiRef.getReferenceType().getID());
										}else{
							           		throw (e);
								 		}
									}
								}
							}
							if(newRef){			
								var value = tiRef.getValues().toArray();
								for(var val in value){
									var attributeId = value[val].getAttribute().getID();
									var attributeValue = tiRef.getValue(attributeId).getValue();
									if(attributeValue){
										newRef.getValue(attributeId).setValue(attributeValue);
									}
								}
							}
							return true;
						});	
					}
				}
			}
		}	
		return true;
	});
}
}