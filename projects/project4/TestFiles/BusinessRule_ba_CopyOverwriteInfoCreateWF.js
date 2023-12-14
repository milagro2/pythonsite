/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_CopyOverwriteInfoCreateWF",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_CreateActions" ],
  "name" : "Copy overwrite info for create WF",
  "description" : "Copy Overwrite Info from TI to article and PU for Create WF",
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
var attributeGroup = manager.getAttributeGroupHome().getAttributeGroupByID("atg_TIIArticle_AlwaysOverwriteCreate");

target.queryReferences(ptp_PartnerArticle).forEach(function (tradeItemRef) {
	var source = tradeItemRef.getTarget();
	general.copyAttributesAndReferencesForGroup(source, target, attributeGroup, manager, log, bf_GetGlobalAttributesFromGroup, bf_GetDimensionAttributesFromGroup, bf_GetReferencesFromGroup, bf_GetDataContainersFromGroup, contextsToBeCopied, bf_GetKeyAttributesForDataContainerType)	
	return true;
});

//Handle PU's
var PUs = target.getChildren().toArray();
var attributeGroup = manager.getAttributeGroupHome().getAttributeGroupByID("atg_TIIPack_AlwaysOverwriteCreate");
for(var j in PUs) {
	var PU = PUs[j];
	PU.queryReferences(ptp_PartnerArticle).forEach(function (tradeItemRef) {
		var source = tradeItemRef.getTarget();
		general.copyAttributesAndReferencesForGroup(source, PU, attributeGroup, manager, log, bf_GetGlobalAttributesFromGroup, bf_GetDimensionAttributesFromGroup, bf_GetReferencesFromGroup, bf_GetDataContainersFromGroup, contextsToBeCopied, bf_GetKeyAttributesForDataContainerType)	
		return true;
	});
}
}