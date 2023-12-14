/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_Generate_Product_Events",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Generate Product Events",
  "description" : "Generates additional events for OIEP OSFSC1 - STEP.2.SFSC.ARTICLES on Packaging Unit objects, to include changes on articles and changes on dependent objects.",
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
  "pluginId" : "JavaScriptBusinessActionWithBinds",
  "binds" : [ {
    "contract" : "LoggerBindContract",
    "alias" : "logger",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "CurrentObjectBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "cla_MainGroup",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "cla_MainGroup",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "cla_ProductGroup",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "cla_ProductGroup",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "cla_ArticleGroup",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "cla_ArticleGroup",
    "description" : null
  }, {
    "contract" : "DerivedEventTypeBinding",
    "alias" : "ReferenceDataChangeEvent",
    "parameterClass" : "com.stibo.core.domain.impl.eventqueue.DerivedEventTypeImpl",
    "value" : "ReferenceDataChangeEvent",
    "description" : null
  }, {
    "contract" : "CurrentEventQueueBinding",
    "alias" : "eqCurrent",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_Article",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_Article",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_GiftBoxArticle",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_GiftBoxArticle",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_BundleArticle",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_BundleArticle",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "ast_Brand",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "ast_Brand",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "ast_Award",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "ast_Award",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "ent_TasteProfile",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "ent_TasteProfile",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "ent_SubRegion",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "ent_SubRegion",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "ent_Region",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "ent_Region",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_PlaceOfOrigin",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_PlaceOfOrigin",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (logger,node,cla_MainGroup,cla_ProductGroup,cla_ArticleGroup,ReferenceDataChangeEvent,eqCurrent,prd_Article,prd_GiftBoxArticle,prd_BundleArticle,ast_Brand,ast_Award,ent_TasteProfile,ent_SubRegion,ent_Region,ref_PlaceOfOrigin) {
/*
 *  Name: 	ba_Generate_Product_Events - Generate Product Events
 *  Purpose: 	Generates additional events for OIEP OSFSC1 - STEP.2.SFSC.ARTICLES on Packaging Unit objects, to include changes on articles and changes on dependent objects.
 *  Binds:
 *  			logger -> Logger
 *  			node -> Current Object
 *  			otMainGroup - > Object Type -> Main Group (cla_MainGroup)
 *  			otProductGroup - > Object Type -> Product Group (cla_ProductGroup)
 *  			otArticleGroup - > Object Type -> Article Group (cla_ArticleGroup)
 *  			etRDC - > Derived Event Type -> ReferenceDataChangeEvent (ReferenceDataChangeEvent)
 *  			eqCurrent - > Current Event Queue
 *  			otArticle - > Object Type -> Article (prd_Article)
 *  			otGiftbox - > Object Type -> Gift Box Article (prd_GiftBoxArticle)
 *  			otBundle - > Object Type -> Bundle Article (prd_BundleArticle)
 *  			otBrand - > Object Type -> Brand (ast_Brand)
 *  			otAward - > Object Type -> Award (ast_Award)
 *  			otTasteProfile - > Object Type -> Taste Profile (ent_TasteProfile)
 *  			otSubRegion - > Object Type -> Sub Region (ent_SubRegion)
 *  			otRegion - > Object Type -> Region (ent_Region)
 *  			rtOriginRegion - > Reference Type -> Region of Origin (ref_PlaceOfOrigin)
 *
*/

// Debug
var isDebug = false;
function logDebug(msg) {
  	if (isDebug) {
logger.info(msg);
}
}

if (node.getObjectType().getID() == prd_Article.getID() || node.getObjectType().getID() == prd_GiftBoxArticle.getID()) {
	var articleChildren = node.getChildren();
	for (var j = 0; j < articleChildren.size(); j++) {
		var articlechild = articleChildren.get(j);
		eqCurrent.queueDerivedEvent(ReferenceDataChangeEvent, articlechild);
		logDebug(articlechild.getID() + ' (' + ReferenceDataChangeEvent.getID() + ') was added to ' + eqCurrent.getID());
	}
}
if (node.getObjectType().getID() == prd_BundleArticle.getID()) {
	eqCurrent.queueDerivedEvent(ReferenceDataChangeEvent, node);
	logDebug(node.getID() + ' (' + ReferenceDataChangeEvent.getID() + ') was added to ' + eqCurrent.getID());
}

if (node.getObjectType().getID() == cla_ArticleGroup.getID()) {
	var classPL = node.getClassificationProductLinks();
	for (var i = 0; i < classPL.size(); i++) {
		var classproduct = classPL.get(i).getProduct();
		if (classproduct.getObjectType().getID() == prd_Article.getID() || classproduct.getObjectType().getID() == prd_GiftBoxArticle.getID()) {
			var articleChildren = classproduct.getChildren();
			for (var j = 0; j < articleChildren.size(); j++) {
				var articlechild = articleChildren.get(j);
				eqCurrent.queueDerivedEvent(ReferenceDataChangeEvent, articlechild);
				logDebug(articlechild.getID() + ' (' + ReferenceDataChangeEvent.getID() + ') was added to ' + eqCurrent.getID());
			}
		}
		if (classproduct.getObjectType().getID() == prd_BundleArticle.getID()) {
			eqCurrent.queueDerivedEvent(ReferenceDataChangeEvent, classproduct);
			logDebug(classproduct.getID() + ' (' + ReferenceDataChangeEvent.getID() + ') was added to ' + eqCurrent.getID());
		}
	}
}
if (node.getObjectType().getID() == cla_ProductGroup.getID()) {
	var PGChildren = node.getChildren();
	for (var h = 0; h < PGChildren.size(); h++) {
		var PGchild = PGChildren.get(h);
		var classPL = PGchild.getClassificationProductLinks();
		for (var i = 0; i < classPL.size(); i++) {
			var classproduct = classPL.get(i).getProduct();
			if (classproduct.getObjectType().getID() == prd_Article.getID() || classproduct.getObjectType().getID() == prd_GiftBoxArticle.getID()) {
				var articleChildren = classproduct.getChildren();
				for (var j = 0; j < articleChildren.size(); j++) {
					var articlechild = articleChildren.get(j);
					eqCurrent.queueDerivedEvent(ReferenceDataChangeEvent, articlechild);
					logDebug(articlechild.getID() + ' (' + ReferenceDataChangeEvent.getID() + ') was added to ' + eqCurrent.getID());
				}
			}
			if (classproduct.getObjectType().getID() == prd_BundleArticle.getID()) {
				eqCurrent.queueDerivedEvent(ReferenceDataChangeEvent, classproduct);
				logDebug(classproduct.getID() + ' (' + ReferenceDataChangeEvent.getID() + ') was added to ' + eqCurrent.getID());
			}
		}
	}
}
if (node.getObjectType().getID() == cla_MainGroup.getID()) {
	var MGChildren = node.getChildren();
	for (var g = 0; g < MGChildren.size(); g++) {
		var MGchild = MGChildren.get(g);
		var PGChildren = MGchild.getChildren();
		for (var h = 0; h < PGChildren.size(); h++) {
			var PGchild = PGChildren.get(h);
			var classPL = PGchild.getClassificationProductLinks();
			for (var i = 0; i < classPL.size(); i++) {
				var classproduct = classPL.get(i).getProduct();
				if (classproduct.getObjectType().getID() == prd_Article.getID() || classproduct.getObjectType().getID() == prd_GiftBoxArticle.getID()) {
					var articleChildren = classproduct.getChildren();
					for (var j = 0; j < articleChildren.size(); j++) {
						var articlechild = articleChildren.get(j);
						eqCurrent.queueDerivedEvent(ReferenceDataChangeEvent, articlechild);
						logDebug(articlechild.getID() + ' (' + ReferenceDataChangeEvent.getID() + ') was added to ' + eqCurrent.getID());
					}
				}
				if (classproduct.getObjectType().getID() == prd_BundleArticle.getID()) {
					eqCurrent.queueDerivedEvent(ReferenceDataChangeEvent, classproduct);
					logDebug(classproduct.getID() + ' (' + ReferenceDataChangeEvent.getID() + ') was added to ' + eqCurrent.getID());
				}
			}
		}
	}
}

if (node.getObjectType().getID() == ast_Brand.getID() || node.getObjectType().getID() == ast_Award.getID() || node.getObjectType().getID() == ent_TasteProfile.getID() ||
node.getObjectType().getID() == ent_SubRegion.getID() || node.getObjectType().getID() == ent_Region.getID()) {
var products = node.getReferencedByProducts();
var x = products.iterator();
	while (x.hasNext()) {
		var productref = x.next();
		var productreftype = productref.getReferenceType();
		if (productreftype.getID() == ref_PlaceOfOrigin.getID() || node.getObjectType().getID() != ent_Region.getID()) {
			var product = productref.getSource();
			if (product.getObjectType().getID() == prd_Article.getID() || product.getObjectType().getID() == prd_GiftBoxArticle.getID()) {
				var articleChildren = product.getChildren();
				for (var j = 0; j < articleChildren.size(); j++) {
					var articlechild = articleChildren.get(j);
					eqCurrent.queueDerivedEvent(ReferenceDataChangeEvent, articlechild);
					logDebug(articlechild.getID() + ' (' + ReferenceDataChangeEvent.getID() + ') was added to ' + eqCurrent.getID());
				}
			}
			if (product.getObjectType().getID() == prd_BundleArticle.getID()) {
				eqCurrent.queueDerivedEvent(ReferenceDataChangeEvent, product);
				logDebug(product.getID() + ' (' + ReferenceDataChangeEvent.getID() + ') was added to ' + eqCurrent.getID());
			}
		}
	}
}
}