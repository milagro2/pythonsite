/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SetTradeItemParent",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Set Trade Item Parent",
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
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_ProductFamily",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_ProductFamily",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_ProductCategory",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_ProductCategory",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_Level1",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_Level1",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ptp_PartnerArticle",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ptp_PartnerArticle",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_Level2",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_Level2",
    "description" : null
  }, {
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ {
    "variable" : "IncorrectProdCat",
    "message" : "The current parent selected {level}, is not valid. Please select a valid parent node.",
    "translations" : [ {
      "language" : "nl",
      "message" : "De gekozen artikel groep is niet correct: {level}. Selecteer een andere."
    } ]
  } ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,prd_ProductFamily,prd_ProductCategory,prd_Level1,ptp_PartnerArticle,prd_Level2,manager,IncorrectProdCat) {
var condition = com.stibo.query.condition.Conditions;
var home = manager.getHome(com.stibo.query.home.QueryHome);
var parentID;
var parentObjectType = node.getParent().getObjectType().getID();
var level1ObjectType = prd_Level1.getID();
var level2ObjectType = prd_Level2.getID();

if(parentObjectType.equals(prd_ProductFamily.getID())){
	parentID = "Partner" + node.getParent().getParent().getID();
} else if(parentObjectType.equals(prd_ProductCategory.getID())){
	parentID = "Partner" + node.getParent().getID();
} else if(parentObjectType.equals(level1ObjectType)){
	var errorMessage = new IncorrectProdCat();
	errorMessage.level = node.getParent().getID();
	throw errorMessage;
} else if(parentObjectType.equals(level2ObjectType)){
	var errorMessage = new IncorrectProdCat();
	errorMessage.level = node.getParent().getName();
	throw errorMessage;
	
}
var idCondition = com.stibo.query.condition.Conditions.id();
var querySpecificationToFindParent = home.queryFor(
	com.stibo.core.domain.Product)
	.where(idCondition.eq(parentID)
);
var parentResult = querySpecificationToFindParent.execute().asList(1);

if (parentResult.size() > 0) {
// Move Trade item (prd_TradeItem) 
	node.queryReferences(ptp_PartnerArticle).forEach(function(reference){
		var tradeItem = reference.getTarget();
		tradeItem.setParent(parentResult.get(0));
		return true;
	});
} else {
	throw "Unable to find the parent.";
}
}