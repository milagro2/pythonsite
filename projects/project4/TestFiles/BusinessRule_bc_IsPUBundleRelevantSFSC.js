/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "bc_IsPUBundleRelevantSFSC",
  "type" : "BusinessCondition",
  "setupGroups" : [ "brg_Conditions" ],
  "name" : "Is Packaging Unit or Bundle Article Relevant for SFSC",
  "description" : "Event filter for OIEP OSFSC1 - STEP.2.SFSC.ARTICLES to only include Packaging Unit or Bundle Article objects that are relevant for SFSC.",
  "scope" : "Global",
  "validObjectTypes" : [ "prd_BundleArticle", "prd_PackagingUnitCase", "prd_PackagingUnitEach", "prd_PackagingUnitPack", "prd_PackagingUnitPallet" ],
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
    "contract" : "AttributeBindContract",
    "alias" : "att_CowhillsLink",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_CowhillsLink",
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
exports.operation0 = function (node,att_CowhillsLink,logger) {
/*
 *  Name: 	bc_IsPUBundleRelevantSFSC - Is Packaging Unit or Bundle Article Relevant for SFSC
 *  Purpose: 	Event filter for OIEP OSFSC1 - STEP.2.SFSC.ARTICLES to only include Packaging Unit or Bundle Article objects that are relevant for SFSC.
 *  Binds:
 *  			node -> Current Object
 *  			attSFSCFlag - > Attribute -> Cowhills Koppeling (att_CowhillsLink)
 *
*/

var SFSCFlag = node.getValue(att_CowhillsLink.getID()).getID();
var result;

if (SFSCFlag == -1) {
result = true;
} else {
result = false;
}

return result;
}