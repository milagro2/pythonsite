/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "bc_IsThereExactlyOneDispatchPackUnit",
  "type" : "BusinessCondition",
  "setupGroups" : [ "brg_Conditions" ],
  "name" : "Is There Exactly One Dispatch Packaging Unit",
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
    "message" : "There must be one and only one packaging unit set to deliverable",
    "translations" : [ {
      "language" : "nl",
      "message" : "Er moet een en alleen een verpakkings eenheid zijn die leverbaar is"
    } ]
  } ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,bf_GetAllObjectsForAnArticle,att_OperationalPackagingRoles,InvalidMessage) {
/*
 * The functionality checks whether exactly one packaging unit linked to the article has the attribute
 * Operational Packaging Roles (att_OperationalPackagingRoles) containing 'isTradeItemADespatchUnit' (for LOV Value ID)
 *
 * - retrieve all the packaging units
 * - count the packaging units where the attribute value contains as value ID 'isTradeItemADespatchUnit'
 * - return true if it is one
 * - return message if zero or more then one
 */

var packaging_count = 0;
var params = {};
params.node = node;
var packagingUnits = bf_GetAllObjectsForAnArticle.evaluate(params).toArray();
for (var i in packagingUnits) {
    var packagingRoles = packagingUnits[i].getValue(att_OperationalPackagingRoles.getID()).getValues().iterator();
    while (packagingRoles.hasNext()) {
        packagingRole = String(packagingRoles.next().getID());
        if (packagingRole == 'isTradeItemADespatchUnit') {
            packaging_count++;
        }
    }
}
if (packaging_count == 1) {
return true;
}
return new InvalidMessage();
}