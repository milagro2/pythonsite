/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SetColloGTINOnArticle",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_SetValuesAndLinkes" ],
  "name" : "Set Collo GTIN on Article",
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
    "contract" : "BusinessFunctionBindContract",
    "alias" : "bfGetAllPackgingUnits",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>bfGetAllPackgingUnits</BusinessFunction>\n</BusinessFunctionReference>\n",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_GlobalTradeIdentificationNumber",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_GlobalTradeIdentificationNumber",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_ColloGlobalTradeIdentificationNumber",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ColloGlobalTradeIdentificationNumber",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_OperationalPackagingRoles",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_OperationalPackagingRoles",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,bfGetAllPackgingUnits,att_GlobalTradeIdentificationNumber,att_ColloGlobalTradeIdentificationNumber,att_OperationalPackagingRoles) {
/*
 * This function derives the Collo EAN code on teh article
 *
 * The Collo EAN Number (att_ColloGlobalTradeIdentificationNumber) on article is derived from the EAN Number (att_GlobalTradeIdentificationNumber) from the packaging unit
 * with the attribute Operational Packaging Roles (att_OperationalPackagingRoles) containing the value 'isTradeItemAnOrderableUnit' (LOV Value ID)
 *
 */


var packaging_count = 0;
var params = {};
var valid_ean_packaging_unit = false;
params.node = node;
var packagingUnits = bfGetAllPackgingUnits.evaluate(params).toArray();
for (var i in packagingUnits) {
    var packagingRoles = packagingUnits[i].getValue(att_OperationalPackagingRoles.getID()).getValues().iterator();
    while (packagingRoles.hasNext()) {
        packagingRole = String(packagingRoles.next().getID());
        if (packagingRole == 'isTradeItemAnOrderableUnit') {
            valid_ean_packaging_unit = packagingUnits[i];
            break;
        }
    }
}
if (valid_ean_packaging_unit) {
    var ean = valid_ean_packaging_unit.getValue('att_GlobalTradeIdentificationNumber').getSimpleValue() || '';
    node.getValue('att_ColloGlobalTradeIdentificationNumber').setSimpleValue(ean);
}
}