/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_ApproveZeroStockInformation",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Approve Zero Stock Information",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article", "prd_BundleArticle", "prd_GiftBoxArticle" ],
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
    "alias" : "atg_InformationWhichRequiresZeroStock",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeGroupImpl",
    "value" : "atg_InformationWhichRequiresZeroStock",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,atg_InformationWhichRequiresZeroStock) {
/*
 * The business action approves the attributes stated in the specific attribute group
 *
 * The product should only be approved if it has been approved before
 * The attributes and links should be retrieved from the attribute group and with the attached function approved
 *
 */

function partialApprovalByAttrGroup() {
    if (node.getApprovalStatus().toString() == 'Not in Approved workspace') {
        return true;
    }
    //Get the list of valid attributes in the attribute group.
    var attribute_ids = [];
    var attributes = atg_InformationWhichRequiresZeroStock.getAllAttributes().iterator();
    while (attributes.hasNext()) {
        var attribute = attributes.next();
        attribute_ids.push(String(attribute.getID()));
    }
    //Get the value parts which is not approved from the above list.
    var parts_not_approved = node.getNonApprovedObjects();
    var parts_itr = parts_not_approved.iterator();
    while (parts_itr.hasNext()) {
        var parts_object = parts_itr.next();
        if (parts_object.toString().indexOf('ValuePartObject') == -1) {//Only consider attributes
            parts_itr.remove();
            continue;
        }
        if (attribute_ids.indexOf(String(parts_object.getAttributeID())) == -1) {//Only consider attributes in the specific attribute group
            parts_itr.remove();
            continue;
        }
    }
    //Approve the value parts
    node.approve(parts_not_approved);
}
partialApprovalByAttrGroup();


// /*********************************************************************************
// ** Approve non approved parts by type ID                                       **
// **                                                                             **
// ** If the object has never been approved, it will not be approved at all.      **
// **                                                                             **
// ** Parameters                                                                  **
// ** - node                     : The node to be approved                        **
// ** - typeIDs                  : Array of types (ID) to be approved             **
// **                                                                             **
// ** Version                                                                     **
// ** - 20191010: Initiated by Arnold Nieuwenhuys (ARNI)                          **
// **                                                                             **
// *********************************************************************************/
//function partialApprovalByTypeID(node, typeIDs) {
//	if (node.getApprovalStatus().toString() == 'Not in Approved workspace') {
//		return 'Object hes never been approved, skipping partial approval';
//	}
//	var parts = node.getNonApprovedObjects();
//	var iterator = parts.iterator();
//	while (iterator.hasNext()) {
//		var part = iterator.next();
//		var typeID = '';
//		switch (String(part.toString().substring(33, part.toString().indexOf('@')))) {
//		case 'AssetClassificationLinkPartObject':
//			typeID = 'Parent';
//			break;
//		case 'AssetContentPartObject':
//			typeID = 'AssetContent';
//			break;
//		case 'AttributeLinkPartObject':
//			typeID = 'AttributeLink';
//			break;
//		case 'ClassificationLinkPartObject':
//		case 'ProductLinkPartObject':
//			typeID = part.getLinkTypeID();
//			break;
//		case 'DataContainerPartObject':
//		case 'DataContainerTypeLinkPartObject':
//			typeID = part.getDataContainerTypeID();
//			break;
//		case 'DefaultInDesignTemplatePartObject':
//			typeID = 'DefaultInDesignTemplate';
//			break;
//		case 'NamePartObject':
//			typeID = 'STEPName';
//			break;
//		case 'ParentPartObject':
//			typeID = 'Parent';
//			break;
//		case 'ProductOverrideChildPartObject':
//		case 'OverrideProductLinkPartObject':
//			typeID = 'OverrideProduct';
//			break;
//		case 'ReferencePartObject':
//		case 'AssetReferencePartObject':
//		case 'ProductReferencePartObject':
//		case 'ClassificationReferencePartObject':
//		case 'ContextReferencePartObject':
//		case 'EntityReferencePartObject':
//			typeID = part.getReferenceType();
//			break;
//		case 'TablePartObject':
//			typeID = 'Table';
//			break;
//		case 'TableTextsPartObject':
//			typeID = 'Table';
//			break;
//		case 'ValuePartObject':
//			typeID = part.getAttributeID();
//			break;
//		}
//		if (typeIDs.indexOf(String(typeID)) == -1) {
//			iterator.remove();
//		}
//	}
//	return node.approve(parts);
//}
}