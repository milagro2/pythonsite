/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SetVisualValidationRequiredLog",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_SetValuesAndLinkes" ],
  "name" : "Set Visual Validation Required Log",
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
    "alias" : "atg_WFVisualValidationRequired",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeGroupImpl",
    "value" : "atg_WFVisualValidationRequired",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_InformationToBeValidated",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_InformationToBeValidated",
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
exports.operation0 = function (node,atg_WFVisualValidationRequired,att_InformationToBeValidated,manager) {
/*This functionality sets the changes between the main workspace and the approve workspace, for the attributes,
 * references or data containers listed in the specific group
 * Bindings:
 * visualValidationAttributeGroup --> Visual Validation Required (atg_WFVisualValidationRequired)
 * informationToBeValidatedAtt --> Information To Be Validated (att_InformationToBeValidated)
 */
//get attribute Ids present in group
function getAttributeValueFromApproved(attrID) {
    var attr;
    manager.executeInWorkspace('Approved', function(approvedManager) {
        var approvedNode = approvedManager.getProductHome().getProductByID(node.getID());
        attr = approvedNode.getValue(attrID).getSimpleValue();
    });
    return attr;
}
var attributeIdSet = new java.util.HashSet();
var groupAttributesArray = atg_WFVisualValidationRequired.getAttributes().toArray();
for (var x in groupAttributesArray) {
	attributeIdSet.add(groupAttributesArray[x].getID());
}
log.info(attributeIdSet);
//get reference Ids present in group
var referenceIdSet = new java.util.HashSet();
var groupLinkTypeArray = atg_WFVisualValidationRequired.getLinkTypes().toArray();
for (var y in groupLinkTypeArray) {
	referenceIdSet.add(groupLinkTypeArray[y].getID());
}

//get data containers Ids present in group
var dataContainerTypeSet = new java.util.HashSet();
var getDataContainerTypesArray = atg_WFVisualValidationRequired.getDataContainerTypes().toArray();
for (var z in getDataContainerTypesArray) {
	dataContainerTypeSet.add(getDataContainerTypesArray[z].getID());
}
var notificationString = new java.lang.StringBuilder('');
//notificationString.append("Data for the node:"+ node.getTitle()+"\n");
fetchNonApprovedPartObject(node,notificationString);
var children = node.getChildren().toArray();
for (var c in children) {
//	notificationString.append("Data for the node:"+ children[c].getTitle()+"\n");
	fetchNonApprovedPartObject(children[c],notificationString);
}
log.info(notificationString);
if (notificationString!= '' && notificationString!= null) {
node.getValue(att_InformationToBeValidated.getID()).addValue(notificationString.toString());
}

function fetchNonApprovedPartObject(object,notifications) {
	var nonApprovedObjects = object.getNonApprovedObjects().toArray();
	for (var i in nonApprovedObjects) {
		if ((nonApprovedObjects[i] instanceof com.stibo.core.domain.partobject.ValuePartObject) &&
			(attributeIdSet.contains(nonApprovedObjects[i].getAttributeID()))) {
			var name = manager.getAttributeHome().getAttributeByID(nonApprovedObjects[i].getAttributeID()).getTitle();
			var valueBefore = getAttributeValueFromApproved(nonApprovedObjects[i].getAttributeID());
			var valueAfter = node.getValue(nonApprovedObjects[i].getAttributeID()).getSimpleValue();
			notifications.append(name+': from \''+valueBefore+'\' to \''+valueAfter+'\'.\n');
		} else if ((nonApprovedObjects[i] instanceof com.stibo.core.domain.partobject.ClassificationReferencePartObject ||
				nonApprovedObjects[i] instanceof com.stibo.core.domain.partobject.ProductReferencePartObject ||
				nonApprovedObjects[i] instanceof com.stibo.core.domain.partobject.AssetReferencePartObject ||
				nonApprovedObjects[i] instanceof com.stibo.core.domain.partobject.EntityReferencePartObject ||
				nonApprovedObjects[i] instanceof com.stibo.core.domain.partobject.ReferencePartObject) &&
				(referenceIdSet.contains(nonApprovedObjects[i].getReferenceType()))) {
			var refName = manager.getReferenceTypeHome().getReferenceTypeByID(nonApprovedObjects[i].getReferenceType()).getTitle();
			notifications.append('The attribute value of '+refName+' has been changed\n');
		} else if ((nonApprovedObjects[i] instanceof com.stibo.core.domain.partobject.datacontainer.DataContainerPartObject) &&
			(dataContainerTypeSet.contains(nonApprovedObjects[i].getDataContainerTypeID()))) {
			notifications.append('The attribute value of '+nonApprovedObjects[i].getDataContainerTypeID()+' has been changed\n');
		}
	}
}
}