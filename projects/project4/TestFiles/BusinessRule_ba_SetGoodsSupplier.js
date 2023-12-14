/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SetGoodsSupplier",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Set Goods Supplier",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article", "prd_BundleArticle", "prd_GiftBoxArticle" ],
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
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_DataProvider",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_DataProvider",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "pte_GoodsSupplier",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "pte_GoodsSupplier",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_AholdInboudLogistics",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_AholdInboudLogistics",
    "description" : null
  }, {
    "contract" : "EntityBindContract",
    "alias" : "Partner_293319",
    "parameterClass" : "com.stibo.core.domain.impl.entity.FrontEntityImpl$$Generated$$14",
    "value" : "Partner_293319",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "pte_GoodsSupplier2",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "pte_GoodsSupplier2",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,ref_DataProvider,pte_GoodsSupplier,att_AholdInboudLogistics,Partner_293319,pte_GoodsSupplier2) {
var aholdLog = node.getValue(att_AholdInboudLogistics.getID()).getLOVValue();
var supplier;
if (aholdLog){	
	if (aholdLog.getID() == -1){
		supplier = Partner_293319;
	}else{
		supplier = node.queryReferences(ref_DataProvider).asList(10).get(0).getTarget();	
	}
}else{
	supplier = node.queryReferences(ref_DataProvider).asList(10).get(0).getTarget();
}

function createRef(source,target,ref) {
	try {
		source.createReference(target,ref)
	} catch (e) {
		if(e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException){
			log.info("already referenced");
		} else {
			throw e;
		}
	}
}

if(supplier){
	if (node.getObjectType().getID().equals("prd_BundleArticle")){
		createRef(node, supplier, pte_GoodsSupplier);
		createRef(node, supplier, pte_GoodsSupplier2);
		
	} else if(node.getObjectType().getID() == 'prd_Article' || node.getObjectType().getID() == 'prd_GiftBoxArticle'){
		createRef(node, supplier, pte_GoodsSupplier);
		createRef(node, supplier, pte_GoodsSupplier2);
		node.queryChildren().forEach(function(child){
			if (child.getObjectType().getID() == 'prd_PackagingUnitEach' ||
			child.getObjectType().getID() == 'prd_PackagingUnitPack' ||
			child.getObjectType().getID() == 'prd_PackagingUnitCase') {
				createRef(child, supplier, pte_GoodsSupplier);
			}
			return true;
		});	
	}
}
}