/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_DeleteExtraTradeItemOnImport",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Delete Extra Trade Item On Import",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_TradeItem" ],
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
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ptp_PartnerArticle",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ptp_PartnerArticle",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_Article",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_Article",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_PackagingUnitEach",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_PackagingUnitEach",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_ToBeDeleted",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ToBeDeleted",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,ptp_PartnerArticle,prd_Article,prd_PackagingUnitEach,att_ToBeDeleted) {
//From Trade Item get Article and delete refs & Trade Items which are not matched to Trade Item.
if (node) {
	var references = node.queryReferencedBy(ptp_PartnerArticle).asList(10);
		if (references.size() > 0) {
			node.queryReferencedBy(ptp_PartnerArticle).forEach(function(reference) {
				var target = reference.getOwner();
				if (target.getObjectType().getID().equals(prd_Article.getID())) {
					target.queryReferences(ptp_PartnerArticle).forEach(function(articleRef) {
						var result2=articleRef;

						var tradeItem = articleRef.getTarget();
							if (node.getID() != tradeItem.getID()) {
								articleRef.delete();
							}
						return true;
					});
				}

				if (target.getObjectType().getID().equals(prd_PackagingUnitEach.getID())) {
					target.queryReferences(ptp_PartnerArticle).forEach(function(puRef) {
						var tradeItem = puRef.getTarget();
							if (node.getID() != tradeItem.getID()) {
								log.info('Deleting node ' + tradeItem.getID());
								puRef.delete();
								tradeItem.getValue(att_ToBeDeleted.getID()).setLOVValueByID(-1);
								//tradeItem.delete()
							}
						return true;
					});
				}
			return true;
			});
		}
}
}