/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "bc_AreMandatoryAttributesforCOSMOSFilled",
  "type" : "BusinessCondition",
  "setupGroups" : [ "brg_Conditions" ],
  "name" : "Are Mandatory Attributes for COSMOS Filled",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_BundleArticle", "prd_PackagingUnitCase", "prd_PackagingUnitEach", "prd_PackagingUnitPack", "prd_PackagingUnitPallet" ],
  "allObjectTypesValid" : false,
  "runPrivileged" : true,
  "onApprove" : "Never",
  "dependencies" : [ {
    "libraryId" : "lib_GeneralLibrary",
    "libraryAlias" : "lib"
  } ]
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
    "alias" : "atg_OIEP_OCOS5_Mandatory",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeGroupImpl",
    "value" : "atg_OIEP_OCOS5_Mandatory",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,atg_OIEP_OCOS5_Mandatory,lib) {
/************************************************************************************************
** Validate if mandatory attributes for Cosmos are filled								**
**																			**
** Business Condition (true / false) to filter events out the batch						**
** The attributes from below group are validated for having a value:						**
** OIEP OCOS5 Mandatory (atg_OIEP_OCOS5_Mandatory)									**
**																			**
** Parameters																	**
** node 			: Current Object												**
** attributeGroup 	: Attribute Group - OIEP OCOS5 Mandatory (atg_OIEP_OCOS5_Mandatory)		**
**																			**
** Debug flag																	**
** Switch of debug flag in TEST and PRODUCTION (true/false)								**
*************************************************************************************************/

var isDebug = false;

function logDebug(message) {
	if (isDebug) {
logger.info(message);
}
}

logDebug('Validate Attributes References Data Containers: ' + node.getID());
return (lib.evaluateAttributesFromAttributeGroup(node, atg_OIEP_OCOS5_Mandatory) && lib.evaluateReferencesFromAttributeGroup(node, atg_OIEP_OCOS5_Mandatory) && lib.evaluateDataContainerAttributes(node, atg_OIEP_OCOS5_Mandatory));
}