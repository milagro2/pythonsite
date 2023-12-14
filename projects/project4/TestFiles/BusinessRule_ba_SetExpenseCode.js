/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SetExpenseCode",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_SetValuesAndLinkes" ],
  "name" : "Set Expense Code",
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
    "contract" : "CurrentObjectBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_InitialPurchasePrice",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_InitialPurchasePrice",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_InitialSalesPrice",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_InitialSalesPrice",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_ExpenseCode",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ExpenseCode",
    "description" : null
  } ],
  "messages" : [ {
    "variable" : "UserMessage",
    "message" : "De onkostencode staat op geen, maar verkoopprijs is 0, svp onkostencode aanpassen.",
    "translations" : [ ]
  }, {
    "variable" : "UserMessage2",
    "message" : "Onkostencode is leeg, svp invullen",
    "translations" : [ ]
  } ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,att_InitialPurchasePrice,att_InitialSalesPrice,att_ExpenseCode,UserMessage,UserMessage2) {
/*Get initial salesprice, initial purchaseprice and expenscode
 *
 */
var salesPrice = node.getValue(att_InitialSalesPrice.getID()).getValue();
var expenseCode = node.getValue(att_ExpenseCode.getID()).getSimpleValue();
var purchasePrice = node.getValue(att_InitialPurchasePrice.getID()).getSimpleValue();

/*Evaluate when expense is "geen"
 *
 */

if (expenseCode) {
	if (salesPrice==0.00 && purchasePrice>0.00 && expenseCode=='geen') {
		var error=new UserMessage();
		throw error;
	}
} else {
	if (salesPrice>0.00) {
		node.getValue(att_ExpenseCode.getID()).setValue('geen');
		log.info('expense code set');
	} else {
		var error2=new UserMessage2();
		throw error2;
	}
}
}