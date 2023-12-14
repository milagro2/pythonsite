/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_InitiateInEventProcessorChangeTIGLN",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Initiate in Event Processor Change Trade Item for GLN Updates",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "ent_Partner" ],
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
    "contract" : "EventQueueBinding",
    "alias" : "ep_ChangeTradeItemForGLNUpdate",
    "parameterClass" : "com.stibo.core.domain.impl.eventprocessor.EventProcessorImpl",
    "value" : "step://eventprocessor?id=ep_ChangeTradeItemForGLNUpdate",
    "description" : null
  }, {
    "contract" : "DerivedEventTypeBinding",
    "alias" : "ChangedGLN",
    "parameterClass" : "com.stibo.core.domain.impl.eventqueue.DerivedEventTypeImpl",
    "value" : "ChangedGLN",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_GlobalLocationNumber",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_GlobalLocationNumber",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_DataProvider",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_DataProvider",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_TradeItem",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_TradeItem",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_Article",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_Article",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_GiftBoxArticle",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_GiftBoxArticle",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ptp_PartnerArticle",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ptp_PartnerArticle",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,ep_ChangeTradeItemForGLNUpdate,ChangedGLN,att_GlobalLocationNumber,ref_DataProvider,prd_TradeItem,prd_Article,prd_GiftBoxArticle,ptp_PartnerArticle) {
var references = node.queryReferencedBy(ref_DataProvider).asList(10);
var glnPartner = node.getValue(att_GlobalLocationNumber.getID()).getSimpleValue();
var objectID;
var source;
if (references.size() > 0){
	node.queryReferencedBy(ref_DataProvider).forEach(function(dataProviderReference){
		source = dataProviderReference.getSource();
		objectID = dataProviderReference.getSource().getObjectType().getID();
		if(objectID == prd_TradeItem.getID()){
			var glnTI = source.getValue(att_GlobalLocationNumber.getID()).getSimpleValue();
			if (glnPartner != glnTI){
				source.queryReferencedBy(ptp_PartnerArticle).forEach(function(partnerItemReference){
					sourcePartnerItemReference = partnerItemReference.getSource();
					objectIDPartnerItemReference = partnerItemReference.getSource().getObjectType().getID();
					if(objectIDPartnerItemReference == prd_Article.getID() || objectIDPartnerItemReference == prd_GiftBoxArticle.getID()){
						log.info(sourcePartnerItemReference);
						ep_ChangeTradeItemForGLNUpdate.queueDerivedEvent(ChangedGLN, sourcePartnerItemReference);
					}
					return true;
				});
			}
		}
		return true;
	});
}
}