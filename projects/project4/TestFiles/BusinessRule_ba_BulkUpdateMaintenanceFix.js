/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_BulkUpdateMaintenanceFix",
  "type" : "BusinessAction",
  "setupGroups" : [ "sg_BulkUpdates" ],
  "name" : "Bulk Update Maintenance Fix",
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
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "CurrentObjectBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (manager,node) {
// DEPENDENCIES
var atg_TIIArticle_Logistics = manager.getAttributeGroupHome().getAttributeGroupByID("atg_TIIArticle_Logistics");
var atg_TIIPack_Logistics = manager.getAttributeGroupHome().getAttributeGroupByID("atg_TIIPack_Logistics");
var atg_TIIArticle_VisualCheck = manager.getAttributeGroupHome().getAttributeGroupByID("atg_TIIArticle_VisualCheck");
var atg_TIIPack_VisualCheck = manager.getAttributeGroupHome().getAttributeGroupByID("atg_TIIPack_VisualCheck");
var date = new Date().toLocaleString('nl', {timeZone: 'Europe/Amsterdam'});
var keyHome = manager.getHome(com.stibo.core.domain.datacontainerkey.keyhome.DataContainerKeyHome);
var CONST_OWNER_LOGISTICS = "logistics";
var CONST_OWNER_COMMERCIAL = "commercial";

// HELPER FUNCTIONS
function fetchAttributeGroupItems(attributeGroup) {
	var results = [];

	// Fetch attributes
	attributeGroup.getAttributes().toArray().forEach(function (attribute) {
		results.push({ "type": "attribute", "instance": attribute })
	});
	// Fetch links
	attributeGroup.getLinkTypes().toArray().forEach(function (link) {
		results.push({ "type": "link", "instance": link })
	});
	// Fetch datacontainers
	attributeGroup.getDataContainerTypes().toArray().forEach(function (datacontainer) {
		results.push({ "type": "datacontainer", "instance": datacontainer })
	})
	// Recurse for children groups
	attributeGroup.getChildren().toArray().forEach(function (child) {
		fetchAttributeGroupItems(child).forEach(function (childResult) {
			results.push(childResult)
		})
	})

	return results;
}

// Set up a reusable array of logistic properties
var logisticsProperties = [];
fetchAttributeGroupItems(atg_TIIArticle_Logistics).forEach((property) => { logisticsProperties.push(property["instance"].getID()); })
fetchAttributeGroupItems(atg_TIIPack_Logistics).forEach((property) => { logisticsProperties.push(property["instance"].getID()); })

function getPropertyOwner(property) {
	// Check if property is in the logistics array
	return logisticsProperties.indexOf(property.getID()) > 0 ? CONST_OWNER_LOGISTICS : CONST_OWNER_COMMERCIAL;
}

