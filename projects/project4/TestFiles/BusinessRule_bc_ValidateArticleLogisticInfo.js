/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "bc_ValidateArticleLogisticInfo",
  "type" : "BusinessCondition",
  "setupGroups" : [ "brg_Conditions" ],
  "name" : "Validate Article Logistic Info",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article", "prd_BundleArticle", "prd_GiftBoxArticle" ],
  "allObjectTypesValid" : false,
  "runPrivileged" : true,
  "onApprove" : "Never",
  "dependencies" : [ ]
}
*/
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
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_PackagingUnitPallet",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_PackagingUnitPallet",
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
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_BundleArticle",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_BundleArticle",
    "description" : null
  } ],
  "messages" : [ {
    "variable" : "ErrorMessageMandatory",
    "message" : "Stroom is set to DC. Please make sure all the following mandatory logistical information are populated.{attributes}",
    "translations" : [ {
      "language" : "nl",
      "message" : "Stroom is ingesteld op DC. Zorg ervoor dat alle verplichte logistieke informatie is ingevuld. {attributes}"
    } ]
  }, {
    "variable" : "ErrorMessageSlipsheet",
    "message" : "The selected pallet type is Slipsheet, but the height is greater then 169cm. Please check the selection.",
    "translations" : [ {
      "language" : "nl",
      "message" : "De pallethoogte is groter dan 169cm. Controleer de logistieke afmetingen en het palletpatroon."
    } ]
  }, {
    "variable" : "ErrorMessagePallet",
    "message" : "The pallet height is greater then 185cm. Please check the selection.",
    "translations" : [ {
      "language" : "nl",
      "message" : "De pallethoogte is groter dan 185cm. Controleer de logistieke afmetingen en het palletpatroon."
    } ]
  } ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,manager,prd_PackagingUnitPallet,att_PalletType,att_PackagingHeight,att_PackagingDepth,att_PackagingWidth,att_ColloGlobalTradeIdentificationNumber,att_QuantityOfLayers,att_QuantityPerLayer,att_Stroom,prd_BundleArticle,ErrorMessageMandatory,ErrorMessageSlipsheet,ErrorMessagePallet) {
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

if (node.getObjectType().getID() == prd_BundleArticle.getID()){
	return true
}else{
	var stream = node.getValue(att_Stroom.getID()).getSimpleValue();
	var colloEANA = node.getValue(att_ColloGlobalTradeIdentificationNumber.getID()).getSimpleValue();
	var palletType = node.getValue(att_PalletType.getID()).getLOVValue();
	var quantityOfLayer = node.getValue(att_QuantityOfLayers.getID()).getSimpleValue();
	var quantityPerLayer = node.getValue(att_QuantityPerLayer.getID()).getSimpleValue();
	var missedAttributeMessage = "";
	if("DC".equals(stream)){	
		var missedNodeAttributes = new java.util.ArrayList();
		if(!palletType){
			missedNodeAttributes.add(att_PalletType.getID());		
		}
		if(!colloEANA){
			missedNodeAttributes.add(att_ColloGlobalTradeIdentificationNumber.getID());
		}
		if(!quantityOfLayer){
			missedNodeAttributes.add(att_QuantityOfLayers.getID());
		}
		if(!quantityPerLayer){
			missedNodeAttributes.add(att_QuantityPerLayer.getID());
		}	
		if(!missedNodeAttributes.isEmpty()){
			missedAttributeMessage = missedAttributeMessage+("<br/>"+node.getTitle()+" ("+node.getID()+") : ")+missedNodeAttributes;
			//missedAttributeMessage.append(java.lang.String.join(",", missedNodeAttributes));
		}
		//Retrieve child object of the Article
		var children = node.queryChildren().asList(100).toArray();
		for(var c in children){
			var child = children[c];	
			var missedAttributes = new java.util.ArrayList();
			var packagingHeight = child.getValue(att_PackagingHeight.getID()).getValue();
			var packagingDepth = child.getValue(att_PackagingDepth.getID()).getValue();
			var packagingWidth = child.getValue(att_PackagingWidth.getID()).getValue();
			
			if(!packagingHeight){
				missedAttributes.add(att_PackagingHeight.getID());
			}
			if(!packagingDepth){
				missedAttributes.add(att_PackagingDepth.getID());
			}
			if(!packagingWidth){
				missedAttributes.add(att_PackagingWidth.getID());
			}
			if(packagingHeight && packagingDepth && packagingWidth && colloEANA && palletType && quantityOfLayer && quantityPerLayer){
				if(palletType !=null && "SLIPSHEET".equals(palletType.getID())){
					log.info(packagingHeight);
					if(packagingHeight>=169){
						errorMesSlip = new ErrorMessageSlipsheet();
						return errorMesSlip;
					}
				}else{
					if(packagingHeight>=185){
						var errorMesPal = new ErrorMessagePallet();
						return errorMesPal;
					}
				}
			}else if(!missedAttributes.isEmpty()){
				missedAttributeMessage = missedAttributeMessage+("<br/>"+child.getTitle()+"("+child.getID()+") : ")+missedAttributes;
				//missedAttributeMessage.append(java.lang.String.join(",", missedAttributes));
			}			
		}
		
		
		if(missedAttributeMessage !=null && !missedAttributeMessage.toString().equals("")){
			var error = "<br/>"+ "<br/>"+("Stroom is op DC gezet. Vul alle verplichte logistieke informatie in.").bold();
			error = error+missedAttributeMessage;
			return error;
		}else{
			return true;
		}
	}else{
		return true;
	}
}
}