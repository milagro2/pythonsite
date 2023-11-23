/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_MoveToCorrectLevel1",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Move Article to Correct Level 1",
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
    "alias" : "att_ArticleLevel1",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ArticleLevel1",
    "description" : null
  }, {
    "contract" : "ProductBindContract",
    "alias" : "GallGall",
    "parameterClass" : "com.stibo.core.domain.impl.FrontProductImpl",
    "value" : "GallGall",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_ProductType",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ProductType",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,manager,log,att_ArticleLevel1,GallGall,att_ProductType) {
var currentParent = node.getParent().getID();


//Only need to move if we are under other category
if (currentParent.equals('Level1_Other')) {
	var level1 = node.getValue(att_ArticleLevel1.getID()).getLOVValue();
	if (level1) {
		var level1ID = level1.getID();
		var level1s = GallGall.getChildren().toArray();

		for (var i=0; i < level1s.length; i++) {
			var childLevel1 = level1s[i].getValue(att_ProductType.getID()).getLOVValue();
			if (childLevel1) {
				var childLevel1ID = childLevel1.getID();
				log.info(childLevel1ID);
				if (childLevel1ID == level1ID) {
					log.info('found new parent');
					node.getValue(att_ArticleLevel1.getID()).deleteCurrent();
					node.setParent(level1s[i]);
					return true;
				}
			}
		}
	}
}
}