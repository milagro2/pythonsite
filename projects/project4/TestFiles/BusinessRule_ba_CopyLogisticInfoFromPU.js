/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_CopyLogisticInfoFromPU",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Copy Logistic Info From PU To Article",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article", "prd_GiftBoxArticle", "prd_PackagingUnitCase", "prd_PackagingUnitEach", "prd_PackagingUnitPack", "prd_PackagingUnitPallet" ],
  "allObjectTypesValid" : false,
  "runPrivileged" : false,
  "onApprove" : "Never",
  "dependencies" : [ ]
}
*/
/*===== business rule plugin definition =====
{
  "pluginId" : "JavaScriptBusinessActionWithBinds",
  "binds" : [ {
    "contract" : "AttributeBindContract",
    "alias" : "att_GrossWeight",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_GrossWeight",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_ProductWidth",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ProductWidth",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_ProductHeight",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ProductHeight",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_ProductDepth",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ProductDepth",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_COSMOSLogisticLink",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_COSMOSLogisticLink",
    "description" : null
  }, {
    "contract" : "CurrentObjectBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_PackagingWidth",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_PackagingWidth",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_PackagingHeight",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_PackagingHeight",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_PackagingDepth",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_PackagingDepth",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_GlobalTradeIdentificationNumber",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_GlobalTradeIdentificationNumber",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_ColloGlobalTradeIdentificationNumber",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ColloGlobalTradeIdentificationNumber",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (att_GrossWeight,att_ProductWidth,att_ProductHeight,att_ProductDepth,att_COSMOSLogisticLink,node,att_PackagingWidth,att_PackagingHeight,att_PackagingDepth,att_GlobalTradeIdentificationNumber,att_ColloGlobalTradeIdentificationNumber) {
/* STEPDOC
    This business rule finds the logistical PU and
    copies the packaging info from the PU to the Article level

    Runs when : 
        - On exit of parallel commercial enrichment, 
        - On exit of final validation, 
        - On exit of manual validation (maintenance wf) 
        - On approve from tree
*/

var article;
if (node.getObjectType().getID() == 'prd_PackagingUnitEach' ||
	node.getObjectType().getID() == 'prd_PackagingUnitPack' || 
	node.getObjectType().getID() == 'prd_PackagingUnitCase'||
	node.getObjectType().getID() == 'prd_PackagingUnitPallet') {
	article = node.getParent();
} else {
	article = node;
}

// Define copy pairs
var attributePairs = [
    { from_pu: att_GrossWeight.getID(), to_article: att_GrossWeight.getID() },
    { from_pu: att_ProductWidth.getID(), to_article: att_PackagingWidth.getID() },
    { from_pu: att_ProductHeight.getID(), to_article: att_PackagingHeight.getID() },
    { from_pu: att_ProductDepth.getID(), to_article: att_PackagingDepth.getID() },
//    { from_pu: att_GlobalTradeIdentificationNumber.getID(), to_article: att_ColloGlobalTradeIdentificationNumber.getID() },
// ^^^^ This was commented out, since the active logistic varient is not always in STEP, or marked correctly.
// We need to get all logistical variants in STEP & we need to mark them as active logisical variant.
// Then we can remove the comment and the collo EAN will match the active logistical variant.
]

// Find Logistical PU
var logisticalPU = null;
var packagingUnits = article.getChildren().toArray();

packagingUnits.forEach((pu) => {
    var logisticLink = pu.getValue(att_COSMOSLogisticLink.getID()).getLOVValue();
    if (logisticLink && logisticLink.getID() == '-1') {
        logisticalPU = pu;
        return true;
    }
})

if (!logisticalPU) {
    throw new Error('No logistical packaging unit found')
}

// Copy attributes
attributePairs.forEach((attributePair) => {
	// Get value from pu
    var value = logisticalPU.getValue(attributePair.from_pu).getSimpleValue();

    // Set article on article
    article.getValue(attributePair.to_article).setSimpleValue(value);
})
}