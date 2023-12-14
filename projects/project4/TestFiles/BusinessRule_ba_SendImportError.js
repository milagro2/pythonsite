/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SendImportError",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Send Import Error",
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
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,manager,att_GlobalTradeIdentificationNumber,ref_DataProvider,att_GlobalLocationNumber,ref_GlobalTradeIdentificationNumbers) {
var gtin = node.getValue(att_GlobalTradeIdentificationNumber.getID()).getSimpleValue();
var references = node.queryReferences(ref_DataProvider).asList(10);
var globalLocationNo;
if (references.size()>0) {
	globalLocationNo = references.get(0).getTarget().getValue(att_GlobalLocationNumber.getID()).getSimpleValue();
} else {
	node.getValue('att_WorkflowInstructions').addValue('No Supplier has been selected. Please check the entered GLN code.');
}
if (!gtin) {
	node.getValue('att_WorkflowInstructions').addValue('Please enter the EAN Number information.');
} else {
	var gtin = '00000000000000'.substring(1,15-gtin.length()) + gtin;
	var gtinObject = manager.getNodeHome().getObjectByKey('key_GTINObject', gtin);
	if (gtinObject) {
		var referencesGTIN = gtinObject.queryReferencedBy(ref_GlobalTradeIdentificationNumbers).asList(10);
		if (referencesGTIN.size() > 0) {
		node.getValue('att_WorkflowInstructions').addValue('The EAN number is already in use.');
		}
	}
}
}
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
  }, {
    "contract" : "SimpleValueBindContract",
    "alias" : "att_GlobalTradeIdentificationNumber",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_GlobalTradeIdentificationNumber",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation1 = function (manager,node,att_GlobalTradeIdentificationNumber) {
var from_email = 'noreply@stibosystems.com';
var subject = 'STEP MDM: Failed import';
var header = 'Beste gebruiker,<br/><br/>Het onderstaande overzicht bevat de aan jou of je team toegewezen taken in STEP MDM:';
var footer = 'Klik <a href="https://gall-preprod-step.mdm.stibosystems.com/webui/web_ProductMDM#contextID=nl-NL&workspaceID=Main&screen=Workflow_ImportArticle_TaskList&stateflow=wf_ImportArticle&onlyMine=Group&state=ValidateImport&displayMode=-1616202057.0&cellSelection=1046141202.0x0">hier</a> om naar STEP MDM te gaan en de openstaande taken te bewerken.<br/><br/><br/>Dit is een automatisch verzonden bericht.<br/><br>Gall MDM platform';
var htmlstyle = '<style>table,th,tr,td{padding: 10px;border: 1px solid gray; border-collapse: collapse;}</style>';
var name = node.getName();
var error = node.getValue('att_WorkflowInstructions').getSimpleValue();
var workflowInstance = node.getWorkflowInstanceByID('wf_ImportArticle');
if (workflowInstance) {
	var task = workflowInstance.getTaskByID('ValidateImport');
	var assignee = task.getAssignee();
	var email = String(assignee.getEMail() || '');
}


function sendMail(user_email, wfItems) {
    var MailHome = manager.getHome(com.stibo.mail.home.MailHome);
    var message = '';
    message += header;
    message += htmlstyle;
    message += '<br/><br/><table><thead><tr><th>EAN Number</th><th>Name</th><th>Error</th></tr></thead><tbody>';
    var row = node;
    message += '</td><td>' + att_GlobalTradeIdentificationNumber + '</td><td>' + name + '</td><td>' + error;
    message += '</tbody></table><br/>';
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