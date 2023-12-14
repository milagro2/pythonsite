/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SetPUPriceOnDC",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Set Packaging Unit Price on Data Container",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_PackagingUnitCase", "prd_PackagingUnitEach", "prd_PackagingUnitPack", "prd_PackagingUnitPallet" ],
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
    "contract" : "AttributeBindContract",
    "alias" : "att_CosmosPricePurchase",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_CosmosPricePurchase",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_PricingValidityStartDate",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_PricingValidityStartDate",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_PurchasePrice",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_PurchasePrice",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_PricingPackUnit",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_PricingPackUnit",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_CosmosPriceCharges",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_CosmosPriceCharges",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_CosmosPriceSales",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_CosmosPriceSales",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_ChargePrice",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ChargePrice",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_SalesPrice",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_SalesPrice",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,manager,att_CosmosPricePurchase,att_PricingValidityStartDate,att_PurchasePrice,att_PricingPackUnit,att_CosmosPriceCharges,att_CosmosPriceSales,att_ChargePrice,att_SalesPrice) {
/*Set Packaging Unit Price on Data Container
 * Bindings:
 *
 */
updateDataContainers(att_CosmosPricePurchase.getID(), att_PurchasePrice.getID());
updateDataContainers(att_CosmosPriceCharges.getID(), att_ChargePrice.getID());
updateDataContainers(att_CosmosPriceSales.getID(), att_SalesPrice.getID());


function updateDataContainers(multiValueBaseAtt, priceInfoAtt) {
	//get the multi values
	var pricePurchaseValues = node.getValue(multiValueBaseAtt).getValues().toArray();
	for (var pp in pricePurchaseValues) {
		/*The value found on the attribute will consist of a date and a price combined with
		 * the following layout yyy-mm-dd | ##.#### (number of digits for the price is just an example).
		 * Retrieve the date information part and search for a data container (dct_PriceInformation)
		 * on the node that has the same value on the attribute att_PricingValidityStartDate.
		 */
		 var pricePurchase = pricePurchaseValues[pp].getSimpleValue();
		 var spiltValues = pricePurchase.split('\\|');
		 var date = spiltValues[0];
		 var price = spiltValues[1].trim();
		 if (date) {
		 	var sdf = new java.text.SimpleDateFormat('yyyy-MM-dd');
		 	var date = sdf.format(sdf.parse(date));
		 	var found = false;
			 var itr = node.getDataContainerByTypeID('dct_PriceInformation').getDataContainers().iterator();
			 while (itr.hasNext()) {
			 	var dataContainer = itr.next().getDataContainerObject();
			 	var pricingDate = dataContainer.getValue(att_PricingValidityStartDate.getID()).getSimpleValue();
			 	if (pricingDate.equals(date)) {
			 		dataContainer.getValue(priceInfoAtt).setSimpleValue(price);
			 		found = true;
			 	}
			 }
			 if (!found) {
			 	var keyHome = manager.getHome(com.stibo.core.domain.datacontainerkey.keyhome.DataContainerKeyHome);
			 	var dataContainerBuilder = keyHome.getDataContainerKeyBuilder('dct_PriceInformation');
			 	dataContainerBuilder.withAttributeValue(att_PricingPackUnit.getID(),node.getID());
				dataContainerBuilder.withAttributeValue(att_PricingValidityStartDate.getID(),date);
				var key = dataContainerBuilder.build();
				var newDC = node.getDataContainerByTypeID('dct_PriceInformation').addDataContainer().createDataContainerObjectWithKey(key);
				newDC.getValue(att_PurchasePrice.getID()).setSimpleValue(price);
			 }
		 }
	}
}
}