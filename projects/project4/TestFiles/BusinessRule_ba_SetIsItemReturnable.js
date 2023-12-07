/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SetIsItemReturnable",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Sets Returnable for all PU's",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article", "prd_BundleArticle", "prd_PackagingUnitCase", "prd_PackagingUnitEach", "prd_PackagingUnitPack" ],
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
    "alias" : "att_IsReturnable",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_IsReturnable",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_NextLowerLevel",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_NextLowerLevel",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,att_IsReturnable,ref_NextLowerLevel) {
// This BR copies the Isreturnable value to the other PU's
// note that -1 is 'yes'

// FUNCTION - loop through other PU's and set to correct boolean (Except for pallet)
function setReturnable(article, isReturnableOnEach){
	var children = article.getChildren().toArray();
	for (var i in children){
		var child = children[i]
		if (child.getObjectType().getID() == 'prd_PackagingUnitEach' ||
		child.getObjectType().getID() == 'prd_PackagingUnitPack' ||
		child.getObjectType().getID() == 'prd_PackagingUnitCase') {
			child.getValue(att_IsReturnable.getID()).setLOVValueByID(isReturnableOnEach);
		}
	}
}

// check what we are: We want to be article or giftbox article
var article;
if (node.getObjectType().getID() == 'prd_PackagingUnitEach' || 
	node.getObjectType().getID() == 'prd_PackagingUnitPack'||
	node.getObjectType().getID() == 'prd_PackagingUnitCase') {
	article = node.getParent();
} else {
	article = node;
}

// check if isreturnable is set to 'yes' on each and copy to other PU's, if not, copy 'no'

var isReturnableOnEach = article.queryReferencedBy(ref_NextLowerLevel).asList(1).get(0).getSource().getValue(att_IsReturnable.getID()).getSimpleValue();
logger.info(isReturnableOnEach);

if (isReturnableOnEach == '-1') {
	setReturnable(article, '-1');
}	else {
		setReturnable(article, '0');
	}
}