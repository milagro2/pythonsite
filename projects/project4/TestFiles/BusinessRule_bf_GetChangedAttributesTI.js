/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "bf_GetChangedAttributesTI",
  "type" : "BusinessFunction",
  "setupGroups" : [ "brg_Functions" ],
  "name" : "Get Changed Attributes for Trade Item",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ ],
  "allObjectTypesValid" : true,
  "runPrivileged" : false,
  "onApprove" : "Never",
  "dependencies" : [ ]
}
*/
/*===== business rule plugin definition =====
{
  "pluginId" : "JavaScriptBusinessFunctionWithBinds",
  "binds" : [ {
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "AttributeGroupBindContract",
    "alias" : "atg_TIIArticle_VisualCheck",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeGroupImpl",
    "value" : "atg_TIIArticle_VisualCheck",
    "description" : null
  }, {
    "contract" : "AttributeGroupBindContract",
    "alias" : "atg_TIIPack_VisualCheck",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeGroupImpl",
    "value" : "atg_TIIPack_VisualCheck",
    "description" : null
  }, {
    "contract" : "AttributeGroupBindContract",
    "alias" : "atg_TIIArticle_AlwaysOverwrite",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeGroupImpl",
    "value" : "atg_TIIArticle_AlwaysOverwrite",
    "description" : null
  }, {
    "contract" : "AttributeGroupBindContract",
    "alias" : "atg_TIIPack_AlwaysOverwrite",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeGroupImpl",
    "value" : "atg_TIIPack_AlwaysOverwrite",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation",
  "functionReturnType" : "java.util.List<java.lang.String>",
  "functionParameterBinds" : [ {
    "contract" : "NodeBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : ""
  } ]
}
*/
exports.operation0 = function (manager,atg_TIIArticle_VisualCheck,atg_TIIPack_VisualCheck,atg_TIIArticle_AlwaysOverwrite,atg_TIIPack_AlwaysOverwrite,node) {
/*This functionality checks whether Trade Items have been updated in TIMS for a subset of attributes*/
 
//get attribute value from approved
function getAttributeValueFromApproved(attrID) {
    var attr;
    manager.executeInWorkspace("Approved", function(approvedManager) {
        var approvedNode = approvedManager.getProductHome().getProductByID(node.getID());
        if(approvedNode){
        	attr = approvedNode.getValue(attrID).getSimpleValue();
        }
    });
    return attr;
}

//Execution of functionality
var attributeIdSetHash = new java.util.HashSet();
var referenceIdSetHash = new java.util.HashSet();
var dataContainerTypeSetHash = new java.util.HashSet();

var attributeGroups = atg_TIIArticle_VisualCheck.getChildren().toArray();
for(var j in attributeGroups){
	var attributeGroup = attributeGroups[j];
	getObjectList(attributeGroup,attributeIdSetHash,referenceIdSetHash,dataContainerTypeSetHash);
}

var attributeGroupsPU = atg_TIIPack_VisualCheck.getChildren().toArray();
for(var y in attributeGroupsPU){
	var attributeGroupPU = attributeGroupsPU[y];
	getObjectList(attributeGroupPU,attributeIdSetHash,referenceIdSetHash,dataContainerTypeSetHash);
}

getObjectList(
    atg_TIIArticle_AlwaysOverwrite,
    attributeIdSetHash,
    referenceIdSetHash,
    dataContainerTypeSetHash
);
getObjectList(
    atg_TIIPack_AlwaysOverwrite,
    attributeIdSetHash,
    referenceIdSetHash,
    dataContainerTypeSetHash
);
log.info(attributeIdSetHash);
log.info(referenceIdSetHash);
log.info(dataContainerTypeSetHash);

var notificationString = new java.util.ArrayList();
fetchNonApprovedPartObject(node,notificationString);
log.info(notificationString);
return notificationString;

function getObjectList(attrGroup,attributeIdSet,referenceIdSet,dataContainerTypeSet) {
	//get attribute Ids present in group
	var groupAttributesArray = attrGroup.getAttributes().toArray();
	for(var x in groupAttributesArray){
		attributeIdSet.add(groupAttributesArray[x].getID());
	}
	//get reference Ids present in group

	var groupLinkTypeArray = attrGroup.getLinkTypes().toArray();
	for(var a in groupLinkTypeArray){
		referenceIdSet.add(groupLinkTypeArray[a].getID());
	}

	//get data containers Ids present in group	
	var getDataContainerTypesArray = attrGroup.getDataContainerTypes().toArray();
	for(var z in getDataContainerTypesArray){	
		dataContainerTypeSet.add(getDataContainerTypesArray[z].getID());
	}
}

function fetchNonApprovedPartObject(object,notifications){
	var nonApprovedObjects = object.getNonApprovedObjects().toArray();
	for(var i in nonApprovedObjects){
		if ((nonApprovedObjects[i] instanceof com.stibo.core.domain.partobject.ValuePartObject) 
			&& (attributeIdSetHash.contains(nonApprovedObjects[i].getAttributeID()))) {
			var name = manager.getAttributeHome().getAttributeByID(nonApprovedObjects[i].getAttributeID()).getTitle();
			var valueBefore = getAttributeValueFromApproved(nonApprovedObjects[i].getAttributeID());
			var valueAfter = node.getValue(nonApprovedObjects[i].getAttributeID()).getSimpleValue();
			notifications.add(name+": from '"+valueBefore+"' to '"+valueAfter+"'.\n");
		}
		else if ((nonApprovedObjects[i] instanceof com.stibo.core.domain.partobject.ClassificationReferencePartObject
				|| nonApprovedObjects[i] instanceof com.stibo.core.domain.partobject.ProductReferencePartObject
				|| nonApprovedObjects[i] instanceof com.stibo.core.domain.partobject.AssetReferencePartObject
				|| nonApprovedObjects[i] instanceof com.stibo.core.domain.partobject.EntityReferencePartObject
				|| nonApprovedObjects[i] instanceof com.stibo.core.domain.partobject.ReferencePartObject)
				&& (referenceIdSetHash.contains(nonApprovedObjects[i].getReferenceType()))) {
			var refName = manager.getReferenceTypeHome().getReferenceTypeByID(nonApprovedObjects[i].getReferenceType()).getTitle();
			notifications.add("The attribute value of "+refName+" has been changed\n");
		}
		else if ((nonApprovedObjects[i] instanceof com.stibo.core.domain.partobject.datacontainer.DataContainerPartObject) 
			&& (dataContainerTypeSetHash.contains(nonApprovedObjects[i].getDataContainerTypeID()))) {			
			notifications.add("The attribute value of "+nonApprovedObjects[i].getDataContainerTypeID()+" has been changed\n");
		}
	}
}
}