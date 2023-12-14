/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "bc_BrandBlockIfNeverApproved",
  "type" : "BusinessCondition",
  "setupGroups" : [ "brg_Conditions" ],
  "name" : "BrandBlockIfNeverApproved",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article", "prd_BundleArticle", "prd_GiftBoxArticle" ],
  "allObjectTypesValid" : true,
  "runPrivileged" : false,
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
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_Brand",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_Brand",
    "description" : null
  } ],
  "messages" : [ {
    "variable" : "brandNotApprovedMessage",
    "message" : "Het merk is nog niet goedgekeurd door de CS, wacht totdat je kunt approven",
    "translations" : [ ]
  } ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,ref_Brand,brandNotApprovedMessage) {
// This BR checks if the brand is approved before we can approve the article in commercial enrichment
// if an article would be sent without approved brand the export file to cosmos will be empty

var brandApprovalStatus = node.queryReferences(ref_Brand).asList(1).get(0).getTarget().getApprovalStatus();

if (brandApprovalStatus == 'Not in Approved workspace'){
	errormessage = new brandNotApprovedMessage();
	return false, errormessage;
}

return true;

}