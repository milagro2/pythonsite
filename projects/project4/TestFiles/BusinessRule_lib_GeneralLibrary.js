/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "lib_GeneralLibrary",
  "type" : "BusinessLibrary",
  "setupGroups" : [ "brg_Libraries" ],
  "name" : "General Library",
  "description" : null,
  "scope" : null,
  "validObjectTypes" : [ ],
  "allObjectTypesValid" : false,
  "runPrivileged" : false,
  "onApprove" : null,
  "dependencies" : [ ]
}
*/
/*===== business rule plugin definition =====
{
  "pluginId" : "JavaScriptBusinessLibrary",
  "binds" : [ ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/


/**********************************************************************************\
 ** Evaluate Attributes From AttributeGroup      						      **
 **                                                                              **
 ** Parameters                                                                   **
 ** node                               : current object                          **
 ** attributeGroup	                   : attribute group to be checked           **
 **                                                                              **
 **                                                                              **
\**********************************************************************************/
function evaluateAttributesFromAttributeGroup(node, attributeGroup){
	var attributes = attributeGroup.getAttributes().toArray();	
	for (var x in attributes) {
		var validObjectTypes = attributes[x].getValidForObjectTypes().toArray();
		for(var p in validObjectTypes){
			if(validObjectTypes[p].getID() == node.getObjectType().getID()){//because validity is not checked automatically, we need a validitycheck
				if(!node.getValue(attributes[x].getID()).getSimpleValue()){
					return false;//return false because at least one attribute is not filled
				}
			}
		}
	}
	return true;
}


/**********************************************************************************\
 ** Evaluate References From AttributeGroup      						   	 **
 **                                                                              **
 ** Parameters                                                                   **
 ** node                               : current object                          **
 ** attributeGroup	                   : attribute group to be checked           **
 **                                                                              **
 **                                                                              **
\**********************************************************************************/
function evaluateReferencesFromAttributeGroup(node, attributeGroup){
	var referenceTypes = attributeGroup.getLinkTypes().toArray();
	for (var x in referenceTypes) {
		if (referenceTypes[x].toString().indexOf('ClassificationProductLinkType') != -1) {
			if (node.getClassificationProductLinks(referenceTypes[x]).toArray().length == 0) {
				logger.info("Mandatory Classification(s) not filled");
				return false;
			}
		} else {
			if (node.queryReferences(referenceTypes[x]).asList(1).size() == 0) {
				logger.info("Mandatory References(s) not filled");
				return false;
			}
		}
	}
	return true;
}


/**********************************************************************************\
 ** Evaluate Data Container From AttributeGroup 						   	 **
 **                                                                              **
 ** Parameters                                                                   **
 ** node                               : current object                          **
 ** attributeGroup	                   : attribute group to be checked           **
 **                                                                              **
 **                                                                              **
\**********************************************************************************/
function evaluateDataContainerAttributes (node, attributeGroup) {    
     var nodeDataContainers = node.getDataContainers().toArray();//this items datacontainers
     var availableDataContainers = [];
     
     for (var x in nodeDataContainers) {
          if ((nodeDataContainers[x] instanceof com.stibo.core.domain.impl.datacontainer.FrontMultiDataContainerImpl && nodeDataContainers[x].getDataContainers().toArray().length != 0) ||
                (nodeDataContainers[x] instanceof com.stibo.core.domain.impl.datacontainer.FrontSingleDataContainerImpl && nodeDataContainers[x].getDataContainerObject() != null))  {
                     availableDataContainers.push (nodeDataContainers[x]);
          }
     }

	for (var dt in availableDataContainers){
		//logger.info("availableDataContainers: " + availableDataContainers[dt].getID());
		//var attributeGroupAttributes = node.getManager().getAttributeGroupHome().getAttributeGroupByID('atg_OIEPOS1SAPArticleDataMandatory').getAllAttributes().toArray();
		var attributeGroupAttributes = attributeGroup.getAttributes().toArray();
		var containerAttributes = availableDataContainers[dt].getDataContainerType().getValidDescriptionAttributes().toArray();
		var thisDataContainerRecords = availableDataContainers[dt].getDataContainerType();
		var containerRecords = availableDataContainers[dt].getDataContainers().toArray();

		for (var p in containerRecords){//process all datacontainer records
			for(var att in containerAttributes){//loop over the datacontainer attributes
				for (var mAtt in attributeGroupAttributes){//loop over the mandatory attributes
					if(containerAttributes[att].getID() == attributeGroupAttributes[mAtt].getID()){//if containerattribute = mandatoryattribute
						if(!containerRecords[p].getDataContainerObject().getValue(containerAttributes[att].getID()).getSimpleValue()){
							return false;
						}
					}
				}		
			}			
		}
     }
     return true;
}

