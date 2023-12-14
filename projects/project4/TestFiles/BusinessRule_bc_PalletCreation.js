/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "bc_PalletCreation",
  "type" : "BusinessCondition",
  "setupGroups" : [ "brg_Conditions" ],
  "name" : "Validate Pallet Creation",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article", "prd_GiftBoxArticle" ],
  "allObjectTypesValid" : false,
  "runPrivileged" : false,
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
    "contract" : "AttributeBindContract",
    "alias" : "att_Stroom",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_Stroom",
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
exports.operation0 = function (node,manager,log,att_Stroom,prd_PackagingUnitPallet) {
//Used as a applies if condition on pallet creation business action (ba_CreatePackagingUnitPallet)
//Validate if there is not a pallet already and whether stroom = DC

var stroom = node.getValue(att_Stroom.getID()).getSimpleValue();

if (stroom != 'DC') {
	return false;
}

var children = node.getChildren().toArray();

for (var x in children) {
	if (children[x].getObjectType().getID() == prd_PackagingUnitPallet.getID()) {
		return false;
	}
}

return true;
}