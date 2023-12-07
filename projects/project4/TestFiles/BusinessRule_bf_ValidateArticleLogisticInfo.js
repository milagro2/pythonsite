/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "bf_ValidateArticleLogisticInfo",
  "type" : "BusinessFunction",
  "setupGroups" : [ "brg_FunctionValidations" ],
  "name" : "Validate Article Logistic Info",
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
    "contract" : "LoggerBindContract",
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
    "alias" : "att_PalletType",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_PalletType",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_PackagingHeight",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_PackagingHeight",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_PackagingDepth",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_PackagingDepth",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_PackagingWidth",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_PackagingWidth",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_ColloGlobalTradeIdentificationNumber",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ColloGlobalTradeIdentificationNumber",
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
    "alias" : "att_Stroom",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_Stroom",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_AvailabilityEndDateDes",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_AvailabilityEndDateDes",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_PackagingUnitPallet",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_PackagingUnitPallet",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_BundleArticle",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_BundleArticle",
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
    "description" : "Node to evaluate"
  } ]
}
*/
exports.operation0 = function (manager,log,att_PalletType,att_PackagingHeight,att_PackagingDepth,att_PackagingWidth,att_ColloGlobalTradeIdentificationNumber,att_QuantityOfLayers,att_QuantityPerLayer,att_Stroom,att_AvailabilityEndDateDes,prd_PackagingUnitPallet,prd_BundleArticle,node) {
var errorLog = new java.util.ArrayList();
var result = true;
var vvlvFound = false;

/*The functionality validates references and attribute values stated in the attribute group atg_CreateNewArticleLogValidation.
 * If Stream Attribute value is DC on the Article, attributes Pallet Type, Packaging height witdth and depth, Collo EAN, quantity of layers and quantity per layers are mandatory.
 * If information are not populated on those attributes, return error message with missing attributes.
 *
 *Bindings:
 *palletTypeAtt --> Pallet Type (att_PalletType)
 *packagingHeightAtt --> Packaging Height (att_PackagingHeight)
 *packagingDepthAtt --> Packaging Depth (att_PackagingDepth)
 *packagingWidthAtt --> Packaging Width (att_PackagingWidth)
 *colloEANAtt --> Collo EAN Number (att_ColloGlobalTradeIdentificationNumber)
 *quantityOfLayerAtt --> Quantity Of Layers (att_QuantityOfLayers)
 *quantityPerLayerAtt --> Quantity Per Layer (att_QuantityPerLayer)
 *streamAtt --> Stream (att_Stroom)
  */

if (node.getObjectType().getID() == prd_BundleArticle.getID()) {
	return errorLog;
} else {
	var stream = node.getValue(att_Stroom.getID()).getSimpleValue();
	var colloEANA = node.getValue(att_ColloGlobalTradeIdentificationNumber.getID()).getSimpleValue();
	var palletType = node.getValue(att_PalletType.getID()).getLOVValue();
	var quantityOfLayer = node.getValue(att_QuantityOfLayers.getID()).getSimpleValue();
	var quantityPerLayer = node.getValue(att_QuantityPerLayer.getID()).getSimpleValue();
	var missedAttributeMessage = '';
	if ('DC'.equals(stream)) {
		var missedNodeAttributes = new java.util.ArrayList();
		if (!palletType) {
			missedNodeAttributes.add(att_PalletType.getName());
		}
		if (!colloEANA) {
			missedNodeAttributes.add(att_ColloGlobalTradeIdentificationNumber.getName());
		}
		if (!quantityOfLayer) {
			missedNodeAttributes.add(att_QuantityOfLayers.getName());
		}
		if (!quantityPerLayer) {
			missedNodeAttributes.add(att_QuantityPerLayer.getName());
		}
		if (!missedNodeAttributes.isEmpty()) {
			errorLog.add(node.getTitle() + ' ('+node.getID()+') : ' + missedNodeAttributes);
			//missedAttributeMessage.append(java.lang.String.join(",", missedNodeAttributes));
		}

		var missedAttributes = new java.util.ArrayList();
		var packagingHeight = node.getValue(att_PackagingHeight.getID()).getValue();
		var packagingDepth = node.getValue(att_PackagingDepth.getID()).getValue();
		var packagingWidth = node.getValue(att_PackagingWidth.getID()).getValue();

		if (!packagingHeight) {
			missedAttributes.add(att_PackagingHeight.getName());
		}
		if (!packagingDepth) {
			missedAttributes.add(att_PackagingDepth.getName());
		}
		if (!packagingWidth) {
			missedAttributes.add(att_PackagingWidth.getName());
		}
		if (packagingHeight && packagingDepth && packagingWidth && colloEANA && palletType && quantityOfLayer && quantityPerLayer) {
			if (palletType !=null && 'SLIPSHEET'.equals(palletType.getID())) {
				log.info(packagingHeight);
				if (packagingHeight>=169) {
					errorLog.add('The selected pallet type is Slipsheet, but the height is greater then 169cm. Please check the selection.');
					return errorMesSlip;
				}
			} else {
				//Remove below lines after AH Demo. Dennis S 22-11-2022
				var hoogteEcht = packagingHeight * quantityOfLayer;
				if (hoogteEcht>=185) {
					errorLog.add('The pallet height is greater then 185cm. Please check the selection.');
					return errorLog;
				}
			}
		} else if (!missedAttributes.isEmpty()) {
			errorLog.add(node.getObjectType().getName() + ' : ' +missedAttributes);
		}
		

		return errorLog;
		
	} else {
		return errorLog;
	}
}
}