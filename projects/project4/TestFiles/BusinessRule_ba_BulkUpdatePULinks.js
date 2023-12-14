/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_BulkUpdatePULinks",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Bulk Update PU Links",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article", "prd_GiftBoxArticle", "prd_PackagingUnitCase", "prd_PackagingUnitPack", "prd_PackagingUnitPallet" ],
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
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_NextLowerLevel",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_NextLowerLevel",
    "description" : null
  }, {
    "contract" : "CurrentObjectBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
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
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ptp_PartnerArticle",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ptp_PartnerArticle",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (ref_NextLowerLevel,node,prd_PackagingUnitEach,prd_PackagingUnitCase,prd_PackagingUnitPack,prd_PackagingUnitPallet,ptp_PartnerArticle) {
var article;
if (node.getObjectType().getID() == 'prd_PackagingUnitPack' ||
	node.getObjectType().getID() == 'prd_PackagingUnitCase' ||
	node.getObjectType().getID() == 'prd_PackagingUnitPallet') {
	article = node.getParent();
} else {
	article = node;
}

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

function deleteNextLowerLevelReferences(pu) {
	pu.queryReferences(ref_NextLowerLevel).forEach((reference) => {
		reference.delete()
	});
}

function getPartnerArticleNextLowerQuantity(pu) {
	var partnerArticle = null;
	pu.getReferences(ptp_PartnerArticle).forEach((reference) => {
		partnerArticle = reference.getTarget();
		return false;
	});

	if (pu.getObjectType() == "prd_PackagingUnitPallet") {
		logger.info('PU Pallet does not have quantity on next lower level');
		return null;
	}

	if (!partnerArticle) {
		logger.info('PU has no partner article linked. PU: ' + pu.getID());
		return null;
	}

	var result = 1;
	partnerArticle.getReferences(ref_NextLowerLevel).forEach((reference) => {
		result = reference.getValue("att_QuantityOfNextLowerLevel").getValue();
	});
	return result;
}

function createNextLowerLevelReference(pu, puNextLower) {
	var nextLowerLevelQuantity = getPartnerArticleNextLowerQuantity(pu);
	var ref = pu.createReference(puNextLower, ref_NextLowerLevel);
	ref.getValue("att_QuantityOfNextLowerLevel").setSimpleValue(nextLowerLevelQuantity);
}

var packagingUnits = article.getChildren().toArray();

// Get each, pack, case and pallet
var puEach = [];
var puPack = [];
var puCase = [];
var puPallet = [];

packagingUnits.forEach((packagingUnit) => {
	var puType = getPackagingUnitType(packagingUnit);

	if (puType == 'EACH') {
		puEach.push(packagingUnit);
	}
	if (puType == 'PACK') {
		puPack.push(packagingUnit);
	}
	if (puType == 'CASE') {
		puCase.push(packagingUnit);
	}
	if (puType == 'PALLET') {
		puPallet.push(packagingUnit);
	}
	packagingUnit
});

// Only run if there is a single straight hierarchy, with no splits
if (puEach.length > 1 || puPack.length > 1 || puCase.length > 1 || puPallet.length > 1) {
	logger.info('SPLIT FOUND !! exiting rule')
	return
}

// Clear all references
puEach.forEach((pu) => {
	deleteNextLowerLevelReferences(pu);
})
puPack.forEach((pu) => {
	deleteNextLowerLevelReferences(pu);
})
puCase.forEach((pu) => {
	deleteNextLowerLevelReferences(pu);
})
puPallet.forEach((pu) => {
	deleteNextLowerLevelReferences(pu);
})

// I'm using the array so that in future it's a bit easier to relink.

// Relink Pallet
if (puPallet.length > 0) {
	if (puCase.length > 0) {
		createNextLowerLevelReference(puPallet[0], puCase[0]);
	} else
		if (puPack.length > 0) {
			createNextLowerLevelReference(puPallet[0], puPack[0]);
		} else
			if (puEach.length > 0) {
				createNextLowerLevelReference(puPallet[0], puEach[0]);
			}
}

// Relink Case
if (puCase.length > 0) {
	logger.info('linking case');
	if (puPack.length > 0) {
		createNextLowerLevelReference(puCase[0], puPack[0]);
	} else
		if (puEach.length > 0) {
			createNextLowerLevelReference(puCase[0], puEach[0]);
		}
}

// Relink Pack
if (puPack.length > 0) {
	if (puEach.length > 0) {
		createNextLowerLevelReference(puPack[0], puEach[0]);
	}
}

// Link each to article ¯\_(ツ)_/¯
if (puEach.length > 0) {
	createNextLowerLevelReference(puEach[0], puEach[0].getParent());
}
}