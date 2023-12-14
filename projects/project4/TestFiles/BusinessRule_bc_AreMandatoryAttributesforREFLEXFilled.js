/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "bc_AreMandatoryAttributesforREFLEXFilled",
  "type" : "BusinessCondition",
  "setupGroups" : [ "brg_Conditions" ],
  "name" : "Are Mandatory Attributes for REFLEX Filled",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article", "prd_GiftBoxArticle", "prd_PackagingUnitCase", "prd_PackagingUnitEach", "prd_PackagingUnitPack", "prd_PackagingUnitPallet" ],
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
  "pluginId" : "ReferenceOtherBCBusinessCondition",
  "parameters" : [ {
    "id" : "ReferencedBC",
    "type" : "com.stibo.core.domain.businessrule.BusinessCondition",
    "value" : "bc_IsWarehouseItem"
  }, {
    "id" : "ValueWhenReferencedIsNA",
    "type" : "com.stibo.util.basictypes.TrueFalseParameter",
    "value" : "false"
  } ],
  "pluginType" : "Operation"
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
    "alias" : "atg_OIEP_ORFLX1_Mandatory",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeGroupImpl",
    "value" : "atg_OIEP_ORFLX1_Mandatory",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation1 = function (node,atg_OIEP_ORFLX1_Mandatory,lib) {
/************************************************************************************************
** Validate if mandatory attributes for Reflex (WMS) are filled								**
**																			**
** Business Condition (true / false) to filter events out the batch						**
** The attributes from below group are validated for having a value:						**
** OIEP ORFLX1 Mandatory (atg_OIEP_ORFLX1_Mandatory)									**
**																			**
** Parameters																	**
** node 			: Current Object												**
** attributeGroup 	: Attribute Group - OIEP ORFLX1 Mandatory (atg_OIEP_ORFLX1_Mandatory)		**
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
return (lib.evaluateAttributesFromAttributeGroup(node, atg_OIEP_ORFLX1_Mandatory) && lib.evaluateReferencesFromAttributeGroup(node, atg_OIEP_ORFLX1_Mandatory) && lib.evaluateDataContainerAttributes(node, atg_OIEP_ORFLX1_Mandatory));
}