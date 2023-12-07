/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_RequestTIMSUpdate",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Request TIMS Update",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article" ],
  "allObjectTypesValid" : true,
  "runPrivileged" : false,
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
    "contract" : "WebUiContextBind",
    "alias" : "web",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ptp_PartnerArticle",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ptp_PartnerArticle",
    "description" : null
  }, {
    "contract" : "BusinessActionBindContract",
    "alias" : "ba_PostEventToTIMS",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessActionImpl",
    "value" : "ba_PostEventToTIMS",
    "description" : null
  }, {
    "contract" : "BusinessActionBindContract",
    "alias" : "ba_PostEventToTIMSHierarchy",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessActionImpl",
    "value" : "ba_PostEventToTIMSHierarchy",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,web,ptp_PartnerArticle,ba_PostEventToTIMS,ba_PostEventToTIMSHierarchy) {
function requestTIMSUpdate(tradeItem) {
    ba_PostEventToTIMS.execute(tradeItem);
    ba_PostEventToTIMSHierarchy.execute(tradeItem);
  }

  var selectionWeb = web.getSelection();
  var selection = [];

  // Add node if not null
  if (node) {
    selection.push(node);
  }

  // Add webUI selection
  for (var i = 0; i < selectionWeb.size(); i++) {
    var currentNode = selectionWeb.get(i);
    selection.push(currentNode);
  }

  // Request TIMS update for each node in selection
  for (var i = 0; i < selection.length; i++) {
    var currentNode = selection[i];

    var tradeItemQuery = currentNode.queryReferences(ptp_PartnerArticle);
    tradeItemQuery.forEach(function (tradeItemReference) {
      requestTIMSUpdate(tradeItemReference.getTarget());
      return true;
    });
  }
}