function getNormalizedValue(value) {
	function endsWith(value, suffix) {
		return value.indexOf(suffix, value.length - suffix.length) !== -1;
	};

	function getUnitValue(input) {
		if (!input) {
			return 0
		}
		if (typeof input != 'string') {
			input = input + "";
		}
		return input.replace(/[^\d.-]/g, '');;
	}

	function joinParts(value, unit) {
		return value + " " + unit;
	};

	function normalizeNumberString(numberString, decimalPlaces) {

		if (typeof numberString != 'string') {
			numberString = numberString + "";
		}

		var parts = numberString.split('.');
		var integerPart = parts[0];
		var decimalPart = parts[1] || "";

		// Pad the decimal part with zeros if necessary
		while (decimalPart.length < decimalPlaces) {
			decimalPart += "0";
		}

		// Truncate or round the decimal part to the desired length
		decimalPart = decimalPart.substring(0, decimalPlaces);

		// Combine the integer and decimal parts
		var result = integerPart + (decimalPart.length > 0 ? "." : "") + decimalPart;

		return result;
	}

	// Convert to string
	value = value + "";

	// Lowercase
	value = value.toLowerCase();

	// Conversion - length
	if (endsWith(value, "mm")) {
		var valueNew = normalizeNumberString(getUnitValue(value) / 10, 2);
		return joinParts(valueNew, "cm");
	}
	if (endsWith(value, "cm")) {
		var valueNew = normalizeNumberString(getUnitValue(value), 2);
		return joinParts(valueNew, "cm");
	}

	// Conversion - weight
	if (endsWith(value, "mg")) {
		var valueNew = normalizeNumberString(getUnitValue(value) / 1000000, 3);
		return joinParts(valueNew, "kg");
	}
	if (endsWith(value, " g")) {
		var valueNew = normalizeNumberString(getUnitValue(value) / 1000, 3);
		return joinParts(valueNew, "kg");
	}
	if (endsWith(value, "kg")) {
		var valueNew = normalizeNumberString(getUnitValue(value), 3);
		return joinParts(valueNew, "kg");
	}

	// Conversion - volume
	if (endsWith(value, "ml")) {
		var valueNew = normalizeNumberString(getUnitValue(value) / 10, 3);
		return joinParts(valueNew, "kg");
	}
	if (endsWith(value, "cl")) {
		var valueNew = normalizeNumberString(getUnitValue(value), 3);
		return joinParts(valueNew, "cl");
	}
	if (endsWith(value, " l")) {
		var valueNew = normalizeNumberString(getUnitValue(value) * 100, 3);
		return joinParts(valueNew, "cl");
	}

	// Conversion - normal numbers
	if (isNaN(parseInt(value)) == false) {
		// If float
		if (parseInt(value) != parseFloat(value)) {
			return normalizeNumberString(value, 2);
		}

		// If int
		return value;
	}

	return value;
}

function getAttributeValue(node, attribute, workspace) {
	if (workspace == "Main") {
		var value = node.getValue(attribute.getID());
		return node.getValue(attribute.getID()).getSimpleValue();
	}
	if (workspace == "Approved") {
		var value;
		manager.executeInWorkspace('Approved', function (approvedManager) {
			var approvedNode = approvedManager.getProductHome().getProductByID(node.getID());
			if (!approvedNode) {
				value = null;
			} else {
				value = approvedNode.getValue(attribute.getID()).getSimpleValue();
			}
		});
		return value;
	}
	throw new Error("Unknown workspace: " + workspace);
}

function getReferenceValue(node, referenceType, workspace) {
	if (workspace == "Main") {
		var value = "";
		node.queryReferences(referenceType).forEach(function (reference) {
			value += reference.getTarget().getName();
			return true;
		});
		return value;
	}
	if (workspace == "Approved") {
		var value = "";
		manager.executeInWorkspace('Approved', function (approvedManager) {
			var approvedNode = approvedManager.getProductHome().getProductByID(node.getID());
			if (approvedNode) {
				approvedNode.queryReferences(referenceType).forEach(function (reference) {
					value += reference.getTarget().getName();
					return true;
				});
			}
		});
		return value;
	}
	throw new Error("Unknown workspace: " + workspace);
}

function getDataContainerValue(node, dataContainerType, workspace) {
	if (workspace == "Main") {
		var values = [];
		node.getDataContainerByTypeID(dataContainerType.getID()).getDataContainers().forEach(function (singleDataContainer) {
			var dict = {};
			singleDataContainer.getDataContainerObject().getValues().forEach(function(value) {
				dict[value.getAttribute().getName()] = value.getSimpleValue() + "";
			});
			values.push(dict);
		});
		return JSON.stringify(values);
	}
	if (workspace == "Approved") {
		var values = [];
		manager.executeInWorkspace('Approved', function (approvedManager) {
			var approvedNode = approvedManager.getProductHome().getProductByID(node.getID());
			if (approvedNode) {
				var dict = {};
				approvedNode.getDataContainerByTypeID(dataContainerType.getID()).getDataContainers().forEach(function (singleDataContainer) {
					singleDataContainer.getDataContainerObject().getValues().forEach(function(value) {
						dict[value.getAttribute().getName()] = value.getSimpleValue() + "";
					});
				});
				values.push(dict);
			}
		});
		return JSON.stringify(values);
	}
	throw new Error("Unknown workspace: " + workspace);
}

