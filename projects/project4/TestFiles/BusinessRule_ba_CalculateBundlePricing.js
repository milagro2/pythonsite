/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_CalculateBundlePricing",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Calculate Bundle Pricing",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_BundleArticle" ],
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
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_BundleComponent",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_BundleComponent",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_AvailabilityStartDateDesc",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_AvailabilityStartDateDesc",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_AvailabilityEndDateDes",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_AvailabilityEndDateDes",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_Quantity",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_Quantity",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_PricingValidityStartDate",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_PricingValidityStartDate",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_PricingValidityEndDate",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_PricingValidityEndDate",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_SalesPrice",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_SalesPrice",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_PurchasePrice",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_PurchasePrice",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_InitialSalesPrice",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_InitialSalesPrice",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_InitialPurchasePrice",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_InitialPurchasePrice",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,ref_BundleComponent,att_AvailabilityStartDateDesc,att_AvailabilityEndDateDes,att_Quantity,att_PricingValidityStartDate,att_PricingValidityEndDate,att_SalesPrice,att_PurchasePrice,att_InitialSalesPrice,att_InitialPurchasePrice) {
var sdf = new java.text.SimpleDateFormat('yyyy-MM-dd');
var today = sdf.format(new Date());
var salesPricesList = new java.util.ArrayList();
var purchasePricesList = new java.util.ArrayList();

var references = node.queryReferences(ref_BundleComponent).asList(10);
if (references.size()>0) {
	node.queryReferences(ref_BundleComponent).forEach(function(reference) {
		var validComponent = false;
		var component = reference.getTarget();
		var startDate = reference.getValue(att_AvailabilityStartDateDesc.getID()).getSimpleValue();
		var endDate = reference.getValue(att_AvailabilityEndDateDes.getID()).getSimpleValue();
		var quantity = reference.getValue(att_Quantity.getID()).getSimpleValue();
		log.info(startDate);
		if (startDate) {
			var startDateParsed = sdf.format(sdf.parse(startDate));
			if (endDate) {
				var endDateParsed = sdf.format(sdf.parse(endDate));
				if (startDateParsed<today && endDateParsed>today) {
					validComponent = true;
				}
			} else if (startDateParsed<today) {
				validComponent = true;
			}
		}
		if (validComponent == true) {
			log.info(component.getID());
			var containers = component.getDataContainerByTypeID('dct_PriceInformation').getDataContainers().iterator();
			while (containers.hasNext()) {
				var validPrice = false;
				var containerObject = containers.next().getDataContainerObject();
				var containerStartDate = containerObject.getValue(att_PricingValidityStartDate.getID()).getSimpleValue();
				var containerEndDate = containerObject.getValue(att_PricingValidityEndDate.getID()).getSimpleValue();
				var containerSalesPrice = containerObject.getValue(att_SalesPrice.getID()).getValue();
				var containerPurchasePrice = containerObject.getValue(att_PurchasePrice.getID()).getValue();
				if (containerStartDate) {
					var containerStartDateParsed = sdf.format(sdf.parse(containerStartDate));
					if (containerEndDate) {
						var containerEndDateParsed = sdf.format(sdf.parse(containerEndDate));
						if (containerStartDateParsed<today && containerEndDate>today) {
							validPrice = true;
						}
					} else {
						validPrice = true;
					}
				}
				if (validPrice == true) {
					if (quantity && containerSalesPrice) {
						salesPricesList.add(quantity*containerSalesPrice);
					}
					if (quantity && containerPurchasePrice) {
						purchasePricesList.add(quantity*containerPurchasePrice);
					}
				}
			}
		}
		return true;
	});
	var salesPrice = sumPrice(salesPricesList).toFixed(4);
	var purchasePrice = sumPrice(purchasePricesList).toFixed(4);
	if (salesPrice>0) {
		node.getValue(att_InitialSalesPrice.getID()).setValue(salesPrice);
	}
	if (purchasePrice>0) {
		node.getValue(att_InitialPurchasePrice.getID()).setValue(purchasePrice);
	}
}

function sumPrice(list) {
	var totalPrice = 0;
	var listIterator = list.iterator();
	while (listIterator.hasNext()) {
		var price = listIterator.next();
		totalPrice = totalPrice + Number(price);
	}
	return totalPrice;
}
}