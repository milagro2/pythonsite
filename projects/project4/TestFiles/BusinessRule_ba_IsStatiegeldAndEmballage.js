/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_IsStatiegeldAndEmballage",
  "type" : "BusinessCondition",
  "setupGroups" : [ "brg_Conditions" ],
  "name" : "Is There Statiegeld and Emballage",
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
    "contract" : "BusinessFunctionBindContract",
    "alias" : "bf_GetAllObjectsForAnArticle",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>bf_GetAllObjectsForAnArticle</BusinessFunction>\n</BusinessFunctionReference>\n",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_IsReturnable",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_IsReturnable",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "pte_Emballage",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "pte_Emballage",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "pte_Deposit",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "pte_Deposit",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_Packaging",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_Packaging",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_BundleArticle",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_BundleArticle",
    "description" : null
  } ],
  "messages" : [ {
    "variable" : "InvalidMessageDeposit",
    "message" : "The Packaging Unit {pu} is flagged as Returnable. Please enter a Deposit.",
    "translations" : [ {
      "language" : "nl",
      "message" : "Emballage / Herbruikbaar artikel staat op ja. Selecteer aub een waarde voor statiegeld en of emballage"
    } ]
  }, {
    "variable" : "InvalidMessageEmballage",
    "message" : "The Packaging Unit {pu} is flagged as Returnable and the Packaging selected is KRAT. Please enter an Emballage.",
    "translations" : [ {
      "language" : "nl",
      "message" : "De verpakkingseenheid {pu} is gemarkeerd als Retourneerbaar en de geselecteerde verpakking is KRAT. Voer een Emballage in"
    } ]
  } ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,bf_GetAllObjectsForAnArticle,att_IsReturnable,pte_Emballage,pte_Deposit,att_Packaging,prd_BundleArticle,InvalidMessageDeposit,InvalidMessageEmballage) {
var packagingUnits = bf_GetAllObjectsForAnArticle.evaluate({node: node}).toArray();
for (var i in packagingUnits) {
	var packagingUnit = packagingUnits[i];
	var returnableValue = packagingUnit.getValue(att_IsReturnable.getID()).getLOVValue();
	var packagingValue = packagingUnit.getValue(att_Packaging.getID()).getLOVValue().getID();
	if (returnableValue) {
    		var returnableID = returnableValue.getID();
    		if (returnableID == '-1') {
    			var deposit = packagingUnit.queryReferences(pte_Deposit).asList(10);
    			if (deposit.size()==0) {
    				var errorDeposit = new InvalidMessageDeposit();
    				errorDeposit.pu = packagingUnit.getID() + ' - ' + packagingUnit.getName();
    				return errorDeposit;
    			} else if (deposit.size()>0 && packagingValue != 'KRAT') {
    				return true;
    			} else if (deposit.size()>0 && packagingValue == 'KRAT') {
    				var emballage = packagingUnit.queryReferences(pte_Emballage).asList(10);
    				if (emballage.size()==0) {
    					var errorEmballage = new InvalidMessageEmballage();
    					errorEmballage.pu = packagingUnit.getID() + ' - ' + packagingUnit.getName();
    					return errorEmballage;
    				} else {
    					return true;
    				}
    			}
    		} else {
    			return true;
    		}
    } else {
    		return true;
    }
}
if (node.getObjectType().getID() == prd_BundleArticle.getID()) {
	return true;
}
}