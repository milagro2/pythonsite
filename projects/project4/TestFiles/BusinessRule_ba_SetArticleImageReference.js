/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SetArticleImageReference",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Set Article Image Reference",
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
  "pluginId" : "JavaScriptBusinessActionWithBinds",
  "binds" : [ {
    "contract" : "CurrentObjectBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_GlobalTradeIdentificationNumber",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_GlobalTradeIdentificationNumber",
    "description" : null
  }, {
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_LinkedGTIN",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_LinkedGTIN",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_Article",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_Article",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_Images",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_Images",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,att_GlobalTradeIdentificationNumber,manager,att_LinkedGTIN,prd_Article,ref_Images) {
/*Whenever a new Image is imported, if not already in STEP, a reference to the article needs to be created.
 */
//Retrieve the value of attribute Global Trade Identification Number
var gtin = node.getValue(att_LinkedGTIN.getID()).getSimpleValue();
if (gtin) {
    //Search all Article (prd_Article) objects with name is equal to the attribute Global Trade Identification Number
    var nameCondition = com.stibo.query.condition.Conditions.name();
    var condition = com.stibo.query.condition.Conditions;
    var home = manager.getHome(com.stibo.query.home.QueryHome);
    var querySpecification = home.queryFor(com.stibo.core.domain.Product).where(
        condition.valueOf(att_GlobalTradeIdentificationNumber).eq(gtin)
        .and(condition.objectType(prd_Article))
    );
    //If a Article object is found, create reference Image
    var result = querySpecification.execute().forEach(function(article) {
        try {
            article.createReference(node, ref_Images);
        } catch (e) {
            if (e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
                log.info('Reference is present already  -->' + e);
            } else {
                throw (e);
            }
        }
        return true;
    });
} else {
    throw 'Global Trade Identification Number (att_LinkedGTIN) is not set on the image';
}
}