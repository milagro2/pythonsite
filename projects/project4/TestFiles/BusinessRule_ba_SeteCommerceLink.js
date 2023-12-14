/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SeteCommerceLink",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Set eCommerce Link",
  "description" : "Set to yes for all PU's with VVLV set to yes and eCom validation is ok",
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article", "prd_BundleArticle", "prd_GiftBoxArticle" ],
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
    "alias" : "att_eCom",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_eCom",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_CreateVVLV",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_CreateVVLV",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_Stroom",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_Stroom",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,att_eCom,att_CreateVVLV,att_Stroom) {
var objectType = node.getObjectType().getID();

if (objectType.equals('prd_BundleArticle')) {
	var stroom = node.getValue(att_Stroom.getID()).getSimpleValue();
	if (stroom== 'DC') {
			var createVVLV = node.getValue(att_CreateVVLV.getID()).getLOVValue();

			if (createVVLV) {
				var createVVLVID = createVVLV.getID();

				if (createVVLVID == '-1') {
					node.getValue(att_eCom.getID()).setLOVValueByID('-1');
				} else {
					node.getValue(att_eCom.getID()).setLOVValueByID('0');
				}
			}
	}
} else {
	var children = node.queryChildren().asList(10);
	if (children.size()>0) {
		node.queryChildren().forEach(function(child) {
		var stroom = child.getValue(att_Stroom.getID()).getSimpleValue();

			if (stroom== 'DC') {
				var createVVLV = child.getValue(att_CreateVVLV.getID()).getLOVValue();

				if (createVVLV) {
					var createVVLVID = createVVLV.getID();

					if (createVVLVID == '-1') {
						child.getValue(att_eCom.getID()).setLOVValueByID('-1');
					} else {
						child.getValue(att_eCom.getID()).setLOVValueByID('0');
					}
				} return true;
			} return true;
		});
	}
}
}