/**********************************************************************************\
 ** Partial approve specific partTypes 								   	 **
 **                                                                              **
 ** Parameters                                                                   **
 ** approveNode                          : current object                   	 **
 ** partObjects	                  	 : array of id's that need to be approved**
 ** partType	                   		 : partType that needs to be approved    **
 ** log							 : logger                                **
 **                                                                              **
\**********************************************************************************/

function partiallyApproveObject(approveNode, partObjects, partType, log) {

    var partSet = new java.util.HashSet();
    var nonAppArr = approveNode.getNonApprovedObjects().toArray();

    for (var i = 0; i < nonAppArr.length; i++) {

        switch (String(partType)) {
            case "attributes":
                if (nonAppArr[i] instanceof com.stibo.core.domain.partobject.ValuePartObject) {

                    for (var j = 0; j < partObjects.length; j++) {

                        if ((partObjects[j]).equals(nonAppArr[i].getAttributeID())) {

                            partSet.add(nonAppArr[i]);
                        }
                    }
                }
                break;

            case "references":
                if (nonAppArr[i] instanceof com.stibo.core.domain.partobject.ReferencePartObject) {

                    for (var k = 0; k < partObjects.length; k++) {

                        if ((partObjects[k]).equals(nonAppArr[i].getReferenceType())) {

                            partSet.add(nonAppArr[i]);
                        }
                    }
                }
                break;

            case "parent":
                if (nonAppArr[i] instanceof com.stibo.core.domain.partobject.ParentPartObject) {

                    partSet.add(nonAppArr[i]);
                }
                break;

            case "classificationLinks":
                if (nonAppArr[i] instanceof com.stibo.core.domain.partobject.ClassificationLinkPartObject) {

                    for (var l = 0; l < partObjects.length; l++) {

                        if ((partObjects[l]).equals(nonAppArr[i].getLinkTypeID())) {

                            partSet.add(nonAppArr[i]);
                        }
                    }
                }
                break;

            case "name":
                if (nonAppArr[i] instanceof com.stibo.core.domain.partobject.NamePartObject) {

                    partSet.add(nonAppArr[i]);

                }
                break;

           case "datacontainer":
           
                 if (nonAppArr[i] instanceof com.stibo.core.domain.partobject.datacontainer.DataContainerPartObject) {
                    for (var m = 0; m < partObjects.length; m++) {
                    	
                        if ((partObjects[m]).equals(nonAppArr[i].getDataContainerTypeID())) {
                        	
                            partSet.add(nonAppArr[i]);
                        }
                    }
                }
                break;


            // to implement other part objects...
            default:
                log.info("unknown parttype: " + partType);
                break;

        }

    }

   if (partSet.size() > 0) {
   		
        try {
            approveNode.approve(partSet);
        } catch (error) {
            throw error;
        }
    }
}

