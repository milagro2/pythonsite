/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "bf_ValidateSupplierReferences",
  "type" : "BusinessFunction",
  "setupGroups" : [ "brg_FunctionValidations" ],
  "name" : "Validate Supplier References",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ ],
  "allObjectTypesValid" : true,
  "runPrivileged" : true,
  "onApprove" : "Never",
  "dependencies" : [ ]
}
*/
/*===== business rule plugin definition =====
{
  "pluginId" : "JavaScriptBusinessFunctionWithBinds",
  "binds" : [ {
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
    "contract" : "BusinessFunctionBindContract",
    "alias" : "bf_GetAllObjectsForAnArticle",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>bf_GetAllObjectsForAnArticle</BusinessFunction>\n</BusinessFunctionReference>\n",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "pte_GoodsSupplier",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "pte_GoodsSupplier",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "pte_GoodsSupplier2",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "pte_GoodsSupplier2",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_DataProvider",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_DataProvider",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_COSMOSNumber",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_COSMOSNumber",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_GlobalLocationNumber",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_GlobalLocationNumber",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_SupplierArticleCode",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_SupplierArticleCode",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation",
  "functionReturnType" : "java.util.List<java.lang.String>",
  "functionParameterBinds" : [ {
    "contract" : "NodeBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : ""
  } ]
}
*/
exports.operation0 = function (manager,log,bf_GetAllObjectsForAnArticle,pte_GoodsSupplier,pte_GoodsSupplier2,ref_DataProvider,att_COSMOSNumber,att_GlobalLocationNumber,att_SupplierArticleCode,node) {
var errorLog = new java.util.ArrayList();
var allObjects = bf_GetAllObjectsForAnArticle.evaluate({node: node}).toArray();

for (var x in allObjects) {
	//Check if Supplier article code has been entered on the Goods Supplier reference and if there is a COSMOS number
	var referencesGoodsSuplier = allObjects[x].queryReferences(pte_GoodsSupplier).asList(10);
	if (referencesGoodsSuplier.size() == 1) {
		if (!referencesGoodsSuplier.get(0).getValue(att_SupplierArticleCode.getID()).getSimpleValue()) {
			errorLog.add(allObjects[x].getID()+' '+allObjects[x].getName()+' is not complete. External Artikelnummer on the Goods Supplier reference is missing.');		
		}
		if (!referencesGoodsSuplier.get(0).getTarget().getValue(att_COSMOSNumber.getID()).getSimpleValue()) {
			errorLog.add(allObjects[x].getID()+' '+allObjects[x].getName()+' is missing the COSMOS Number for the Good Supplier.');
		}
	} 

	var referencesGoodsSuplier2 = allObjects[x].queryReferences(pte_GoodsSupplier2).asList(10);
	if (referencesGoodsSuplier2.size() == 1) {
		if (!referencesGoodsSuplier2.get(0).getTarget().getValue(att_COSMOSNumber.getID()).getSimpleValue()) {
			errorLog.add(allObjects[x].getID()+' '+allObjects[x].getName()+' is missing the COSMOS Number for the Good Supplier.');
		}
	}

}

//Article needs dataprovider.
var dataProvider = node.queryReferences(ref_DataProvider).asList(10);

if (dataProvider.size() == 1) {
	if (!dataProvider.get(0).getTarget().getValue(att_GlobalLocationNumber.getID()).getSimpleValue()) {
		errorLog.add(node.getID()+' '+node.getName()+' is missing the GLN for the Data Provider.');
	}
} 

var referencesGoodsSuplier = node.queryReferences(pte_GoodsSupplier).asList(10);

if (referencesGoodsSuplier.size() == 1) {
	if (!referencesGoodsSuplier.get(0).getValue(att_SupplierArticleCode.getID()).getSimpleValue()) {
		errorLog.add(node.getID()+' '+node.getName()+' is not complete. External Artikelnummer on the Goods Supplier reference is missing.');		
	}
	if (!referencesGoodsSuplier.get(0).getTarget().getValue(att_COSMOSNumber.getID()).getSimpleValue()) {
		errorLog.add(referencesGoodsSuplier.get(0).getTarget().getID()+' '+referencesGoodsSuplier.get(0).getTarget().getName()+' is missing the COSMOS Number.');
	}
} 

var referencesGoodsSuplier2 = node.queryReferences(pte_GoodsSupplier2).asList(10);
if (referencesGoodsSuplier2.size() == 1) {
	if (!referencesGoodsSuplier2.get(0).getTarget().getValue(att_COSMOSNumber.getID()).getSimpleValue()) {
		errorLog.add(referencesGoodsSuplier2.get(0).getTarget().getID()+' '+referencesGoodsSuplier2.get(0).getTarget().getName()+' is missing the COSMOS Number.');
	}
}


return errorLog;
}