/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "bf_ValidateArticleeComInfo",
  "type" : "BusinessFunction",
  "setupGroups" : [ "brg_FunctionValidations" ],
  "name" : "Validate article eCom info",
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
    "contract" : "AttributeGroupBindContract",
    "alias" : "atg_Mandatory_EcomValidation",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeGroupImpl",
    "value" : "atg_Mandatory_EcomValidation",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_ColorSpecification",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ColorSpecification",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_NavigationText",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_NavigationText",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_ProductType",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ProductType",
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
  }, {
    "contract" : "AttributeGroupBindContract",
    "alias" : "atg_Mandatory_EcomValidationBundle",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeGroupImpl",
    "value" : "atg_Mandatory_EcomValidationBundle",
    "description" : null
  }, {
    "contract" : "AttributeGroupBindContract",
    "alias" : "atg_Mandatory_EcomValidationBundleComp",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeGroupImpl",
    "value" : "atg_Mandatory_EcomValidationBundleComp",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_BundleComponent",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_BundleComponent",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_AvailabilityEndDateDes",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_AvailabilityEndDateDes",
    "description" : null
  }, {
    "contract" : "AttributeGroupBindContract",
    "alias" : "atg_Mandatory_EcomValidation_NonSell",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeGroupImpl",
    "value" : "atg_Mandatory_EcomValidation_NonSell",
    "description" : null
  }, {
    "contract" : "ProductBindContract",
    "alias" : "Level2_224342",
    "parameterClass" : "com.stibo.core.domain.impl.FrontProductImpl",
    "value" : "Level2_224342",
    "description" : null
  }, {
    "contract" : "BusinessFunctionBindContract",
    "alias" : "bf_FindFirstNodeTypeInHierarchy",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>bf_FindFirstNodeTypeInHierarchy</BusinessFunction>\n</BusinessFunctionReference>\n",
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
exports.operation0 = function (manager,log,atg_Mandatory_EcomValidation,att_ColorSpecification,att_NavigationText,att_ProductType,att_CreateVVLV,att_Stroom,atg_Mandatory_EcomValidationBundle,atg_Mandatory_EcomValidationBundleComp,ref_BundleComponent,att_AvailabilityEndDateDes,atg_Mandatory_EcomValidation_NonSell,Level2_224342,bf_FindFirstNodeTypeInHierarchy,node) {
// STEPGIT@gall-step@{"branch":"GMDM-1931-Show-missing-values-of-components"}
var attributes = atg_Mandatory_EcomValidation.getAttributes().toArray();
var references = atg_Mandatory_EcomValidation.getLinkTypes().toArray();
var dataContainer = atg_Mandatory_EcomValidation.getDataContainerTypes().toArray();

//NS = Non sellable;
var attributesNS = atg_Mandatory_EcomValidation_NonSell.getAttributes().toArray();
var referencesNS = atg_Mandatory_EcomValidation_NonSell.getLinkTypes().toArray();
var dataContainerNS = atg_Mandatory_EcomValidation_NonSell.getDataContainerTypes().toArray();

//Level2_224342 = NonSellable
var isNonSellable = false;
var L2 = bf_FindFirstNodeTypeInHierarchy.evaluate({ "node": node, "objectTypeID": "prd_Level2" });
if (L2) {
	if (L2.getID() == Level2_224342.getID()) {
		isNonSellable = true;
	}
}

//fetch attributes and references for bundle
var attributesBundle = atg_Mandatory_EcomValidationBundle.getAttributes().toArray();
var referencesBundle = atg_Mandatory_EcomValidationBundle.getLinkTypes().toArray();
var dataContainerBundle = atg_Mandatory_EcomValidationBundle.getDataContainerTypes().toArray();

//fetch attributes and references for bundle component
var attributesBundleComp = atg_Mandatory_EcomValidationBundleComp.getAttributes().toArray();
var referencesBundleComp = atg_Mandatory_EcomValidationBundleComp.getLinkTypes().toArray();
var dataContainerBundleComp = atg_Mandatory_EcomValidationBundleComp.getDataContainerTypes().toArray();

//set result variables
var sdf = new java.text.SimpleDateFormat('yyyy-MM-dd');
var today = sdf.format(new Date());
var errorLog = new java.util.ArrayList();
var result = true;
var vvlvFound = false;

//Start.
var objectType = node.getObjectType().getID();

if (objectType.equals('prd_BundleArticle')) {
	var stroom = node.getValue(att_Stroom.getID()).getSimpleValue();
	if (stroom == 'DC') {
		var createVVLV = node.getValue(att_CreateVVLV.getID()).getLOVValue();

		if (createVVLV) {
			var createVVLVID = createVVLV.getID();

			if (createVVLVID == '-1') {
				vvlvFound = true;
			}
		}
	}

	if (vvlvFound) {
		var references = node.queryReferences(ref_BundleComponent).asList(10);
		if (references.size() > 0) {
			node.queryReferences(ref_BundleComponent).forEach(function (reference) {
				var componentPuEach = reference.getTarget();
				var leverbaarTm = reference.getValue(att_AvailabilityEndDateDes.getID()).getSimpleValue();
				if (leverbaarTm) {
					var leverbaarTmParsed = sdf.format(sdf.parse(leverbaarTm));
				}
				log.info('leverbaarTm = ' + leverbaarTm + ', LeverbaarParsed = ' + leverbaarTmParsed);
				if (leverbaarTm == null || today < leverbaarTmParsed) {
		
					var component = componentPuEach.getParent();
					var isNonSellableBundleComp = false;
					var L2BundleComp = bf_FindFirstNodeTypeInHierarchy.evaluate({ "node": component, "objectTypeID": "prd_Level2" });
					if (L2BundleComp) {
						if (L2BundleComp.getID() == Level2_224342.getID()) {
							isNonSellableBundleComp = true;
						}
					}

					if (isNonSellableBundleComp) {
						attributesBundleComp = attributesNS;
						referencesBundleComp = referencesNS;
						dataContainerBundleComp = dataContainerNS;
					}
					
					for (var x in attributesBundleComp) {
						if (!component.getValue(attributesBundleComp[x].getID()).getSimpleValue()) {
							errorLog.add('Missing attribute ' + attributesBundleComp[x].getName());
							result = false;
						}
					}
					for (var y in referencesBundleComp) {
						if (component.getReferences(referencesBundleComp[y]).size() <= 0) {
							errorLog.add('Missing reference ' + referencesBundleComp[y].getName());
							result = false;
						}
					}

					for (var y in dataContainerBundleComp) {
						var dataContainers = component.getDataContainer(dataContainerBundleComp[y]).getDataContainers().toArray();
						if (dataContainers.length == 0) {
							errorLog.add('Missing dataContainer ' + dataContainerBundleComp[y].getName() + ' on ' + component.getName());
							result = false;
						}
					}
				}
				return true;
			});
		}

		for (var x in attributesBundle) {
			if (!node.getValue(attributesBundle[x].getID()).getSimpleValue()) {
				errorLog.add('Missing attribute ' + attributesBundle[x].getName());
				result = false;
			}
		}
		for (var y in referencesBundle) {
			if (node.getReferences(referencesBundle[y]).size() <= 0) {
				errorLog.add('Missing reference ' + referencesBundle[y].getName());
				result = false;
			}
		}

		for (var y in dataContainerBundle) {
			var dataContainers = node.getDataContainer(dataContainerBundle[y]).getDataContainers().toArray();
			if (dataContainers.length == 0) {
				errorLog.add('Missing dataContainer ' + dataContainerBundle[y].getName());
				result = false;
			}
		}

		if ('1'.equals(node.getValue(att_ProductType.getID()).getLOVValue().getID())) {
			var att_ColorSpecification = node.getValue('att_ColorSpecification').getLOVValue();
			if (att_ColorSpecification) {
				var colorID = att_ColorSpecification.getID();

				if (colorID == '0' || att_ColorSpecification == null) {
					result = false;
					errorLog.add('Incorrect color');
				}
			} else {
				result = false;
				errorLog.add('Incorrect color');
			}
		}

		if (!result) {
			var errorMsg = 'Missing data for eCom check (VVLV) is yes for ' + node.getID() + 'Missing following data:' + errorLog.toString();
			return errorLog;
		} else {
			return errorLog;
		}
	} else {
		//VVLV not yes on any of the children, can return true;
		return errorLog;
	}
} else if (objectType.equals('prd_Article') || objectType.equals('prd_GiftBoxArticle')) {
	//Business condition runs on article. First check children to see if any of them has VVLV set to Yes. If this is not the case, nothing needs to be checked.
	var children = node.queryChildren().asList(10);
	if (children.size() > 0) {
		node.queryChildren().forEach(function (child) {
			var stroom = child.getValue(att_Stroom.getID()).getSimpleValue();

			if (stroom == 'DC') {
				var createVVLV = child.getValue(att_CreateVVLV.getID()).getLOVValue();

				if (createVVLV) {
					var createVVLVID = createVVLV.getID();

					if (createVVLVID == '-1') {
						vvlvFound = true;
					}
				} return true;
			} return true;
		});
	}

	log.info("VVLV " + vvlvFound);
	if (vvlvFound) {
		if (objectType.equals('prd_Article') || objectType.equals('prd_GiftBoxArticle')) {
			if (isNonSellable) {
				attributes = attributesNS;
				references = referencesNS;
				dataContainer = dataContainerNS;
			}

			for (var x in attributes) {
				if (!node.getValue(attributes[x].getID()).getValue()) {
					errorLog.add('Missing attribute ' + attributes[x].getName());
					result = false;
				}
			}
			for (var y in references) {
				if (node.getReferences(references[y]).size() <= 0) {
					errorLog.add('Missing reference ' + references[y].getName());
					result = false;
				}
			}

			for (var y in dataContainer) {
				var dataContainers = node.getDataContainer(dataContainer[y]).getDataContainers().toArray();
				if (dataContainers.length == 0) {
					errorLog.add('Missing dataContainer ' + dataContainer[y].getName());
					result = false;
				}
			}
		}

		if ('1'.equals(node.getValue(att_ProductType.getID()).getLOVValue().getID()) || '4'.equals(node.getValue(att_ProductType.getID()).getLOVValue().getID())) {
			var att_ColorSpecification = node.getValue('att_ColorSpecification').getLOVValue();
			if (att_ColorSpecification) {
				var colorID = att_ColorSpecification.getID();
			}
			if (colorID == '0' || att_ColorSpecification == null) {
				result = false;
				errorLog.add('Incorrect color');
			}
		}

		var nav = node.getValue(att_NavigationText.getID()).getSimpleValue();

		var needsNavText = false;

		if (('7'.equals(node.getValue(att_ProductType.getID()).getLOVValue().getID())) || ('1'.equals(node.getValue(att_ProductType.getID()).getLOVValue().getID()))) {
			needsNavText = true;
		}

		if (needsNavText && nav == null) {
			result = false;
			errorLog.add('Missing navigation text');
		}

		if (!result) {
			var errorMsg = 'Missing data for eCom check (VVLV) is yes for ' + node.getID() + 'Missing following data:' + errorLog.toString();
			return errorLog;
		} else {
			return errorLog;
		}
	} else {
		return errorLog;
	}
} else {
	//VVLV not yes on any of the children, can return true;
	return errorLog;
}
}