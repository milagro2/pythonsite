/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SaveAndValidate",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Save and Validate",
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
  "pluginId" : "ReferenceOtherBABusinessAction",
  "parameters" : [ {
    "id" : "ReferencedBA",
    "type" : "com.stibo.core.domain.businessrule.BusinessAction",
    "value" : "ba_SetAlcoholPercentageOnBundle"
  } ],
  "pluginType" : "Operation"
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
    "alias" : "att_ApprovalErrors",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ApprovalErrors",
    "description" : null
  }, {
    "contract" : "BusinessConditionBindContract",
    "alias" : "bc_IsThereExactlyOneOrderablePackUnit",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessConditionImpl",
    "value" : "bc_IsThereExactlyOneOrderablePackUnit",
    "description" : null
  }, {
    "contract" : "BusinessFunctionBindContract",
    "alias" : "bf_ValidateArticleeComInfo",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>bf_ValidateArticleeComInfo</BusinessFunction>\n</BusinessFunctionReference>\n",
    "description" : null
  }, {
    "contract" : "BusinessConditionBindContract",
    "alias" : "bc_IsThereAtLeastOneConsumerPackUnit",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessConditionImpl",
    "value" : "bc_IsThereAtLeastOneConsumerPackUnit",
    "description" : null
  }, {
    "contract" : "BusinessConditionBindContract",
    "alias" : "bc_IsThereExactlyOneActiveAward",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessConditionImpl",
    "value" : "bc_IsThereExactlyOneActiveAward",
    "description" : null
  }, {
    "contract" : "BusinessFunctionBindContract",
    "alias" : "bf_ValidateArticleLogisticInfo",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>bf_ValidateArticleLogisticInfo</BusinessFunction>\n</BusinessFunctionReference>\n",
    "description" : null
  }, {
    "contract" : "BusinessActionBindContract",
    "alias" : "ba_ApproveWholeArticle",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessActionImpl",
    "value" : "ba_ApproveWholeArticle",
    "description" : null
  }, {
    "contract" : "WebUiContextBind",
    "alias" : "webUI",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "BusinessFunctionBindContract",
    "alias" : "bf_ValidateMandatoriesAndWf",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>bf_ValidateMandatoriesAndWf</BusinessFunction>\n</BusinessFunctionReference>\n",
    "description" : null
  }, {
    "contract" : "BusinessFunctionBindContract",
    "alias" : "bf_ValidateSupplierReferences",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>bf_ValidateSupplierReferences</BusinessFunction>\n</BusinessFunctionReference>\n",
    "description" : null
  }, {
    "contract" : "BusinessConditionBindContract",
    "alias" : "bc_BrandBlockIfNeverApproved",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessConditionImpl",
    "value" : "bc_BrandBlockIfNeverApproved",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation1 = function (node,manager,log,att_ApprovalErrors,bc_IsThereExactlyOneOrderablePackUnit,bf_ValidateArticleeComInfo,bc_IsThereAtLeastOneConsumerPackUnit,bc_IsThereExactlyOneActiveAward,bf_ValidateArticleLogisticInfo,ba_ApproveWholeArticle,webUI,bf_ValidateMandatoriesAndWf,bf_ValidateSupplierReferences,bc_BrandBlockIfNeverApproved) {
var errors = new java.util.ArrayList();
node.getValue(att_ApprovalErrors.getID()).deleteCurrent();

function getErrorsForMultiValue() {
	var result = '';
	errors.toArray().forEach(function (error) {
if (result) {
result = result + '<multisep/>';
} result = result + error;
});
	return result;
}


var oneLogisticPackResult = bc_IsThereExactlyOneOrderablePackUnit.evaluate(node).isRejected();
var oneConsumerPackResult = bc_IsThereAtLeastOneConsumerPackUnit.evaluate(node).isRejected();
var oneActiveAwardResult = bc_IsThereExactlyOneActiveAward.evaluate(node).isRejected();
var brandNeverApprovedResult = bc_BrandBlockIfNeverApproved.evaluate(node).isRejected();

logger.info(brandNeverApprovedResult);
var ecomResult = bf_ValidateArticleeComInfo.evaluate({node: node});
var logisticResult = bf_ValidateArticleLogisticInfo.evaluate({node: node});
var mandatoriesResult = bf_ValidateMandatoriesAndWf.evaluate({node: node});

//var supplierRefResult = validateSupplierRefFunc.evaluate({node: node});

if (oneLogisticPackResult) {
	errors.add('There must be one and only one packaging unit set to Logistieke.');
}

if (ecomResult && ecomResult.size() > 0) {
	ecomResult.toArray().forEach(function(err) {
		errors.add(err);
	});
}

if (logisticResult && logisticResult.size() > 0) {
	logisticResult.toArray().forEach(function(err) {
		errors.add(err);
	});
}

if (mandatoriesResult.size() > 0) {
	mandatoriesResult.toArray().forEach(function(err) {
		errors.add(err);
	});
}

/*
if (supplierRefResult.size() > 0) {
	supplierRefResult.toArray().forEach(function(err) {
		errors.add(err);
	});
}*/

if (oneConsumerPackResult) {
	errors.add('There must be at least one packaging unit set to sellable');
}

if (oneActiveAwardResult) {
	errors.add('There can only be one award with Yes');
}

if(brandNeverApprovedResult){
	errors.add('Het merk is nog niet approved, wacht aub tot CS het merk heeft gecontroleerd en doorgezet');
}


if(errors.size() == 0) {
	
	//approve node.
	try {
		ba_ApproveWholeArticle.execute(node);
		webUI.showAlert('INFO', 'Approval Successful');
	} catch (e) {

		webUI.showAlert('WARNING', 'Approval failed', 'Due to ' + e.javaException.getMessage());
	}
} else {
	node.getValue(att_ApprovalErrors.getID()).setSimpleValue(getErrorsForMultiValue());
}
}