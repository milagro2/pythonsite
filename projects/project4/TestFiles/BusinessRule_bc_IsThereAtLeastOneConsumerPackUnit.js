/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "bc_IsThereAtLeastOneConsumerPackUnit",
  "type" : "BusinessCondition",
  "setupGroups" : [ "brg_Conditions" ],
  "name" : "Is There At Least One Consumer Packaging Unit",
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
    "alias" : "att_OperationalPackagingRoles",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_OperationalPackagingRoles",
    "description" : null
  } ],
  "messages" : [ {
    "variable" : "InvalidMessage",
    "message" : "There must be at least one packaging unit set to sellable",
    "translations" : [ {
      "language" : "nl",
      "message" : "Er moet minimaal een verpakkings eenheid zijn die verkoopbaar is"
    } ]
  } ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,bf_GetAllObjectsForAnArticle,att_OperationalPackagingRoles,InvalidMessage) {
/*
 * The functionality checks whether at least one packaging unit linked to the article has the attribute
 * Operational Packaging Roles (att_OperationalPackagingRoles) containing 'isTradeItemAConsumerUnit' (for LOV Value ID)
 *
 * - retrieve all the packaging units
 * - count the packaging units where the attribute value contains as value ID 'isTradeItemAConsumerUnit'
 * - return true if it is one or more
 * - return message if zero
 */

var packaging_count = 0;
var params = {};
params.node = node;
var packagingUnits = bf_GetAllObjectsForAnArticle.evaluate(params).toArray();
for (var i in packagingUnits) {
    var packagingRoles = packagingUnits[i].getValue(att_OperationalPackagingRoles.getID()).getValues().iterator();
    while (packagingRoles.hasNext()) {
        packagingRole = String(packagingRoles.next().getID());
        if (packagingRole == 'isTradeItemAConsumerUnit') {
            packaging_count++;
        }
    }
}
if (packaging_count > 0) {
        return true;
} else {
return new InvalidMessage();
}
}