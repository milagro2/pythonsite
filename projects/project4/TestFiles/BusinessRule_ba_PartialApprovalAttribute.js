/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_PartialApprovalAttribute",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Partial Approval Attribute",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article", "prd_BundleArticle", "prd_GiftBoxArticle", "prd_PackagingUnitCase", "prd_PackagingUnitEach", "prd_PackagingUnitPack", "prd_PackagingUnitPallet" ],
  "allObjectTypesValid" : false,
  "runPrivileged" : false,
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
    "alias" : "atg_PartialApprove",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeGroupImpl",
    "value" : "atg_PartialApprove",
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
exports.operation0 = function (node,atg_PartialApprove,manager) {
/*var parts_not_approved = node.getNonApprovedObjects();
var parts_itr = parts_not_approved.iterator();
while (parts_itr.hasNext()) {
	var parts_object = parts_itr.next();
	if (parts_object.toString().indexOf('ValuePartObject') != -1) {//Only consider attributes
		if (atg_PartialApprove.getID() != String(parts_object.getAttributeID())) {//Only consider Attributes in the specific attribute group
			parts_itr.remove();
			continue;
		}
	}else{
		parts_itr.remove();
	}
}
//Approve only authorized information objects
node.approve(parts_not_approved); */

var nonApprovedObjects = node.getNonApprovedObjects().toArray();
var setNonApprovedObjects = new java.util.HashSet();

for (var i = 0; i < nonApprovedObjects.length; i++) {
	if ((nonApprovedObjects[i] instanceof com.stibo.core.domain.partobject.ValuePartObject) ) {
		var attributeID = nonApprovedObjects[i].getAttributeID();
		var attribute = manager.getAttributeHome().getAttributeByID(attributeID);

		log.info('Attribute:'+attributeID);
		if (attribute.getAttributeGroups().contains(atg_PartialApprove)) {
			log.info('Approve:'+attributeID);
			setNonApprovedObjects.add(nonApprovedObjects[i]);
		}
	}
}
node.approve(setNonApprovedObjects);
}