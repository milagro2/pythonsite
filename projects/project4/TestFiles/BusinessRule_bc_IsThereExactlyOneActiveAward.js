/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "bc_IsThereExactlyOneActiveAward",
  "type" : "BusinessCondition",
  "setupGroups" : [ "brg_Conditions" ],
  "name" : "Is There Exactly One Active Award",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article" ],
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
    "contract" : "AttributeBindContract",
    "alias" : "att_VisibleShelfLabel",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_VisibleShelfLabel",
    "description" : null
  } ],
  "messages" : [ {
    "variable" : "InvalidMessage",
    "message" : "There can only be one award with Yes",
    "translations" : [ {
      "language" : "nl",
      "message" : "Er kan maar één award zijn met 'Ja'"
    } ]
  } ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,att_VisibleShelfLabel,InvalidMessage) {
var award_count = 0;
var dcId = 'dct_GallAwards';
var dcs = node.getDataContainerByTypeID(dcId).getDataContainers().iterator();
    while (dcs.hasNext()) {
        var dc = dcs.next();
        var shelf = dc.getDataContainerObject().getValue(att_VisibleShelfLabel.getID()).getLOVValue();
        if (shelf) {
	        var amount = shelf.getID();
	        if (amount == '-1') {
	            award_count++;
	        }
        }
    }

if (award_count< 2) {
        return true;
} else {
return new InvalidMessage();
}
}