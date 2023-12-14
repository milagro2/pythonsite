/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SetVVLVAttribute",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Set VVLV Attribute",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article", "prd_GiftBoxArticle", "prd_PackagingUnitCase", "prd_PackagingUnitPack", "prd_PackagingUnitPallet" ],
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
    "alias" : "att_Stroom",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_Stroom",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_CreateVVLV",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_CreateVVLV",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_PackagingUnitEach",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_PackagingUnitEach",
    "description" : null
  }, {
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,att_Stroom,att_CreateVVLV,prd_PackagingUnitEach,manager) {
var article;
if (node.getObjectType().getID() == 'prd_PackagingUnitPack' || 
	node.getObjectType().getID() == 'prd_PackagingUnitCase'||
	node.getObjectType().getID() == 'prd_PackagingUnitPallet') {
	article = node.getParent();
} else {
	article = node;
}

// Set VVLV Roles
article.queryChildren().forEach(function(packagingUnit){
	setVVLV(packagingUnit, manager);
	return true;
});
function setVVLV(node){
	// Als stroom = RZ dan vvlv = nee voor alle PU's
	// Als stroom = dc en pu is each dan vvlv = ja anders nee
	// Als stroom = dc en pu <> each dan vvlv = nee
	
	var stroom = node.getValue(att_Stroom.getID()).getSimpleValue();
	var value = "0";
	
	if(stroom == "DC" && node.getObjectType().getID().equals(prd_PackagingUnitEach.getID())){
		value = "-1";
	}
	node.getValue(att_CreateVVLV.getID()).setLOVValueByID(value);
}
}