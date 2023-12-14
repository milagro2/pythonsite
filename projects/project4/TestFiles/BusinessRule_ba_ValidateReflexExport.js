/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_ValidateReflexExport",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_BulkActions" ],
  "name" : "ValidateReflexExport",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article" ],
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
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_NextLowerLevel",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_NextLowerLevel",
    "description" : null
  }, {
    "contract" : "CurrentObjectBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (ref_NextLowerLevel,node) {
var article = node;
var packagingUnits = article.getChildren().toArray();
logger.info("Checking " + packagingUnits.length + " : " + article.getID());

packagingUnits.forEach((packagingUnit) => {
  var nextLowerRefCount = 0;
  packagingUnit.getReferences(ref_NextLowerLevel).forEach((reference) => {
    nextLowerRefCount += 1;

    if (packagingUnit.getID().indexOf('Pallet') == -1) {
      var quantity = reference.getValue("att_QuantityOfNextLowerLevel").getValue();
      if (!quantity) {
        throw new Error('No next lower level quantity on ' + packagingUnit.getID())
      }
      if (nextLowerRefCount > 1) {
        throw new Error('Multiple next lower level references on ' + packagingUnit.getID())
      }
    }
    
	});

  if (nextLowerRefCount == 0) {
    throw new Error('No next lower level references on ' + packagingUnit.getID())
  }
})
}