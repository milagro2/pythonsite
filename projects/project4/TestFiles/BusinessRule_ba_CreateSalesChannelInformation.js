/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_CreateSalesChannelInformation",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Create Sales Channel Information when a new Article is initiated",
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
    "contract" : "AttributeBindContract",
    "alias" : "att_SalesChannel",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_SalesChannel",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_SalesChannelInformation",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_SalesChannelInformation",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_InitialSalesChannels",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_InitialSalesChannels",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,att_SalesChannel,prd_SalesChannelInformation,att_InitialSalesChannels) {
/*Whenever a new Article is initiated for creation, if not already in STEP, a new Sales Channel Information needs to be created.
 * Bindings:
 * salesChannelAtt --> Sales Channel (att_SalesChannel)
 * salesChannelInformationObjectType --> Sales Channel Information (prd_SalesChannelInformation)
 * initialSalesChannelsAtt --> Initial Sales Channels (att_InitialSalesChannels)
 */
var intialSalesChannelValuesArray = node.getValue(att_InitialSalesChannels.getID()).getValues().toArray()[0];
var intialSalesChannelValues = node.getValue(att_InitialSalesChannels.getID()).getValues().toArray();
if(intialSalesChannelValues.length > 0){
	//Todo: Use HierarchyConditionBuilder
	var children = node.getChildren().toArray();
	for (var y in children) {
		var child = children[y];
		if(child.getObjectType().getID().equals(prd_SalesChannelInformation.getID())){
			var salesChannel = child.getValue(att_SalesChannel.getID()).getSimpleValue();
			for(var z in intialSalesChannelValues){
				if (salesChannel.equalsIgnoreCase(intialSalesChannelValues[z])){
					throw "Sales Channel already exists"
				}else{
					var value = intialSalesChannelValues[z].getSimpleValue();		
					var product = node.createProduct(null,prd_SalesChannelInformation.getID());
					product.setName(node.getName()+" - "+value);
					product.getValue(att_SalesChannel.getID()).setSimpleValue(value);
				}
			}			
			
		}		
	}
}
}