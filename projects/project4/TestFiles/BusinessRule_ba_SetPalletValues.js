/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SetPalletValues",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_SetValuesAndLinkes" ],
  "name" : "Set Pallet Values after comm enrichment",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article", "prd_GiftBoxArticle", "prd_PackagingUnitPallet" ],
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
    "contract" : "LoggerBindContract",
    "alias" : "log",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_ArticleDate",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ArticleDate",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_AvailabilityEndDate",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_AvailabilityEndDate",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_AvailabilityStartDate",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_AvailabilityStartDate",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_COSMOSLogisticLink",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_COSMOSLogisticLink",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_DCLink",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_DCLink",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_GrossWeight",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_GrossWeight",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_PackagingUnitEach",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_PackagingUnitEach",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_Stroom",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_Stroom",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_NextLowerLevel",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_NextLowerLevel",
    "description" : null
  }, {
    "contract" : "BusinessActionBindContract",
    "alias" : "ba_SetCorrectUnitForNumberAttributes",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessActionImpl",
    "value" : "ba_SetCorrectUnitForNumberAttributes",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_NetContents",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_NetContents",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_NetWeight",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_NetWeight",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_QuantityOfNextLowerLevel",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_QuantityOfNextLowerLevel",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_QuantityOfLayers",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_QuantityOfLayers",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_QuantityPerLayer",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_QuantityPerLayer",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "netContentStatementAtt",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_NetContentStatement",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "tradeItemRef",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ptp_PartnerArticle",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "puPalletObj",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_PackagingUnitPallet",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "posDescriptionAtt",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_POSDescription",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "productWidthAtt",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ProductWidth",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "productHeightAtt",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ProductHeight",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "productDepthAtt",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ProductDepth",
    "description" : null
  } ],
  "messages" : [ {
    "variable" : "aMessage",
    "message" : "Stroom changed from RZ to DC, but no pallet object created. Contact Bob.",
    "translations" : [ ]
  } ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,manager,log,att_ArticleDate,att_AvailabilityEndDate,att_AvailabilityStartDate,att_COSMOSLogisticLink,att_DCLink,att_GrossWeight,prd_PackagingUnitEach,att_Stroom,ref_NextLowerLevel,ba_SetCorrectUnitForNumberAttributes,att_NetContents,att_NetWeight,att_QuantityOfNextLowerLevel,att_QuantityOfLayers,att_QuantityPerLayer,netContentStatementAtt,tradeItemRef,puPalletObj,posDescriptionAtt,productWidthAtt,productHeightAtt,productDepthAtt,aMessage) {
//Based on input from https://jira-eu-aholddelhaize.atlassian.net/browse/GMDM-1648
//Creation of pallet object is done after creation of packaging hierarchy for Stroom = DC Articles. If nothing is retrieved from TIMS we create a Pallet Object with a GalL&Gall GTIN.

//First check if we are running from pallet object or article object.

var currentObject = node.getObjectType().getID();


//If we are not on packaging unit pallet, we find the pallet and set it to be the node.
if (currentObject != String(puPalletObj.getID())) {
	var children = node.getChildren().toArray();
	for (var x in children) {
		var child = children[x];
		if (child.getObjectType().getID().equals(puPalletObj.getID())) {
			node = child;
		}
	}
}

if (node.getObjectType().getID().equals(puPalletObj.getID())) {
	//Node = now always packaging unit pallet
	var parent = node.getParent();


	//Find each to copy some data
	var availEndDate;
	var stroom;
	var puEach;

	var parent = node.getParent();
	if ((parent.getObjectType().getID().equals('prd_Article')) || ((parent.getObjectType().getID().equals('prd_GiftBoxArticle')))) {
		var stroom = parent.getValue(att_Stroom.getID()).getLOVValue();
		ba_SetCorrectUnitForNumberAttributes.execute(parent);
		var children = parent.getChildren().toArray();
		for (var x in children) {
			var child = children[x];
			if (child.getObjectType().getID().equals(prd_PackagingUnitEach.getID())) {
				puEach = child;
				availEndDate = child.getValue(att_AvailabilityEndDate.getID()).getSimpleValue();
			}
		}
	}


	//Function Definitions;
	function findNumberOfEaches(node) {
		var totalEaches = 0;
		var contentStatement = '';
		// check if we have a existing objectType
		var objectTypeToFind = 'prd_PackagingUnitEach';
		var found = false;
		var source = node;

		do {
			var nextLowerLevelRefs = source.queryReferences(ref_NextLowerLevel).asList(1);
			var nextLowerLevel = nextLowerLevelRefs.get(0).getTarget();
			var nextLowerLevelQuantity = nextLowerLevelRefs.get(0).getValue(att_QuantityOfNextLowerLevel.getID()).getSimpleValue();
			if (contentStatement == '') {
				contentStatement += nextLowerLevelQuantity;
			} else {
				contentStatement += ' * ' + nextLowerLevelQuantity;
			}

			if (totalEaches == 0) {
				totalEaches = +nextLowerLevelQuantity;
			} else {
				totalEaches = totalEaches * +nextLowerLevelQuantity;
			}

			if ((String(nextLowerLevel.getObjectType().getID()).equals('prd_PackagingUnitEach'))) {
				var eachNetContent = nextLowerLevel.getValue(att_NetContents.getID()).getSimpleValue();
				log.info('found each');
				found = true;
				contentStatement += ' * ' + eachNetContent;
			} else {
				source = nextLowerLevel;
			}
		} while (!found);
		log.info(contentStatement);
		node.getValue(netContentStatementAtt.getID()).setSimpleValue(contentStatement);
	    return totalEaches;
	}

	//Date attributes
	function toISOStringLocal(d) {
	  function z(n) {
return (n<10?'0':'') + n;
}
	  return d.getFullYear() + '-' + z(d.getMonth()+1) + '-' + z(d.getDate());
	}


	//Identify if we have a trade item.

	var tradeItem = node.queryReferences(tradeItemRef).asList(10);
	var hasTradeItem = false;

	if (tradeItem.size() > 0) {
		hasTradeItem = true;
	}


	//Start setting values;
	//Article date and start date are always set to today.
	//node.getValue(articleDateAtt.getID()).setValue(toISOStringLocal(new Date()));
	//node.getValue(availStartDateAtt.getID()).setValue(toISOStringLocal(new Date()));


	if (availEndDate) {
		node.getValue(att_AvailabilityEndDate.getID()).setValue(availEndDate);
	}

	var cosmosLink = node.getValue(att_COSMOSLogisticLink.getID()).getLOVValue();

	if (cosmosLink) {
		var cosmosLinkID = cosmosLink.getID();
		if (cosmosLinkID == -1) {
			node.getValue(att_COSMOSLogisticLink.getID()).setLOVValueByID(0);
		}
	} else {
		node.getValue(att_COSMOSLogisticLink.getID()).setLOVValueByID(0);
	}

	//Set next lower level value
	var quantityOfLayers = +node.getValue(att_QuantityOfLayers.getID()).getSimpleValue();
	var quantityPerLayer = +node.getValue(att_QuantityPerLayer.getID()).getSimpleValue();
	var quantityResult = quantityOfLayers * quantityPerLayer;
	var nextLowerLevelRefs = node.queryReferences(ref_NextLowerLevel).asList(1);
	if (quantityResult) {
		nextLowerLevelRefs.get(0).getValue(att_QuantityOfNextLowerLevel.getID()).setSimpleValue(quantityResult);
	}
	var totalEaches = findNumberOfEaches(node);

	//Set Net Contents
	var netContentValue = node.getValue(att_NetContents.getID());
	if (netContentValue.isInherited() != false || netContentValue.getValue() == null) {
		totalNetContent = +puEach.getValue(att_NetContents.getID()).getValue() * totalEaches;
		node.getValue(att_NetContents.getID()).setValue(totalNetContent);
	}

	if (puEach && !hasTradeItem) {
		//We can just get the value and ignore the units since we converted the units above where we retrieved the article level.
		//We use getValue instead of getSimpleValue to ignore the unit and only focus on the numeric value
		//Weight = KG, Content = cl
		var totalGrossWeight = 0;
		var totalNetContent = 0;
		var totalNetWeight = 0;
		var totalProductWidth = 0;
		var totalProductHeight = 0;
		var totalProductDepth = 0;

		var weightValue = node.getValue(att_GrossWeight.getID());

		if (weightValue.isInherited() != false || weightValue.getValue() == null) {
			totalGrossWeight = +puEach.getValue(att_GrossWeight.getID()).getValue() * totalEaches;
			node.getValue(att_GrossWeight.getID()).setValue(totalGrossWeight);
		}

		var netWeightValue = node.getValue(att_NetWeight.getID());
		if (netWeightValue.isInherited() != false || netWeightValue.getValue() == null) {
			totalNetWeight = +puEach.getValue(att_NetWeight.getID()).getValue() * totalEaches;
			node.getValue(att_NetWeight.getID()).setValue(totalNetWeight);
		}
		//productWidthAtt / productHeightAtt / productDepthAtt
		var productWidth = node.getValue(productWidthAtt.getID());
		if (productWidth.isInherited() != false || productWidth.getValue() == null) {
			totalProductWidth = +puEach.getValue(productWidthAtt.getID()).getValue() * totalEaches;
			node.getValue(productWidthAtt.getID()).setValue(totalProductWidth);
		}

		var productHeight = node.getValue(productHeightAtt.getID());
		if (productHeight.isInherited() != false || productHeight.getValue() == null) {
			totalProductHeight = +puEach.getValue(productHeightAtt.getID()).getValue() * totalEaches;
			node.getValue(productHeightAtt.getID()).setValue(totalProductHeight);
		}

		var productDepth = node.getValue(productDepthAtt.getID());
		if (productDepth.isInherited() != false || productDepth.getValue() == null) {
			totalProductDepth = +puEach.getValue(productDepthAtt.getID()).getValue() * totalEaches;
			node.getValue(productDepthAtt.getID()).setValue(totalProductDepth);
		}

		var posDescription = puEach.getValue(posDescriptionAtt.getID()).getSimpleValue();
		log.info(posDescription.length());

		if (posDescription.length() < 18 ) {
			node.getValue(posDescriptionAtt.getID()).setSimpleValue('Pallet ' + posDescription);
		} else if (posDescription.length() >= 18) {
			posDescription = posDescription.substring(1,18);
			node.getValue(posDescriptionAtt.getID()).setSimpleValue('Pallet ' + posDescription);
		}
	} else if (puEach) {
		var posDescription = puEach.getValue(posDescriptionAtt.getID()).getSimpleValue();
		log.info(posDescription.length());
		findNumberOfEaches(node);
	}
} else {
	//What to here? We started of with RZ article, somewhere in the process it is changed to DC, but we have not created a pallet.
	var errorMsg = new aMessage();
	throw errorMsg;
}
}
/*===== business rule plugin definition =====
{
  "pluginId" : "JavaScriptBusinessConditionWithBinds",
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
    "contract" : "LoggerBindContract",
    "alias" : "log",
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
    "contract" : "ObjectTypeBindContract",
    "alias" : "puPalletObj",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_PackagingUnitPallet",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Precondition"
}
*/
exports.precondition0 = function (node,manager,log,att_Stroom,puPalletObj) {
var stroom = node.getValue(att_Stroom.getID()).getLOVValue();

if (stroom) {
	var stroomVal = stroom.getValue();
	if (stroomVal == 'DC') {
		var currentObject = node.getObjectType().getID();
		//If we are not on packaging unit pallet, we find the pallet and set it to be the node.
		if (currentObject != String(puPalletObj.getID())) {
			var children = node.getChildren().toArray();
			for (var x in children) {
				var child = children[x];
				if (child.getObjectType().getID().equals(puPalletObj.getID())) {
					return true;
				}
			}
			return false;
		} else {
			return true;
		}
	} else {
		return false;
	}
}
}