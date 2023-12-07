/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SetShelfCard",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_SetValuesAndLinkes" ],
  "name" : "Set Shelf Card",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article", "prd_BundleArticle", "prd_GiftBoxArticle", "prd_PackagingUnitCase", "prd_PackagingUnitEach", "prd_PackagingUnitPack" ],
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
    "alias" : "att_VisibleShelfLabel",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_VisibleShelfLabel",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_SendShelfCard",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_SendShelfCard",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,att_VisibleShelfLabel,att_SendShelfCard) {
function SetSendShelfCard(node, yesOrNo){
	if (yesOrNo == 'yes'){
		var bool = '-1';
	}
	else { 
		var bool = '0';
	}
	
	var sendShelfCard = node.getValue(att_SendShelfCard.getID()).getSimpleValue();
	if (!sendShelfCard){
		node.getValue(att_SendShelfCard.getID()).setLOVValueByID(bool);
	}
}


function SetVisibleShelfLabel(node, yesOrNo){
	if (yesOrNo == 'yes'){
		var bool = '-1';
	}
	else { 
		var bool = '0';
	}
	
	var shelfCard = node.getValue(att_VisibleShelfLabel.getID()).getSimpleValue();
	if (!shelfCard) {
		node.getValue(att_VisibleShelfLabel.getID()).setLOVValueByID(bool);
	}
}


// start
// if pu then find parent and be current article
if (node.getObjectType().getID().equals('prd_PackagingUnitEach') || 
node.getObjectType().getID().equals('prd_PackagingUnitPack') ||
node.getObjectType().getID().equals('prd_PackagingUnitCase')) {
	var article = node.getParent();
} else {
		article = node;
}

// bundles first
if (article.getObjectType().getID().equals('prd_BundleArticle')) {
	SetVisibleShelfLabel(article, 'yes');
	SetSendShelfCard(article, 'yes');
	return;
}


// for giftboxes and articles set visibleshelflabel to yes if empty (on article level)
SetVisibleShelfLabel(article, 'yes');


// set send shelf card on PU
var packagingUnits = article.getChildren().toArray();
for (var x in packagingUnits) {
	if (packagingUnits[x].getObjectType().getID().equals('prd_PackagingUnitEach')) {
		SetSendShelfCard(packagingUnits[x], 'yes');
	}
	if (packagingUnits[x].getObjectType().getID().equals('prd_PackagingUnitPack') || 
	packagingUnits[x].getObjectType().getID().equals('prd_PackagingUnitCase')) {
		SetSendShelfCard(packagingUnits[x], 'no');
	}	
}
}