/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "bc_IsCOSMOSMandatoryInfoCompleted",
  "type" : "BusinessCondition",
  "setupGroups" : [ "brg_Conditions" ],
  "name" : "Is COSMOS Mandatory Information Completed",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article", "prd_BundleArticle", "prd_GiftBoxArticle", "prd_PackagingUnitCase", "prd_PackagingUnitEach", "prd_PackagingUnitPack", "prd_PackagingUnitPallet", "prd_ProductFamily", "prd_SalesChannelInformation" ],
  "allObjectTypesValid" : false,
  "runPrivileged" : true,
  "onApprove" : "Never",
  "dependencies" : [ ]
}
*/
/*===== business rule plugin definition =====
{
  "pluginId" : "JavaScriptBusinessConditionWithBinds",
  "binds" : [ {
    "contract" : "CurrentObjectBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "AttributeGroupBindContract",
    "alias" : "atg_CreateArticle_MandCOSMOS",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeGroupImpl",
    "value" : "atg_CreateArticle_MandCOSMOS",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_OperationalPackagingRoles",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_OperationalPackagingRoles",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_PackagingUnitCase",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_PackagingUnitCase",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_PackagingUnitPack",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_PackagingUnitPack",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_PackagingUnitPallet",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_PackagingUnitPallet",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,atg_CreateArticle_MandCOSMOS,att_OperationalPackagingRoles,prd_PackagingUnitCase,prd_PackagingUnitPack,prd_PackagingUnitPallet) {
/*
 * The functionality will check whether all mandatory elements are completed.
 * 
 * - Based on the object type retrieve the correct attribute group containing all the mandatory elements (replace 'prd_' by 'atg_Mandatory_'), 
 *   these attribute groups are children of the attribute group mentioned
 *   
 * - Retrieve all attributes included in the attribute group
 * - Check whether all attributes have a value, inherited and calculated values count as completed
 * 
 * - Retrieve all reference types included in the attribute group
 * - Check whether at least one reference exists for each of the reference types (including the product to classification links)
 * 
 * - Retrieve all data container types included in the attribute group 
 * - Check whether at least one data container exists for each of the data container types.
 *  
 */
var objcetType = node.getObjectType().getID();
var mandatoryElement = objcetType.replace("prd_","atg_MandatoryCOSMOS_");
var attributeGroups = atg_CreateArticle_MandCOSMOS.getChildren().toArray();
var result="";
var packaging_count = 0;
if (node.getObjectType().equals(prd_PackagingUnitPallet) || node.getObjectType().equals(prd_PackagingUnitPack)|| node.getObjectType().equals(prd_PackagingUnitCase)){
	var packagingRoles = node.getValue(att_OperationalPackagingRoles.getID()).getValues().iterator();
	while (packagingRoles.hasNext()) {
	   packagingRole = String(packagingRoles.next().getID());
	   if (packagingRole == "isTradeItemAConsumerUnit" || packagingRole == "isTradeItemADespatchUnit") {
	       packaging_count++;
	   }
	}
}else{
	packaging_count++;
}
if (packaging_count > 0){
	for(var x in attributeGroups){	
		if(mandatoryElement.equals(attributeGroups[x].getID())){
			//Retrieve all attributes included in the attribute group
			var attributes = attributeGroups[x].getAttributes().toArray();
			for(var att in attributes){
				var attribute = attributes[att];
				if(!node.getValue(attribute.getID()).getSimpleValue()){
					result = result+"Attribuut "+attribute.getID()+" mist voor "+node.getID() +"\n";
				}
			}
	
			//Retrieve all reference types included in the attribute group
			var referenceType = attributeGroups[x].getLinkTypes().toArray();
			for(var ref in referenceType ){
				//Check whether it is a reference type or a product to classification link
				if (referenceType[ref] instanceof com.stibo.core.domain.impl.ClassificationProductLinkTypeImpl == true) {
					var references = node.queryClassificationProductLinks(referenceType[ref]).asList(100);
				} else {
					var references = node.queryReferences(referenceType[ref]).asList(100);
				}
				if(references.isEmpty()){
					result = result+"Referentie "+referenceType[ref].getID()+" mist voor "+node.getID() +"\n";;
				}
			}
	
			//Retrieve all data container types included in the attribute group 
			var dataContainerType = attributeGroups[x].getDataContainerTypes().toArray();
			for(var dc in dataContainerType){
				if(node.getDataContainer(dataContainerType[dc]) == null){
					result = result+"Data container "+dataContainerType[dc].getID()+" mist voor "+node.getID() +"\n";;			
				}
			}
			break;
		}
	}
}
if(result != ""){
	return result;
}else{
	return true;
}
}