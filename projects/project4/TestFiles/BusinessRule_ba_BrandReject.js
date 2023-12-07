/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_BrandReject",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Brand Reject",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "ast_Brand" ],
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
    "contract" : "WebUiContextBind",
    "alias" : "webUI",
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
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_Brand",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_Brand",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (webUI,manager,ref_Brand) {
function sendEmail(userTo, brandName, rejectMessage) {
	var MailHome = manager.getHome(com.stibo.mail.home.MailHome);
	var mailObj = MailHome.mail();
	mailObj.from("noreply@stibosystems.com");
	mailObj.subject("Brand Rejected: " + brandName);
	mailObj.addTo(userTo);
	mailObj.htmlMessage('Merk: [' + brandName + '] is afgewezen <br> Reden: [' + rejectMessage + '] <br> Groeten van commercial support,' );
	mailObj.send();
}

var selectedNodes = webUI.getSelection();

for (var i = 0; i < selectedNodes.size(); i++) {
	// Get brand
	var brand = selectedNodes.get(i);

	// Get the email of the person who created the brand
	var wfi = brand.getWorkflowInstanceByID('wf_CreateNewBrand');
	var email = wfi.getSimpleVariable('Executing_CA_Email');
	var rejectMessage = wfi.getSimpleVariable('Reject_Message');
	var brandName = brand.getName();

	// Remove from workflow
	wfi.delete('Exit from WF')

	// Delete brand references
	brand.queryReferencedBy(ref_Brand).forEach((reference) => {
		reference.delete();
		return true;
	});

	// Delete brand
	brand.delete();

	// Send an email after deletion was completed.
	if (email) {
		sendEmail(email, brandName, rejectMessage);
	}
}

webUI.navigate('Workflow_Tasklist_CreateNewBrand_Reject', null);
}