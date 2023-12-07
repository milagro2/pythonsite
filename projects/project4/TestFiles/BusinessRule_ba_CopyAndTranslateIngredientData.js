/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_CopyAndTranslateIngredientData",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_CopyTradeItem" ],
  "name" : "Copy And Translate Ingredient Data from TI",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_TradeItem" ],
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
    "contract" : "CurrentObjectBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_IngredientStatement",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_IngredientStatement",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ptp_PartnerArticle",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ptp_PartnerArticle",
    "description" : null
  }, {
    "contract" : "LookupTableHomeBindContract",
    "alias" : "lookupTable",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,att_IngredientStatement,ptp_PartnerArticle,lookupTable,manager) {
var tradeItem = node;
var article;
var translation;
var ingredientStatement = tradeItem.getValue(att_IngredientStatement.getID()).getSimpleValue();


// Find article
tradeItem.queryReferencedBy(ptp_PartnerArticle).forEach(function (ref){
	if (ref.getSource().getObjectType().getID() == 'prd_Article' || 
	ref.getSource().getObjectType().getID() == 'prd_GiftBoxArticle') {
		article = ref.getSource();
	}	
return true;
})

// Early exit if no article
if (!article) {
	logger.info('No article referenced to this BR');
	return;
}

// Translate if possible
if(ingredientStatement) {
	var translation = lookupTable.getLookupTableValue("tlt_TranslateIngredients", ingredientStatement);
	logger.info('vertaald naar: '+ translation);
}

// Copy translation to article in context NL
if (translation) {
	manager.executeInContext('NL', function(NLManager) {
		NLNode = NLManager.getObjectFromOtherManager(article)
		logger.info(NLNode.getValue(att_IngredientStatement.getID()).getSimpleValue());
		NLNode.getValue(att_IngredientStatement.getID()).setValue(translation);
		logger.info('setting translation in NL context');
})
}



}