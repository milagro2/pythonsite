/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_AssignOperationalRoles",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Assign Operational Roles",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article", "prd_GiftBoxArticle", "prd_PackagingUnitCase", "prd_PackagingUnitPack", "prd_PackagingUnitPallet" ],
  "allObjectTypesValid" : false,
  "runPrivileged" : false,
  "onApprove" : "Never",
  "dependencies" : [ {
    "libraryId" : "lib_ValueList",
    "libraryAlias" : "lib_ValueList"
  } ]
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
    "alias" : "att_Stroom",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_Stroom",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_Longtail",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_Longtail",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_OperationalPackagingRoles",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_OperationalPackagingRoles",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_ProductType",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ProductType",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_PackagingUnitEach",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_PackagingUnitEach",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_PackagingUnitCase",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_PackagingUnitCase",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_PackagingUnitPack",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_PackagingUnitPack",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_PackagingUnitPallet",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_PackagingUnitPallet",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_NetContents",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_NetContents",
    "description" : null
  }, {
    "contract" : "UnitBindContract",
    "alias" : "unece_unit_MLT",
    "parameterClass" : "com.stibo.core.domain.impl.UnitImpl",
    "value" : "unece.unit.MLT",
    "description" : null
  }, {
    "contract" : "UnitBindContract",
    "alias" : "unece_unit_CLT",
    "parameterClass" : "com.stibo.core.domain.impl.UnitImpl",
    "value" : "unece.unit.CLT",
    "description" : null
  }, {
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_InitialSalesPrice",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_InitialSalesPrice",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,att_Stroom,att_Longtail,att_OperationalPackagingRoles,att_ProductType,prd_PackagingUnitEach,prd_PackagingUnitCase,prd_PackagingUnitPack,prd_PackagingUnitPallet,att_NetContents,unece_unit_MLT,unece_unit_CLT,manager,att_InitialSalesPrice,lib_ValueList) {
/*
  STEPDOC:
  This BR assigns an operational role based on
  the stream, product type, packaging unit types etc...

  This BR is run twice currently. Once after PU creation and once after enrichment.
*/

/*
  Reasoning...
  Always:
  * Pallets are DISPLAY

  Stroom==DC AND Longtail==false:
  * Largest PU is always LOGISTICAL
  * Each is always CONSUMER
  * PUs < largestPU is always CONSUMER
  * If WINE and sub15euro then PACK or CASE, can also be CONSUMER

  ELSE:
  * Each is always CONSUMER
  * Each is always LOGISTICAL
  * All other PUs are DISPLAY
*/
var valueList = lib_ValueList.getValueList();

var article;
if (node.getObjectType().getID() == 'prd_PackagingUnitPack' || 
	node.getObjectType().getID() == 'prd_PackagingUnitCase'||
	node.getObjectType().getID() == 'prd_PackagingUnitPallet') {
	article = node.getParent();
} else {
	article = node;
}

// Helper code
function getPackagingUnitType(packagingUnitNode) {
	var packagingUnitType = '';
	switch (String(packagingUnitNode.getObjectType().getID())) {
		case String(prd_PackagingUnitEach.getID()):
			packagingUnitType = 'EACH';
			break;
		case String(prd_PackagingUnitCase.getID()):
			packagingUnitType = 'CASE';
			break;
		case String(prd_PackagingUnitPack.getID()):
			packagingUnitType = 'PACK';
			break;
		case String(prd_PackagingUnitPallet.getID()):
			packagingUnitType = 'PALLET';
			break;
		default:
			throw new Error('Could not find PU type');
	}
	return packagingUnitType;
}

function getMillilitres(volume, unit) {
	if (unit == String(unece_unit_MLT)) {
		return volume;
	}
	if (unit == String(unece_unit_CLT)) {
		return volume * 10;
	}
	return;
}

function getPackagingUnitSize(packagingUnitType) {
  var sizeMap = {
    'EACH': 1,
    'PACK': 2,
    'CASE': 3,
    'PALLET': 4,	
  }
  var result = sizeMap[packagingUnitType]
  if (!result) {
    throw new Error('Could not find PU size');
  }
  return result
}

function getLargestPU(articleNode) {
  var articleChildren = articleNode.getChildren().toArray();
  var result = { type: 'NA', size: 0 }
  for (var childKey in articleChildren) {
    var child = articleChildren[childKey];
    childType = getPackagingUnitType(child);
    childSize = getPackagingUnitSize(childType);
    if (childSize > result['size'] && childType != 'PALLET') {
      result = { type: childType, size: childSize }
    }
  }

  return result;
}


function setRoles(packagingUnit, consumer, logistical, display) {
  // If no roles were passed, mark as display
  display = display || !consumer && !logistical

  // Clean operational roles
  child.getValue(att_OperationalPackagingRoles.getID()).replace().apply();

  if (consumer) {
    packagingUnit.getValue(att_OperationalPackagingRoles.getID()).addLOVValueByID('isTradeItemAConsumerUnit');
  }
  if (logistical) {
    packagingUnit.getValue(att_OperationalPackagingRoles.getID()).addLOVValueByID('isTradeItemADespatchUnit');
  }
  if (display) {
    packagingUnit.getValue(att_OperationalPackagingRoles.getID()).addLOVValueByID('isTradeItemADisplayUnit');
  }
}

var articleStroom = article.getValue(att_Stroom.getID()).getSimpleValue();
var articleProductType = article.getValue(att_ProductType.getID()).getLOVValue().getID();
var articleLongtail = article.getValue(att_Longtail.getID()).getID() == '-1'; // -1 = YES
var articleChildren = article.getChildren().toArray();

// Get PU children
var articlePUs = {};
for (var childKey in articleChildren) {
	var child = articleChildren[childKey];
	childType = getPackagingUnitType(child);
	articlePUs[childType] = child;
}

// Ensure the article has an each
if (!articlePUs['EACH']) {
	throw new Error('No each on this article');
}

var hasPUOtherThanEach = articlePUs['CASE'] || articlePUs['PACK'];
var notWineSparklingBeerSoftdrinkNonFood =
	articleProductType != valueList.ProductType.Wijn &&
	articleProductType != valueList.ProductType.Mousserend &&
	articleProductType != valueList.ProductType.Beer &&
	articleProductType != valueList.ProductType.Soft_Drink &&
	articleProductType != valueList.ProductType.Non_Food;
var articleIsWineOrBubbling =
	articleProductType == valueList.ProductType.Wijn ||
	articleProductType == valueList.ProductType.Mousserend;
var articleIsBeerOrSoftdrink =
	articleProductType == valueList.ProductType.Beer ||
	articleProductType == valueList.ProductType.Soft_Drink;
var articleIsNonFood = articleProductType == valueList.ProductType.Non_Food;
var articleIsNonSellable = true

var netContent = articlePUs['EACH'].getValue(att_NetContents.getID()).getValue();
var netContentUnit = articlePUs['EACH'].getValue(att_NetContents.getID()).getUnit();
var netContentMl = getMillilitres(netContent, netContentUnit);
var salesPrice = att_InitialSalesPrice !== null ? articlePUs['EACH'].getValue(att_InitialSalesPrice.getID()).getValue() : null;
var articleLessThan15 = salesPrice ? salesPrice < 15 : false;
var largestPU = getLargestPU(article)

// Set operational roles
for (var childKey in articleChildren) {
  var child = articleChildren[childKey];
  var childType = getPackagingUnitType(child);
  var childSize = getPackagingUnitSize(childType);

  // If pallet
  if (childType == 'PALLET') {
    setRoles(child, false, false, true)
    continue;
  }
  
  // If irregular (RZ or longtail)
  if (articleStroom == valueList.Stream.RZ || articleLongtail) {
    var consumer = childType == 'EACH';
    var logistical = childType == 'EACH';
    setRoles(child, consumer, logistical, false);
    continue;
  }

  // If normal
  var consumer = 
    childType == 'EACH' || 
    childSize < largestPU['size'] || 
    ((childType == 'PACK' || childType == 'CASE') && articleLessThan15 && articleIsWineOrBubbling);

  var logistical = childSize == largestPU['size'];

  setRoles(child, consumer, logistical, false);
}
}