function copyAttributesAndReferencesForGroup(source, target, attributeGroup, manager, log, bf_GetGlobalAttributesFromGroup, bf_GetDimensionAttributesFromGroup, bf_GetReferencesFromGroup, bf_GetDataContainersFromGroup, contextsToBeCopied, getKeyAttributesForDataContainerType){
	var globalAttributes = bf_GetGlobalAttributesFromGroup.evaluate({attributeGroup:attributeGroup});		
	for(var j=0; j < globalAttributes.size();j++){
		log.info("Checking attribute: "+globalAttributes.get(j).getID());
		if(globalAttributes.get(j).isMultiValued()){
			//handle multivalue attributes
			var multivalueList = new java.util.ArrayList();
			var articleValues = target.getValue(globalAttributes.get(j).getID()).getValues().toArray();
			for (var a in articleValues){
				multivalueList.add(articleValues[a].getSimpleValue());
			}
			var valueItr = source.getValue(globalAttributes.get(j).getID()).getValues().iterator();
			while(valueItr.hasNext()){
				var value = valueItr.next();
				if (!multivalueList.contains(value.getSimpleValue())){
					target.getValue(globalAttributes.get(j).getID()).addValue(value.getSimpleValue());
				}
//				partiallyApproveObject(target, [globalAttributes.get(j).getID()], "attributes", log) 
			}
			
		}else{
			var value = source.getValue(globalAttributes.get(j).getID()).getValue();
			var unit = source.getValue(globalAttributes.get(j).getID()).getUnit();
			if(value){
				log.info("Setting non multivalue attribute: "+globalAttributes.get(j).getID());
				target.getValue(globalAttributes.get(j).getID()).setValue(value,unit);
//				partiallyApproveObject(target, [globalAttributes.get(j).getID()], "attributes", log) 
			}
		}
	}
	
	//Copy all language dependent attribute values in all relevant contexts for the attributes which are in the group(s)
	var dimensionAttributes = bf_GetDimensionAttributesFromGroup.evaluate({attributeGroup:attributeGroup});
	for(var k=0; k < dimensionAttributes.size();k++){
		for(var context in contextsToBeCopied){
			manager.executeInContext(contextsToBeCopied[context],function(contextManager) {
				var contexttarget = contextManager.getProductHome().getProductByID(target.getID());
				var contextsource = contextManager.getProductHome().getProductByID(source.getID());
				log.info("Checking attribute " + dimensionAttributes.get(k).getID());
				if(dimensionAttributes.get(k).isMultiValued()){
					var multivalueList = new java.util.ArrayList();
					var articleValues = target.getValue(dimensionAttributes.get(k).getID()).getValues().toArray();
					for (var a in articleValues){
						multivalueList.add(articleValues[a].getSimpleValue());
					}
					var valueItr = source.getValue(dimensionAttributes.get(k).getID()).getValues().iterator();
					while(valueItr.hasNext()){
						var value = valueItr.next();
						if (!multivalueList.contains(value.getSimpleValue())){
							target.getValue(dimensionAttributes.get(k).getID()).addValue(value.getSimpleValue());
						}
//						partiallyApproveObject(target, [dimensionAttributes.get(k).getID()], "attributes", log) 
					}
				} else {
					var contextValue = contextsource.getValue(dimensionAttributes.get(k).getID()).getValue();
					var contextUnit = contextsource.getValue(dimensionAttributes.get(k).getID()).getUnit();
					if(contextValue){
						contexttarget.getValue(dimensionAttributes.get(k).getID()).setValue(contextValue,contextUnit);
//						partiallyApproveObject(contexttarget, [dimensionAttributes.get(k).getID()], "attributes", log) 
					}
				}				
			});
		}			
	}
	
	
	//References
	var references = bf_GetReferencesFromGroup.evaluate({attributeGroup:attributeGroup});
	log.info("References in group : "+ references);
	//delete existing references
		for(var j=0; j < references.size();j++){
			
		//create new references
		var sourceReferences = source.queryReferences(references.get(j)).forEach(function(tiRef){	
			log.info("Checking reference to target " + tiRef.getTarget());
			var refTarget = tiRef.getTarget();	
			var newRef;
			var refValid = false;
			var validForObjects = references.get(j).getValidForObjectTypes().toArray();
			log.info("Reference valid for " + validForObjects);
			for (var x in validForObjects) {
				if (target.getObjectType().equals(validForObjects[x])){
					log.info("Ref is valid for object type...");
					refValid = true;
				}
			}
			if(refValid){
				log.info("Ref is valid for object type...");
				try{
					var newRef= target.createReference(refTarget,tiRef.getReferenceType());
				}catch(e){
					if (e.javaException instanceof com.stibo.core.domain.reference.SingleReferenceConstraintException) {
						referencesCleared = false;
						if(!referencesCleared) {
							target.queryReferences(tiRef.getReferenceType()).forEach(function (articleReference){
								articleReference.delete();
								referencesCleared = true;
								return true;
							});
						}
						if(referencesCleared){
							var newRef= target.createReference(refTarget,tiRef.getReferenceType());				
						}
		 				log.info("Reference is already present for reference type "+ tiRef.getReferenceType().getID());
			 		}else if(e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException){
			 			log.info("Target already referenced for reference type "+ tiRef.getReferenceType().getID());
					}else{
		           		throw (e);
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
//						partiallyApproveObject(target, [tiRef.getReferenceType().getID()], "references", log);
					}
				}
			}
			return true;
		});			
	}

	//DataContainers
	var dataContainerTypes = bf_GetDataContainersFromGroup.evaluate({attributeGroup:attributeGroup});
	for(var j=0; j < dataContainerTypes.size();j++){	
		//Copy Data container
		copyDataContainersFromTo(source, target, dataContainerTypes.get(j), getKeyAttributesForDataContainerType, manager);
//		partiallyApproveObject(target, [dataContainerTypes.get(j).getID()], "datacontainer", log);			
	}		
}