function getPropertyDelta(property, tradeItem, gallItem) {
	var valueOld = null;
	var valueNew = null;
	var valueGallItem = null;

	if (property instanceof com.stibo.core.domain.Attribute) {
		valueOld = getAttributeValue(tradeItem, property, "Approved");
		valueNew = getAttributeValue(tradeItem, property, "Main");
		valueGallItem = getAttributeValue(gallItem, property, "Main");

		// Normalize values
		valueOld = getNormalizedValue(valueOld);
		valueNew = getNormalizedValue(valueNew);
		valueGallItem = getNormalizedValue(valueGallItem);
	}

	if (property instanceof com.stibo.core.domain.ReferenceType) {
		// TODO: Think about scenarios where there are multiple references.
		// Currently if there are multiple references for the same ref
		// the string returned will be a concatenation of the names
		valueOld = getReferenceValue(tradeItem, property, "Approved");
		valueNew = getReferenceValue(tradeItem, property, "Main");
		valueGallItem = getReferenceValue(gallItem, property, "Main");
	}

	if (property instanceof com.stibo.core.domain.datacontainertype.DataContainerType) {
		valueOld = getDataContainerValue(tradeItem, property, "Approved");
		valueNew = getDataContainerValue(tradeItem, property, "Main");
		valueGallItem = getDataContainerValue(gallItem, property, "Main");

		// TODO: We can do this better.
		// At this point we have serialized values for the datacontainer type.
		// But this could be a complicated diff with multiple instances, and
		// multiple changes to multiple attributes across each instance.

		// So we only check if they are different, and if they are we set some 
		// dummy change type to show in the maintenance flow table.
		if (valueOld != valueNew && valueNew != valueGallItem) {
			// If a change should be shown, then use different values.
			valueOld = "*";
			valueNew = "?";
			valueGallItem = "!";
		} else {
			// If no change should be shown, use the same values.
			valueOld = "*";
			valueNew = "*";
			valueGallItem = "*";
		}
	}

	// If there is no change, return null
	if (valueOld === valueNew) {
		return null;
	}

	// If the new value is the same as the gall item value, return null
	if (valueNew === valueGallItem) {
		return null;
	}

	// Otherwise return the values
	return {
		propertyId: property.getID(),
		propertyName: property.getName(),
		propertyOwner: getPropertyOwner(property),
		old: valueOld,
		new: valueNew,
		item: valueGallItem
	}
}

function getAttributeGroupForGallItem(gallItem) {
	var gallItemType = gallItem.getObjectType().getID() + "";

	// An article has it's own group.
	if (gallItemType === "prd_Article" || gallItemType === "prd_GiftBoxArticle") {
		var atg_TIIArticle_VisualCheck = manager.getAttributeGroupHome().getAttributeGroupByID("atg_TIIArticle_VisualCheck");
		return atg_TIIArticle_VisualCheck;
	}
	// Packaging units have their own group.
	if (gallItemType === "prd_PackagingUnitEach"
		|| gallItemType === "prd_PackagingUnitPack"
		|| gallItemType === "prd_PackagingUnitCase"
		|| gallItemType === "prd_PackagingUnitPallet"
	) {
		var atg_TIIArticle_VisualCheck = manager.getAttributeGroupHome().getAttributeGroupByID("atg_TIIPack_VisualCheck");
		return atg_TIIArticle_VisualCheck;
	}

	// If we could not find an attribute group for the type something is wrong.
	throw new Error("No attribute group found for type " + gallItemType)
}

function getDeltas(tradeItem, gallItem, attributeGroup) {
	// Get attribute group properties
	var properties = fetchAttributeGroupItems(attributeGroup);

	// Set up result array
	var result = [];
	// For each property in the group
	for (var propertyIndex in properties) {
		var property = properties[propertyIndex]["instance"];
		var delta = getPropertyDelta(property, tradeItem, gallItem);

		// If there is a delta on the tradeitem
		if (delta) {
			result.push(delta);
		}
	}

	return result;
}

