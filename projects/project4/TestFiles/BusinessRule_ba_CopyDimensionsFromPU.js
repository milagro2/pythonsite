/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_CopyDimensionsFromPU",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Copy Dimensions From PU",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_PackagingUnitCase", "prd_PackagingUnitEach", "prd_PackagingUnitPack" ],
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
    "contract" : "CurrentObjectBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
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
    "alias" : "att_PackagingWidth",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_PackagingWidth",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,att_ProductWidth,att_ProductHeight,att_ProductDepth,att_PackagingHeight,att_PackagingDepth,att_PackagingWidth) {
// Works on PU. Copies dimensions(att_ProductHeight, Depth, Width) from PU to parent article (PU_PackagingHeight, Depth and Width)

// bind the three attributes on PU level
//bind the three attributes on article level
//getparent
//


var PUWidth = node.getValue(att_ProductWidth.getID()).getSimpleValue();
var PUHeight = node.getValue(att_ProductHeight.getID()).getSimpleValue();
var PUDepth = node.getValue(att_ProductDepth.getID()).getSimpleValue();
var parent = node.getParent();

//copy to article att
parent.getValue(att_PackagingWidth.getID()).setSimpleValue(PUWidth);


var packagingWidth = parent.getValue(att_PackagingWidth.getID()).getSimpleValue();
var packagingHeight = parent.getValue(att_PackagingHeight.getID()).getSimpleValue();
var packagingDepth = parent.getValue(att_PackagingDepth.getID()).getSimpleValue();


logger.info(PUWidth);
logger.info(PUHeight);
logger.info(PUDepth);

logger.info(packagingWidth);
logger.info(packagingHeight);
logger.info(packagingDepth);



}