/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "bc_IsCOSMOSArticleComplete",
  "type" : "BusinessCondition",
  "setupGroups" : [ "brg_Conditions" ],
  "name" : "Is COSMOS Article Complete",
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
    "contract" : "BusinessConditionBindContract",
    "alias" : "bc_IsCOSMOSMandatoryInfoCompleted",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessConditionImpl",
    "value" : "bc_IsCOSMOSMandatoryInfoCompleted",
    "description" : null
  }, {
    "contract" : "BusinessFunctionBindContract",
    "alias" : "bf_GetAllObjectsForAnArticle",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>bf_GetAllObjectsForAnArticle</BusinessFunction>\n</BusinessFunctionReference>\n",
    "description" : null
  }, {
    "contract" : "BusinessFunctionBindContract",
    "alias" : "bf_GetCOSMOSMissingMandatoryAttributes",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>bf_GetCOSMOSMissingMandatoryAttributes</BusinessFunction>\n</BusinessFunctionReference>\n",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "pte_GoodsSupplier",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "pte_GoodsSupplier",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_Awards",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_Awards",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_SupplierArticleCode",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_SupplierArticleCode",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_ValidityStartDate",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ValidityStartDate",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_ValidityEndDate",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ValidityEndDate",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_VintageDescription",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_VintageDescription",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_VisibleShelfLabel",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_VisibleShelfLabel",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_BundleArticle",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_BundleArticle",
    "description" : null
  } ],
  "messages" : [ {
    "variable" : "UserMessage",
    "message" : "{result}",
    "translations" : [ ]
  } ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,bc_IsCOSMOSMandatoryInfoCompleted,bf_GetAllObjectsForAnArticle,bf_GetCOSMOSMissingMandatoryAttributes,pte_GoodsSupplier,ref_Awards,att_SupplierArticleCode,att_ValidityStartDate,att_ValidityEndDate,att_VintageDescription,att_VisibleShelfLabel,prd_BundleArticle,UserMessage) {
/*
 * The functionality checks whether all mandatory information is completed for the entire article
 *
 * - Get all objects for the article
 * - Check for each object whether it is complete
 * - Check for the article itself whether it is complete
 * - Combine the results and present them to the user
 *
 */
var allObjects = [];

if (prd_BundleArticle.getID() == node.getObjectType().getID()) {
	allObjects.push(node);
} else {
	allObjects = bf_GetAllObjectsForAnArticle.evaluate({node: node}).toArray();
}

var completeResult ='';
var completeResultNode ='';
var completeResultAward ='';
var completeResultGoodsSupplier='';
var missingList;
for (var x in allObjects) {
	// Check for each object whether it is complete
	var isObjectComplete = bc_IsCOSMOSMandatoryInfoCompleted.evaluate(allObjects[x]);
	if (isObjectComplete.isRejected() || isObjectComplete.isNonApplicable()) {
		missingList = bf_GetCOSMOSMissingMandatoryAttributes.evaluate({node: allObjects[x]});
		completeResult = completeResult +'<br/>'+allObjects[x].getID()+' '+allObjects[x].getName()+' is niet compleet. De volgende informatie mist:'+'<br/>'+missingList+'<br/>';
	}
//Check if Supplier article code has been entered on the Goods Supplier reference
	var referencesGoodsSuplier = allObjects[x].queryReferences(pte_GoodsSupplier).asList(10);
	if (referencesGoodsSuplier.size()>0) {
		if (!referencesGoodsSuplier.get(0).getValue(att_SupplierArticleCode.getID()).getSimpleValue()) {
			completeResultGoodsSupplier = completeResultGoodsSupplier+'<br/>'+allObjects[x].getID()+' '+allObjects[x].getName()+' is niet compleet. Externe artikelnummer op leveranciers referentie mist.';
		}
	}
}
// Check for the article itself whether it is complete
var isNodeComplete = bc_IsCOSMOSMandatoryInfoCompleted.evaluate(node);
if (isNodeComplete.isRejected() || isNodeComplete.isNonApplicable()) {
	missingList = bf_GetCOSMOSMissingMandatoryAttributes.evaluate({node: node});
	completeResultNode = completeResultNode +'<br/>'+node.getID()+' '+node.getName()+' is niet compleet. De volgende informatie mist:'+'<br/>'+missingList+'<br/>';
}

//Check if all mandatory attributes on the reference have been populated
var referencesAwards = node.queryReferences(ref_Awards).asList(10);
if (referencesAwards.size()>0) {
	node.queryReferences(ref_Awards).forEach(function(awardReference) {
		if (!awardReference.getValue(att_ValidityStartDate.getID()).getSimpleValue() ||
		    !awardReference.getValue(att_ValidityEndDate.getID()).getSimpleValue() ||
		    !awardReference.getValue(att_VintageDescription.getID()).getSimpleValue() ||
		    !awardReference.getValue(att_VisibleShelfLabel.getID()).getSimpleValue()) {
		    completeResultAward = completeResultAward+'<br/>'+node.getID()+' '+node.getName()+' is niet compleet. Vul alle verplichte informatie op de Award referentie in '+ awardReference.getTarget().getName();
		    }
			return true;
	});
}
//Return error message if relevant
if (!completeResult && !completeResultNode && !completeResultGoodsSupplier && !completeResultAward) {
	return true;
} else {
	errorMessage = new UserMessage();
	errorMessage.result = completeResult+completeResultNode+completeResultGoodsSupplier+completeResultAward;
	return errorMessage;
}
}
/*===== business rule plugin definition =====
{
  "pluginId" : "ReferenceOtherBCBusinessCondition",
  "parameters" : [ {
    "id" : "ReferencedBC",
    "type" : "com.stibo.core.domain.businessrule.BusinessCondition",
    "value" : "bc_IsThereExactlyOneActiveAward"
  }, {
    "id" : "ValueWhenReferencedIsNA",
    "type" : "com.stibo.util.basictypes.TrueFalseParameter",
    "value" : "true"
  } ],
  "pluginType" : "Operation"
}
*/

/*===== business rule plugin definition =====
{
  "pluginId" : "ReferenceOtherBCBusinessCondition",
  "parameters" : [ {
    "id" : "ReferencedBC",
    "type" : "com.stibo.core.domain.businessrule.BusinessCondition",
    "value" : "bc_IsThereExactlyOneSourceAsset"
  }, {
    "id" : "ValueWhenReferencedIsNA",
    "type" : "com.stibo.util.basictypes.TrueFalseParameter",
    "value" : "true"
  } ],
  "pluginType" : "Operation"
}
*/

/*===== business rule plugin definition =====
{
  "pluginId" : "ReferenceOtherBCBusinessCondition",
  "parameters" : [ {
    "id" : "ReferencedBC",
    "type" : "com.stibo.core.domain.businessrule.BusinessCondition",
    "value" : "bc_ValidateArticleLogisticInfo"
  }, {
    "id" : "ValueWhenReferencedIsNA",
    "type" : "com.stibo.util.basictypes.TrueFalseParameter",
    "value" : "true"
  } ],
  "pluginType" : "Operation"
}
*/

/*===== business rule plugin definition =====
{
  "pluginId" : "ReferenceOtherBCBusinessCondition",
  "parameters" : [ {
    "id" : "ReferencedBC",
    "type" : "com.stibo.core.domain.businessrule.BusinessCondition",
    "value" : "bc_BrandBlockIfNeverApproved"
  }, {
    "id" : "ValueWhenReferencedIsNA",
    "type" : "com.stibo.util.basictypes.TrueFalseParameter",
    "value" : "false"
  } ],
  "pluginType" : "Operation"
}
*/