function deltasMerge(deltasOld, deltasNew) {

	// Get current deltas
	var deltaDictionary = {};
	deltasOld.forEach(function (delta) { deltaDictionary[delta['propertyId']] = delta })

	// Add new deltas
	for (var deltaIndex in deltasNew) {
		var deltaValue = deltasNew[deltaIndex];
		var deltaPropertyId = deltaValue['propertyId'];

		// If there is already an entry, update the new value & date
		if (deltaDictionary[deltaPropertyId]) {
			deltaDictionary[deltaPropertyId]['new'] = deltaValue['new'];
		} else {
			deltaDictionary[deltaPropertyId] = deltaValue;
		}

		// Update date
		deltaDictionary[deltaPropertyId]['date'] = date;
	}

	// Return array
	var result = []
	Object.keys(deltaDictionary).forEach(function(deltaKey) {
		var deltaValue = deltaDictionary[deltaKey];
		result.push(deltaValue);
	})
	return result;
}

function deltasFromDataContainer(gallItem) {
	var deltas = [];
	gallItem.getDataContainerByTypeID("dct_TIMSUpdateLog").getDataContainers().forEach(function (singleDataContainer) {
		var propertyId = singleDataContainer.getDataContainerObject().getValue("att_ComponentID").getSimpleValue();
		var propertyName = singleDataContainer.getDataContainerObject().getValue("att_ComponentTitle").getSimpleValue();
		var propertyOwner = singleDataContainer.getDataContainerObject().getValue("att_TIMSChangeType").getSimpleValue();
		var valueOld = singleDataContainer.getDataContainerObject().getValue("att_TIMSOldValue").getSimpleValue();
		var valueNew = singleDataContainer.getDataContainerObject().getValue("att_TIMSNewValue").getSimpleValue();
		var valueGallItem = singleDataContainer.getDataContainerObject().getValue("att_ProductValue").getSimpleValue();
		var changeDate = singleDataContainer.getDataContainerObject().getValue("att_TIMSChangeDate").getSimpleValue();
		
		deltas.push({
			propertyId: propertyId,
			propertyName: propertyName,
			propertyOwner: propertyOwner,
			old: valueOld,
			new: valueNew,
			item: valueGallItem,
			date: changeDate
		})
		return true;
	});
	return deltas;
}

function deltasToDataContainer(gallItem, deltas) {
	// Clear current data containers
	gallItem.getDataContainerByTypeID("dct_TIMSUpdateLog").getDataContainers().forEach(function (singleDataContainer) {
		singleDataContainer.deleteLocal();
	});

	// Write out deltas
	deltas.forEach(function (delta) {
		var dataContainerBuilder = keyHome.getDataContainerKeyBuilder("dct_TIMSUpdateLog");
		dataContainerBuilder.withAttributeValue("att_ComponentID", delta['propertyId']);
		dataContainerBuilder.withAttributeValue("att_TIMSTradeItemDescriptor", gallItem.getObjectType().getName() + "");

		var dc = gallItem.getDataContainerByTypeID("dct_TIMSUpdateLog").addDataContainer();
		var dcObject = dc.createDataContainerObjectWithKey(dataContainerBuilder.build());

		dcObject.getValue("att_ComponentID").setValue(delta['propertyId']);
		dcObject.getValue("att_ComponentTitle").setValue(delta['propertyName']);
		dcObject.getValue("att_TIMSChangeType").setValue(delta['propertyOwner']);
		dcObject.getValue("att_TIMSOldValue").setValue(delta['old']);
		dcObject.getValue("att_TIMSNewValue").setValue(delta['new']);
		dcObject.getValue("att_ProductValue").setValue(delta['item']);
		dcObject.getValue("att_TIMSChangeDate").setValue(delta['date']);
	});
}

function deltasToString(deltas) {
	var result = "";
	deltas.forEach(function (delta) {
		result += delta['propertyName'] + ": ";
		result += "Huidig " + "'" + delta["item"] + "'" + " : ";
		result += "Nieuw " + "'" + delta["new"] + "'" + "<br>";
	})
	return result;
}

// #######################################
// ENTRYPOINT
// #######################################

