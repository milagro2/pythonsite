/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_BulkUpdatePalletTypeToArticle",
  "type" : "BusinessAction",
  "setupGroups" : [ "sg_BulkUpdates" ],
  "name" : "Bulk update - Pallet Type To Article",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article" ],
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
    "contract" : "LoggerBindContract",
    "alias" : "log",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_PalletType",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_PalletType",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ptp_PartnerArticle",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ptp_PartnerArticle",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_NextLowerLevel",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_NextLowerLevel",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,manager,log,att_PalletType,ptp_PartnerArticle,ref_NextLowerLevel) {
var linkedTradeItemCount = 0;
var tradeItemEach;
var tradeItemCase;
var tradeItemPalletType;

var found = false;

node.queryReferences(ptp_PartnerArticle).forEach(function(ref){
	linkedTradeItemCount++
	tradeItemEach = ref.getTarget();
	return true;	
})

log.info("Linked TI to Each = " + linkedTradeItemCount);

//First check if each has pallet value, otherwise get case.
tradeItemPalletType = tradeItemEach.getValue(att_PalletType.getID()).getID();

if(tradeItemPalletType == null) {
	tradeItemEach.queryReferencedBy(ref_NextLowerLevel).forEach(function(ref){
		if(!found){
			var source = ref.getSource();
			tradeItemPalletType = source.getValue(att_PalletType.getID()).getID();
			if(tradeItemPalletType != null) {
				found = true;
			}
		}		
		return true;
	})
} else {
	found = true;
}

log.info("Found = " + found + ", found PalletType " + tradeItemPalletType);

if(found) {
	node.getValue(att_PalletType.getID()).setLOVValueByID(tradeItemPalletType);
}


}