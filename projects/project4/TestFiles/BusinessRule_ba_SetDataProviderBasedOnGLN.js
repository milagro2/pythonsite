/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SetDataProviderBasedOnGLN",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_SetValuesAndLinkes" ],
  "name" : "Set Data Provider based on Initial Data Provider",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article", "prd_GiftBoxArticle" ],
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
    "contract" : "ManagerBindContract",
    "alias" : "manager",
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
    "contract" : "AttributeBindContract",
    "alias" : "att_Supplier",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_Supplier",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,manager,ref_DataProvider,att_Supplier) {
if (node.getValue(att_Supplier.getID()).getSimpleValue()) {
	var partner = manager.getEntityHome().getEntityByID(node.getValue(att_Supplier.getID()).getID());
	if (partner) {
		var partnerRef = node.queryReferences(ref_DataProvider).asList(10);
		if (partnerRef.size() > 0) {
			partnerRef.get(0).delete();
			node.createReference(partner, ref_DataProvider.getID());
		} else {
			node.createReference(partner, ref_DataProvider.getID());
		}
	}
}
}