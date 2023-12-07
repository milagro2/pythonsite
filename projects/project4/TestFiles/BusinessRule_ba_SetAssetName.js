/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SetAssetName",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_AssetRelatedActions" ],
  "name" : "Set Asset Name",
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
  "pluginId" : "JavaScriptBusinessActionWithBinds",
  "binds" : [ {
    "contract" : "CurrentObjectBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_PrimaryProductImage",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_PrimaryProductImage",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_GlobalTradeIdentificationNumber",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_GlobalTradeIdentificationNumber",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_PriceLookUp",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_PriceLookUp",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_AssetOrientation",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_AssetOrientation",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_ItemNumber",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ItemNumber",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,ref_PrimaryProductImage,att_GlobalTradeIdentificationNumber,att_PriceLookUp,att_AssetOrientation,att_ItemNumber) {
node.queryReferences(ref_PrimaryProductImage).forEach(function (ref) {
	var asset = ref.getTarget();
		if (asset) {
			var orientation = asset.getValue(att_AssetOrientation.getID()).getLOVValue();


			if (orientation) {
				orientation = orientation.getValue();
			} else {
				//If no orientation has been found, default it to front.
				asset.getValue(att_AssetOrientation.getID()).setLOVValueByID(1);
				orientation = 'Front';
			}

			var itemNumber = node.getValue(att_ItemNumber.getID()).getSimpleValue();

			if (!itemNumber) {
				// we need to retrieve article number from the PU_each.
				node.queryChildren().forEach(function(pu) {
					if (pu.getObjectType().getID() == 'prd_PackagingUnitEach') {
						itemNumber = pu.getValue(att_ItemNumber.getID()).getSimpleValue();
					}
					return true;
				});
			}

			var name = asset.setName(itemNumber + '_' + orientation);
			try {
				asset.approve();
			} catch (e) {
				throw e;
			}
		}
		return true;
});
}