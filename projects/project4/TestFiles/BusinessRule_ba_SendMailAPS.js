/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SendMailAPS",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_WorkflowProcessing" ],
  "name" : "Send Mail APS",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article", "prd_BundleArticle", "prd_GiftBoxArticle", "prd_PackagingUnitCase", "prd_PackagingUnitPack", "prd_PackagingUnitPallet" ],
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
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
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
exports.operation0 = function (manager,node) {
var from_email = 'noreply@stibosystems.com';
var subject = 'STEP MDM: New Images to be processed';
var header = 'Beste gebruiker,<br/><br/>Articles have been added to your APS workflow. ';
var footer = 'Klik <a href="https://gall-prod-step.mdm.stibosystems.com/webui/web_ProductMDM#contextID=nl-NL&workspaceID=Main&screen=Workflow_Tasklist_Confirm_Primary_Asset&stateflow=wf_AddPrimaryAsset&onlyMine=Group&state=Upload_Image&displayMode=-1637139650.0">hier</a> om naar STEP MDM te gaan en de openstaande taken te bewerken.<br/><br/><br/>Dit is een automatisch verzonden bericht.<br/><br>Gall MDM platform';

var name = node.getName();
var email = 'gall@theapsgroup.com';


function sendMail(user_email, wfItems) {
    var MailHome = manager.getHome(com.stibo.mail.home.MailHome);
    var message = '';
    message += header;
    message += footer;
    var mailObj = MailHome.mail();
    mailObj.from(from_email);
    mailObj.addTo(email);
    mailObj.subject(subject);
    mailObj.htmlMessage(message);
    mailObj.send();
}
if (email) {
	sendMail(email, node);
}
}
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
    "contract" : "ManagerBindContract",
    "alias" : "manager",
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
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_DataProvider",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_DataProvider",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_GlobalLocationNumber",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_GlobalLocationNumber",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_GlobalTradeIdentificationNumbers",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_GlobalTradeIdentificationNumbers",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Precondition"
}
*/
exports.precondition0 = function (node,manager,att_GlobalTradeIdentificationNumber,ref_DataProvider,att_GlobalLocationNumber,ref_GlobalTradeIdentificationNumbers) {
var gtin = node.getValue(att_GlobalTradeIdentificationNumber.getID()).getSimpleValue();
var references = node.queryReferences(ref_DataProvider).asList(10);
var globalLocationNo;
if (references.size()>0) {
	globalLocationNo = references.get(0).getTarget().getValue(att_GlobalLocationNumber.getID()).getSimpleValue();
}
if (gtin && globalLocationNo) {
	var gtin = '00000000000000'.substring(1,15-gtin.length()) + gtin;
	var gtinObject = manager.getNodeHome().getObjectByKey('key_GTINObject', gtin);	logger.info(gtinObject);
	if (!gtinObject) {
	 	return false;
	} else {
		var referencesGTIN = gtinObject.queryReferencedBy(ref_GlobalTradeIdentificationNumbers).asList(10);
		if (referencesGTIN.size() > 0) {
			return true;
		} else {
			return false;
		}
	}
} else {
	return true;
}
}