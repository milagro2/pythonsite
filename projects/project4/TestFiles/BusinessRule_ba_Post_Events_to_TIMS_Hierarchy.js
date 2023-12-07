/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_Post_Events_to_TIMS_Hierarchy",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Post Events to TIMS Hierarchy",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Level1Partner", "prd_Level2Partner", "prd_PartnerItemHierarchyRoot", "prd_ProductCategoryPartner", "prd_ProductFamilyPartner", "prd_TradeItem" ],
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
    "contract" : "EventQueueBinding",
    "alias" : "oiep_OTIM1",
    "parameterClass" : "com.stibo.core.domain.impl.integrationendpoint.FrontOutboundIntegrationEndpointImpl",
    "value" : "step://OutBoundIntegrationEndpoint?id=oiep_OTIM1",
    "description" : null
  }, {
    "contract" : "DerivedEventTypeBinding",
    "alias" : "RequestTradeItemInformation",
    "parameterClass" : "com.stibo.core.domain.impl.eventqueue.DerivedEventTypeImpl",
    "value" : "RequestTradeItemInformation",
    "description" : null
  }, {
    "contract" : "CurrentObjectBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_TradeItem",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_TradeItem",
    "description" : null
  }, {
    "contract" : "LoggerBindContract",
    "alias" : "logger",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (oiep_OTIM1,RequestTradeItemInformation,node,prd_TradeItem,logger) {
var children = node.getChildren();
for(var i = 0; i < children.size(); i++) {
	var child = children.get(i);
	if(child.getObjectType().getID()==prd_TradeItem.getID()){
		oiep_OTIM1.queueDerivedEvent(RequestTradeItemInformation, child);
		//logger.info(child.getID());				
	} else {
		var children2 = child.getChildren();
		for(var j = 0; j < children2.size(); j++) {
			var child2 = children2.get(j);
			if(child2.getObjectType().getID()==prd_TradeItem.getID()){
				oiep_OTIM1.queueDerivedEvent(RequestTradeItemInformation, child2);
				//logger.info(child2.getID());					
			} else {
				var children3 = child2.getChildren();
				for(var k = 0; k < children3.size(); k++) {
					var child3 = children3.get(k);
					if(child3.getObjectType().getID()==prd_TradeItem.getID()){
						oiep_OTIM1.queueDerivedEvent(RequestTradeItemInformation, child3);
						//logger.info(child3.getID());					
					} else {
						var children4 = child3.getChildren();
						for(var l = 0; l < children4.size(); l++) {
							var child4 = children4.get(l);		
							if(child4.getObjectType().getID()==prd_TradeItem.getID()){
                oiep_OTIM1.queueDerivedEvent(RequestTradeItemInformation, child4);
							//logger.info(child4.getID());				
							}	
						}		
					}											
				}		
			}				
		}		
	}

}
}