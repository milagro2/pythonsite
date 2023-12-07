/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SetCosmosLinkActive",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Set Cosmos Link Active",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article", "prd_GiftBoxArticle", "prd_PackagingUnitCase", "prd_PackagingUnitPack" ],
  "allObjectTypesValid" : false,
  "runPrivileged" : true,
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
    "alias" : "att_COSMOSLogisticLink",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_COSMOSLogisticLink",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_PackagingUnitEach",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_PackagingUnitEach",
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
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_OperationalPackagingRoles",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_OperationalPackagingRoles",
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
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,att_COSMOSLogisticLink,prd_PackagingUnitEach,prd_PackagingUnitCase,prd_PackagingUnitPack,prd_PackagingUnitPallet,att_OperationalPackagingRoles,manager,log) {
var article;
if (node.getObjectType().getID() == 'prd_PackagingUnitPack' || 
	node.getObjectType().getID() == 'prd_PackagingUnitCase'||
	node.getObjectType().getID() == 'prd_PackagingUnitPallet') {
	article = node.getParent();
} else {
	article = node;
}

var foundDespatch;

if (article.getObjectType().getID() == 'prd_Article' || article.getObjectType().getID() == 'prd_GiftBoxArticle'){
	var children = article.getChildren().toArray();
	article.queryChildren().forEach(function(packagingUnit){
		foundDespatch = false;
		setOperationalRoles(packagingUnit, manager,children);
		return true;
	});
}


//Set logistic link
function setOperationalRoles(node, manager,children){
	//Operationele rol bevat logistieke eenheid dan logistic link = ja(-1) anders logistic link = nee(0)
	var opsRoles = node.getValue(att_OperationalPackagingRoles.getID()).getValues().iterator();
	while (opsRoles.hasNext() && !foundDespatch) {
	   opsRole = String(opsRoles.next().getID());
	   
		if(opsRole =='isTradeItemADespatchUnit'){
			node.getValue(att_COSMOSLogisticLink.getID()).setLOVValueByID("-1"); 
			foundDespatch = true;
		} else {
			node.getValue(att_COSMOSLogisticLink.getID()).setLOVValueByID("0"); 
		}
	}
}
}