function copyDataContainersFromTo (source, target, dataContainerType, getKeyAttributesForDataContainerType, manager) {
	var dcType = source.getDataContainerByTypeID(dataContainerType.getID());	
	//Check for data container type
	if(dcType instanceof com.stibo.core.domain.impl.datacontainer.FrontSingleDataContainerImpl){
		var sourceDataContainerObject = dcType.getDataContainerObject();
		if(sourceDataContainerObject){	
			 var targetDataContainerObject;
			 try{
			 	//create data container
			 	targetDataContainerObject = target.getDataContainerByTypeID(dataContainerType.getID()).createDataContainerObject(null);
			  }catch(e){
			  	//if data container uses key then exception will be thrown
			 	if (e.javaException instanceof  com.stibo.core.domain.datacontainertype.CreateDataContainerWithoutKeyValuesException) {
			 		//create data container using key
			 		targetDataContainerObject = createDataContainerWithKey(dataContainerType,sourceDataContainerObject,target,true,target, getKeyAttributesForDataContainerType, manager)			 	
			 		log.info(targetDataContainerObject+"<----------with key targetDataContainerObject");
			 	}else{
			 		throw e;
			 	}
			 }
			 if(targetDataContainerObject){
			 	//copy the values
			 	var values = sourceDataContainerObject.getValues().toArray();
				for (var y in values) {
					targetDataContainerObject.getValue(values[y].getAttribute().getID()).setSimpleValue(values[y].getSimpleValue());
				}
			 }
		}
	}else if(dcType instanceof com.stibo.core.domain.impl.datacontainer.FrontMultiDataContainerImpl){
		var sourceDataContainers = dcType.getDataContainers().toArray();
		//Iterate through all single data containers
		for (var x in sourceDataContainers) {
			var sourceDataContainerObject = sourceDataContainers[x].getDataContainerObject();	
			var targetDataContainerObject;
			try{
				//create data container using key
				targetDataContainerObject = target.getDataContainerByTypeID(dataContainerType.getID()).addDataContainer().createDataContainerObject(null);
			}catch(e){
			 	if (e.javaException instanceof  com.stibo.core.domain.datacontainertype.CreateDataContainerWithoutKeyValuesException) {
			 		//create data container using key
			 		targetDataContainerObject = createDataContainerWithKey(dataContainerType,sourceDataContainerObject,target,false,target, getKeyAttributesForDataContainerType, manager)			 	
			 	}else{
			 		throw e;
			 	}
			 }
			 if(targetDataContainerObject){
			 	var values = sourceDataContainerObject.getValues().toArray();
				for (var y in values) {
					targetDataContainerObject.getValue(values[y].getAttribute().getID()).setSimpleValue(values[y].getSimpleValue());
				}
			 }
		}				
	}		
}

//create data container using key
function createDataContainerWithKey(dataContainerType,sourceDataContainerObject,target,isSingleDataContainer,target, getKeyAttributesForDataContainerType, manager){
	//get the keys of data container
	var keyList = 	getKeyAttributesForDataContainerType.evaluate({dataContainerType:dataContainerType}).toArray();
	//Generate a key			 		
	var keyHome = manager.getHome(com.stibo.core.domain.datacontainerkey.keyhome.DataContainerKeyHome);
	var dataContainerBuilder = keyHome.getDataContainerKeyBuilder(dataContainerType.getID());
	if(dataContainerBuilder){
		for(var key in keyList){		
			if(keyList[key].getID().startsWith("ref")){
				var sourceDcReferences = sourceDataContainerObject.getDataContainerReferences(keyList[key]).toArray();
				for(var dcRef in sourceDcReferences) {
					dataContainerBuilder.withReferenceTarget(keyList[key].getID(), sourceDcReferences[dcRef].getTarget().getID());
				}							
			}else{
				dataContainerBuilder.withAttributeValue(keyList[key].getID(),sourceDataContainerObject.getValue(keyList[key].getID()).getSimpleValue());					
			}
		}
	}
	try{
		if(isSingleDataContainer){
			return target.getDataContainerByTypeID(dataContainerType.getID()).createDataContainerObjectWithKey(dataContainerBuilder.build());
		}else{
			return target.getDataContainerByTypeID(dataContainerType.getID()).addDataContainer().createDataContainerObjectWithKey(dataContainerBuilder.build());
		
		}
	}catch(e){
		if (e.javaException instanceof  com.stibo.core.domain.datacontainerkey.DataContainerUniqueKeyConstraintException) {
			//if keys values are already there get that data container
			//return keyHome.getDataContainerByKey(target,dataContainerType.getID(),dataContainerBuilder.build()).toArray()[0].getDataContainerObject();		 	
	 	}/*else{
	 		throw e;
	 	}*/
	}
}

/*===== business library exports - this part will not be imported to STEP =====*/
exports.evaluateAttributesFromAttributeGroup = evaluateAttributesFromAttributeGroup
exports.evaluateReferencesFromAttributeGroup = evaluateReferencesFromAttributeGroup
exports.evaluateDataContainerAttributes = evaluateDataContainerAttributes
exports.partiallyApproveObject = partiallyApproveObject
exports.copyAttributesAndReferencesForGroup = copyAttributesAndReferencesForGroup
exports.copyDataContainersFromTo = copyDataContainersFromTo
exports.createDataContainerWithKey = createDataContainerWithKey