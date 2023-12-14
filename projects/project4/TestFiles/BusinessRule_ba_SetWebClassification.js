/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SetWebClassification",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_SetValuesAndLinkes" ],
  "name" : "Set Web Classification automatically",
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
    "alias" : "prd_SalesChannelInformation",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_SalesChannelInformation",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_SalesChannel",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_SalesChannel",
    "description" : null
  }, {
    "contract" : "ClassificationProductLinkTypeBindContract",
    "alias" : "ptc_COSMOSArticleGroup",
    "parameterClass" : "com.stibo.core.domain.impl.ClassificationProductLinkTypeImpl",
    "value" : "ptc_COSMOSArticleGroup",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ctc_DefaultWebCategory",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ctc_DefaultWebCategory",
    "description" : null
  }, {
    "contract" : "ClassificationProductLinkTypeBindContract",
    "alias" : "ptc_WebClassification",
    "parameterClass" : "com.stibo.core.domain.impl.ClassificationProductLinkTypeImpl",
    "value" : "ptc_WebClassification",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,prd_SalesChannelInformation,att_SalesChannel,ptc_COSMOSArticleGroup,ctc_DefaultWebCategory,ptc_WebClassification) {
/*Based on the reference of the Default Web Category on the Product Group, determine the assignment of the Article to the Web Category
 * Bindings:
 * salesChannelInformationObjectType --> Sales Channel Information (prd_SalesChannelInformation)
 * salesChannelAtt --> Sales Channel (att_SalesChannel)
 * cosmosArticleGroupLinkType --> COSMOS Article Group (ptc_COSMOSArticleGroup)
 * defaultWebCategoryRef --> Default Web Category (ctc_DefaultWebCategory)
 * webClassificationLinkType --> Web Classification (ptc_WebClassification)
 */
var webShopCategory;
//Retrieve target Article Group of reference COSMOS Article Group .
var classificationReferences = node.queryClassificationProductLinks(ptc_COSMOSArticleGroup).asList(10);
if(classificationReferences.size()>0){
	//Retrieve Parent ID, Product Group (cla_ProductGroup), of Article Group (cla_ArticleGroup).
      var parentArticleGroup = classificationReferences.get(0).getClassification().getParent();
	//retrieve target Web Shop Category (cla_WebShopCategory) of reference Default Web Category 
      var webCategoryReferences = parentArticleGroup.queryReferences(ctc_DefaultWebCategory).asList(10);
      if(webCategoryReferences.size()>0){
      	webShopCategory = webCategoryReferences.get(0).getTarget();
      }
}
//Set retrieved Web Shop Category (cla_WebShopCategory) as target of reference Web Classification (ptc_WebClassification), 
//where the source is the Sales Channel Information (prd_SalesChannelInformation) object.
if(webShopCategory){
	var children = node.getChildren().toArray();
	for(var child in children){
		if(children[child].getObjectType().getID().equals(prd_SalesChannelInformation.getID()) 
			&& "Gall.nl".equals(children[child].getValue(att_SalesChannel.getID()).getSimpleValue())){				
			try{
				webShopCategory.createClassificationProductLink(children[child], ptc_WebClassification);
			}catch(e){
				if (e.javaException instanceof com.stibo.core.domain.reference.SingleReferenceConstraintException) {
	 				log.info("Multiple References are not allowed");
		 		}else{
	           		throw (e);
		 		}
			}
		}
	}
}
}