/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_CopyCommercialInfo",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_ArticleMaintenanceActions" ],
  "name" : "Copy Commercial Info",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ ],
  "allObjectTypesValid" : true,
  "runPrivileged" : true,
  "onApprove" : "Never",
  "dependencies" : [ {
    "libraryId" : "lib_GeneralLibrary",
    "libraryAlias" : "general"
  } ]
}
*/
/*===== business rule plugin definition =====
{
  "pluginId" : "JavaScriptBusinessActionWithBinds",
  "binds" : [ {
    "contract" : "CurrentObjectBindContract",
    "alias" : "target",
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
    "contract" : "BusinessFunctionBindContract",
    "alias" : "bf_GetGlobalAttributesFromGroup",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>bf_GetGlobalAttributesFromGroup</BusinessFunction>\n</BusinessFunctionReference>\n",
    "description" : null
  }, {
    "contract" : "BusinessFunctionBindContract",
    "alias" : "bf_GetDimensionAttributesFromGroup",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>bf_GetDimensionAttributesFromGroup</BusinessFunction>\n</BusinessFunctionReference>\n",
    "description" : null
  }, {
    "contract" : "BusinessFunctionBindContract",
    "alias" : "bf_GetReferencesFromGroup",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>bf_GetReferencesFromGroup</BusinessFunction>\n</BusinessFunctionReference>\n",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ptp_PartnerArticle",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ptp_PartnerArticle",
    "description" : null
  }, {
    "contract" : "BusinessFunctionBindContract",
    "alias" : "bf_GetDataContainersFromGroup",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>bf_GetDataContainersFromGroup</BusinessFunction>\n</BusinessFunctionReference>\n",
    "description" : null
  }, {
    "contract" : "BusinessFunctionBindContract",
    "alias" : "bf_GetKeyAttributesForDataContainerType",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>bf_GetKeyAttributesForDataContainerType</BusinessFunction>\n</BusinessFunctionReference>\n",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (target,manager,log,bf_GetGlobalAttributesFromGroup,bf_GetDimensionAttributesFromGroup,bf_GetReferencesFromGroup,ptp_PartnerArticle,bf_GetDataContainersFromGroup,bf_GetKeyAttributesForDataContainerType,general) {
var contextsToBeCopied = ['NL'];

//Article
var commercialAttributeGroups = new java.util.ArrayList();

var parentAttributeGroup = manager.getAttributeGroupHome().getAttributeGroupByID("atg_TIIArticle_VisualCheck");
var childGroups = parentAttributeGroup.getChildren();

var atgIter = childGroups.iterator();
while(atgIter.hasNext()){
	var attributeGroup = atgIter.next();
	log.info(attributeGroup);
	if(attributeGroup.getID() != "atg_TIIArticle_Logistics"){
		commercialAttributeGroups.add(attributeGroup);
	}
}

for(var i=0; i < commercialAttributeGroups.size();i++){

	node.queryReferences(ptp_PartnerArticle).forEach(function (tradeItemRef) {
		var source = tradeItemRef.getTarget();
		general.copyAttributesAndReferencesForGroup(source, node, commercialAttributeGroups.get(i), manager, log, bf_GetGlobalAttributesFromGroup, bf_GetDimensionAttributesFromGroup, bf_GetReferencesFromGroup, bf_GetDataContainersFromGroup, contextsToBeCopied, bf_GetKeyAttributesForDataContainerType)	
		return true;
	});

}


var commercialAttributeGroups = new java.util.ArrayList();

var parentAttributeGroup = manager.getAttributeGroupHome().getAttributeGroupByID("atg_TIIPack_VisualCheck");
var childGroups = parentAttributeGroup.getChildren();

var atgIter = childGroups.iterator();
while(atgIter.hasNext()){
	var attributeGroup = atgIter.next();
	log.info(attributeGroup);
	if(attributeGroup.getID() != "atg_TIIPack_Logistics"){
		commercialAttributeGroups.add(attributeGroup);
	}
}

for(var i=0; i < commercialAttributeGroups.size();i++){
	//Handle PU's
	var PUs = node.getChildren().toArray();
	for(var j in PUs) {
		var PU = PUs[j];
		PU.queryReferences(ptp_PartnerArticle).forEach(function (tradeItemRef) {
			var source = tradeItemRef.getTarget();
			general.copyAttributesAndReferencesForGroup(source, PU, commercialAttributeGroups.get(i), manager, log, bf_GetGlobalAttributesFromGroup, bf_GetDimensionAttributesFromGroup, bf_GetReferencesFromGroup, bf_GetDataContainersFromGroup, contextsToBeCopied, bf_GetKeyAttributesForDataContainerType)	
			return true;
		});
	}
}
}