/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_GenCopyDataContainersForPackUnit",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_CopyTradeItem" ],
  "name" : "Copy Data Containers for Packaging Unit",
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
    "contract" : "AttributeGroupBindContract",
    "alias" : "alwaysCopyAttributeGroup",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeGroupImpl",
    "value" : "atg_TIIPack_AlwaysOverwrite",
    "description" : null
  }, {
    "contract" : "BusinessFunctionBindContract",
    "alias" : "getDimensionAttributesFromGroup",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>bf_GetDimensionAttributesFromGroup</BusinessFunction>\n</BusinessFunctionReference>\n",
    "description" : null
  }, {
    "contract" : "BusinessFunctionBindContract",
    "alias" : "getGlobalAttributesFromGroup",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>bf_GetGlobalAttributesFromGroup</BusinessFunction>\n</BusinessFunctionReference>\n",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "tradeItemLinkReferenceType",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ptp_PartnerArticle",
    "description" : null
  }, {
    "contract" : "BusinessFunctionBindContract",
    "alias" : "getKeyAttributesForDataContainerType",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>bf_GetKeyAttributesForDataContainerType</BusinessFunction>\n</BusinessFunctionReference>\n",
    "description" : null
  }, {
    "contract" : "BusinessFunctionBindContract",
    "alias" : "getDataContainerFromGroup",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>bf_GetDataContainersFromGroup</BusinessFunction>\n</BusinessFunctionReference>\n",
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
exports.operation0 = function (node,alwaysCopyAttributeGroup,getDimensionAttributesFromGroup,getGlobalAttributesFromGroup,tradeItemLinkReferenceType,getKeyAttributesForDataContainerType,getDataContainerFromGroup,manager) {
/* Copy the data containers from the trade item to the packaging unit including all the values in the data container
 *  
 *  The functionality copies the values from the trade item linked to the packaging unit through the reference tradeItemLinkReference.
 *  
 *  Copy all data containers which are in the group(s)
 *  1. Attribute group alwaysCopyAttributeGroup
 *  2. The attribute groups stated in the value of the attribute visualCheckAttributeGroupAttribite, based on the LOV value ID
 *  Bindings:
 *  alwaysCopyAttributeGroup --> Article - Always Overwrite (atg_TIIArticle_AlwaysOverwrite)
 *  visualCheckAttributeGroupAttribute --> Trade Item Information Groups (Article) (att_TIIVisualCheckGroupArticle)
 *  getDataContainerFromGroup --> Get Data Containers from Group (bf_GetDataContainersFromGroup)
 *  tradeItemLinkReferenceType --> Partner Article - Information Provider (ptp_PartnerArticle)
 *  getKeyAttributesForDataContainerType-->Get Key Attributes For Data Container Type (bf_GetKeyAttributesForDataContainerType)
 */

//get all the attribute groups
var attributeGroups = new java.util.ArrayList();
attributeGroups.add(alwaysCopyAttributeGroup);
node.queryReferences(tradeItemLinkReferenceType).forEach(function (tradeItemRef){
	var tradeItem = tradeItemRef.getTarget();	
	for(var i=0; i < attributeGroups.size();i++){
		//Copy all global attribute values
		var dataContainerTypes = getDataContainerFromGroup.evaluate({attributeGroup:alwaysCopyAttributeGroup});						
		for(var j=0; j < dataContainerTypes.size();j++){	
			//Copy Data container	
			copyDataContainersFromTo(tradeItem, node, dataContainerTypes.get(j));			
		}		
	}	
	return true;
});

function copyDataContainersFromTo(source, target, dataContainerType) {
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
			 		targetDataContainerObject = createDataContainerWithKey(dataContainerType,sourceDataContainerObject,target,true,target)			 	
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
			 		targetDataContainerObject = createDataContainerWithKey(dataContainerType,sourceDataContainerObject,target,false,target)			 	
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
};

//create data container using key
function createDataContainerWithKey(dataContainerType,sourceDataContainerObject,target,isSingleDataContainer,target){
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
	 	}else{
	 		throw e;
	 	}
	}
};
}