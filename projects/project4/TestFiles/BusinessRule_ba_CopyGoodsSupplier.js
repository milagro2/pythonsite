/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_CopyGoodsSupplier",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Copy Goods Supplier for PU WF",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_PackagingUnitCase", "prd_PackagingUnitPack" ],
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
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_PackagingUnitPack",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_PackagingUnitPack",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_PackagingUnitCase",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_PackagingUnitCase",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_PackagingUnitPallet",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_PackagingUnitPallet",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_PackagingUnitEach",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_PackagingUnitEach",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "pte_GoodsSupplier",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "pte_GoodsSupplier",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_SupplierArticleCode",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_SupplierArticleCode",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,prd_PackagingUnitPack,prd_PackagingUnitCase,prd_PackagingUnitPallet,prd_PackagingUnitEach,pte_GoodsSupplier,att_SupplierArticleCode) {
// This BR copies goodssupplier and external article number from each to case or pack
// This BR is put on entry of the PU WF in (ba_InitialStateCreatePU)

var article;
if (node.getObjectType().getID() == 'prd_PackagingUnitPack' || 
	node.getObjectType().getID() == 'prd_PackagingUnitCase'||
	node.getObjectType().getID() == 'prd_PackagingUnitPallet') {
	article = node.getParent();
} else {
	article = node;
}

var foundDespatch;
var supplier;
var ExternalArticleNumber;
var supplierTarget;


if (article.getObjectType().getID() == 'prd_Article' || article.getObjectType().getID() == 'prd_GiftBoxArticle'){

	article.getChildren().toArray().forEach((child) => {
	if(child.getObjectType().getID() == 'prd_PackagingUnitEach'){
		supplier = child.queryReferences(pte_GoodsSupplier).asList(10).get(0);
		supplierTarget = supplier.getTarget();
		ExternalArticleNumber = supplier.getValue(att_SupplierArticleCode.getID()).getSimpleValue(); 
		logger.info(ExternalArticleNumber);
		logger.info(supplierTarget);
		
		}
	});
}
node.createReference(supplierTarget, pte_GoodsSupplier); 
node.queryReferences(pte_GoodsSupplier).asList(10).get(0).getValue(att_SupplierArticleCode.getID()).setSimpleValue(ExternalArticleNumber);
}