// Converters
function convertOwner(ownerOld) {
	if (ownerOld == "Logistic") {
		return CONST_OWNER_LOGISTICS
	}
	if (ownerOld == "Commercial") {
		return CONST_OWNER_COMMERCIAL
	}
	if (ownerOld == CONST_OWNER_LOGISTICS) {
		return CONST_OWNER_LOGISTICS
	}
	if (ownerOld == CONST_OWNER_COMMERCIAL) {
		return CONST_OWNER_COMMERCIAL
	}

	throw new Error("No matching owner for " + ownerOld)
}

function convertDate(dateOld){
	return new Date(dateOld).toLocaleString('nl', {timeZone: 'Europe/Amsterdam'});
}

// Article is node
var article = node;

// If article in create workflow, ignore;
if (article.isInWorkflow('wf_CreateArticle') || article.isInWorkflow('wf_CreateArticleOther')) {
	return;
}

// Get deltas
var deltas = deltasFromDataContainer(article);
var deltasNew = [];

// For each delta
deltas.forEach(function (delta) {
	var propertyId = delta['propertyId'];
	var propertyName = delta['propertyName'];
	var propertyOwner = convertOwner(delta['propertyOwner']);
	var changeDate = convertDate(delta['date']);
	var valueOld = delta['old'];
	var valueNew = delta['new'];
	var valueGallItem = delta['item'];

    // if (delta['propertyId'].lastIndexOf('att_', 0) == 0) {
    //     logger.info('attribute')
	// 	valueOld = delta['old'];
	// 	valueNew = delta['new'];
	// 	valueGallItem = delta['item'];

	// 	valueOld = getNormalizedValue(valueOld);
	// 	valueNew = getNormalizedValue(valueNew);
	// 	valueGallItem = getNormalizedValue(valueGallItem);
    // }
    // if (delta['propertyId'].lastIndexOf('ref_', 0) == 0) {
    //     logger.info('reference')
	// 	valueOld = delta['old'];
	// 	valueNew = delta['new'];
	// 	valueGallItem = delta['item'];
	// }
    // if (delta['propertyId'].lastIndexOf('dct_', 0) == 0) {
    //     logger.info('data container')
    // }

	// if (valueOld == valueNew) {
	// 	return;
	// }

	// if (valueNew == valueGallItem) {
	// 	return;
	// }

	deltasNew.push({
		propertyId: propertyId,
		propertyName: propertyName,
		propertyOwner: propertyOwner,
		old: valueOld,
		new: valueNew,
		item: valueGallItem,
		date: changeDate
	})
});

// Save new datacontainers
deltasToDataContainer(article, deltasNew)

// // Get deltas
// var deltasCurrent = deltasNew // deltasFromDataContainer(article);

// // Log new deltas
// deltasCurrent.forEach(function(delta) {
// 	logger.info(delta['propertyName']);
// 	logger.info('old: ' + delta['old']);
// 	logger.info('new: ' + delta['new']);
// 	logger.info('item: ' + delta['item']);
// 	logger.info('date: ' + delta['date']);
// 	logger.info('owner: ' + delta['propertyOwner']);
// 	logger.info('----');
// })

// // Put article into WF (if not already)
// var wfInstance = null;
// if (article.isInWorkflow('wf_UpdateExistingArticle')) {
// 	wfInstance = article.getWorkflowInstanceByID('wf_UpdateExistingArticle');
// } else {
// 	wfInstance = article.startWorkflowByID('wf_UpdateExistingArticle', 'Initiated based on trade item change');
// }

// // Update changes variables
// var deltasCommercial = deltasCurrent.filter(function (delta) { return delta['propertyOwner'] == CONST_OWNER_COMMERCIAL });
// var deltasLogistics = deltasCurrent.filter(function (delta) { return delta['propertyOwner'] == CONST_OWNER_LOGISTICS });

// wfInstance.setSimpleVariable("commercialChanges", deltasToString(deltasCommercial));
// wfInstance.setSimpleVariable("logisticChanges", deltasToString(deltasLogistics));

// logger.info(deltasCommercial.length)
// logger.info(deltasLogistics.length)

// if (deltasCommercial.length == 0 && deltasLogistics.length == 0) {
// 	logger.info("Trying to delete WF Instance")
// 	wfInstance.delete("ba_BulkUpdateMaintenanceFix: No changes.")
// }
}