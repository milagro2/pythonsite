/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SendWorkflowStateReport",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Send Workflow State Report",
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
    "contract" : "EventProcessorEventBatchBindContract",
    "alias" : "eventBatch",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (eventBatch,manager) {
/*
 * The functionality sends an email to each user who has a task assigned to him/her or to the user group he or she belongs to.
 *
 */
var from_email = 'noreply@stibosystems.com';
var subject = 'STEP MDM: Dagelijks takenoverzicht';
var header = 'Beste gebruiker,<br/><br/>Het onderstaande overzicht bevat de aan jou of je team toegewezen taken in STEP MDM:';
var footer = 'Klik <a href="https://gall-prod-step.mdm.stibosystems.com/webui/web_ProductMDM">hier</a> om naar STEP MDM te gaan en de openstaande taken te bewerken.<br/><br/><br/>Dit is een automatisch verzonden bericht.<br/><br>Gall MDM platform';
var htmlstyle = '<style>table,th,tr,td{padding: 10px;border: 1px solid gray; border-collapse: collapse;}</style>';
var valid_tasks = {
    'wf_CreateArticle': [
        'PopulateArticleFromTradeItemInformation',
        'SalesPriceEnrichment',
        'CommercialEnrichment',
        'SetTasteProfileInfo',
        'SetShelfCardInfo',
        'AddCommercialText',
        'WaitForImage',
        'FinalValidationMerchandising',
    ],
    'wf_UpdateExistingArticle': [
        'ValidationOfTradeItemChanges',
        'ManualValidationCA',
        'ExternalTextWriterUpdate',
        'WineSpecialistUpdate',
    ],
    'wf_ZeroStockInformationWorkflow': [
        'RemoveStockFromWarehouse',
    ],
};

var valid_workflows = Object.keys(valid_tasks);
Object.keys(valid_tasks);

var events = eventBatch.getEvents().iterator();
var email_items = {};
var nodes = [];
var nodeIds = [];
while (events.hasNext()) {
    var event = events.next();
    var node = event.getNode();
    var nodeId = String(node.getID());
    if (nodeIds.indexOf(nodeId) != -1) //Same node can be added multiple times to event queue. Filter out
        {
continue;
}
    nodeIds.push(nodeId);
    nodes.push(node);
}

for (var key in nodes) {
    var node = nodes[key];
    var workflow_instances = node.getWorkflowInstances().iterator();
    while (workflow_instances.hasNext()) {
        var workflow_instance = workflow_instances.next();
        var workflow_obj = workflow_instance.getWorkflow();
        var workflow_id = String(workflow_obj.getID());
        if (valid_workflows.indexOf(workflow_id) == -1)//Workflow must be from the list above
            {
continue;
}
        var tasks = workflow_instance.getTasks().iterator();
        while (tasks.hasNext()) {
            var task = tasks.next();
            var state = task.getState();
            var task_id = String(state.getID());
            if (valid_tasks[workflow_id].indexOf(task_id) == -1) //State is not valid
                {
continue;
}
            var assignee = task.getAssignee();
            //Gather required data to show in the email for the task
            var data = {
                ItemNumber: node.getValue('att_ItemNumber').getSimpleValue() || '',
                STEPName: node.getName() || '',
                WorkflowName: workflow_obj.getName(),
                StateName: state.getTitle(),
                Assignee: assignee.getName(),
                EntryTime: task.getEntryTime(),
                TaskDeadline: task.getDeadline() || '',
            };
            //If the assignee is user group, get all users under the user group (Including sub groups)
            if (assignee.toString().indexOf('Group') != -1) {//Group - get all user emails
                var all_users = [];
                all_users = getGroupUserEmails(assignee, all_users);
                for (var i in all_users) {
                    email_items = addEmails(all_users[i], data, email_items);
                }
            } else {//Assignee is a user
                var email = String(assignee.getEMail() || '');//Get user email
                if (email != '') {
email_items = addEmails(email, data, email_items);
}
            }
        }
    }
}
//Send email based on the object formed from various tasks.
for (var user_email in email_items) {
    sendMail(user_email, email_items[user_email]);
}
//Send one mail per email with all the tasks.
function sendMail(user_email, wfItems) {
    var MailHome = manager.getHome(com.stibo.mail.home.MailHome);
    var message = '';
    message += header;
    message += htmlstyle;
    message += '<br/><br/><table><thead><tr><th>Item number</th><th>STEP name</th><th>Workflow name</th><th>State name</th>' +
            '<th>Assignee</th><th>Entry time</th><th>Task Deadline</th></tr></thead><tbody>';
    for (var i in wfItems) {
        var row = wfItems[i];
        message += '<tr><td>' + row['ItemNumber'] + '</td><td>' + row['STEPName'] + '</td><td>' +
                row['WorkflowName'] + '</td><td>' + row['StateName'] + '</td><td>' + row['Assignee'] +
                '</td><td>' + row['EntryTime'] + '</td><td>' + row['TaskDeadline'] + '</td></tr>';
    }
    message += '</tbody></table><br/>';
    message += footer;
    var mailObj = MailHome.mail();
    mailObj.from(from_email);
    mailObj.addTo(user_email);
    //mailObj.addTo("ront@stibosystems.com");
    mailObj.subject(subject);
    mailObj.htmlMessage(message);
    mailObj.send();
}
//Returns emails of all users under the user group include users under sub groups.
function getGroupUserEmails(userGroup, all_users) {
    //Check if usergroup children exist.
    var childUserGroups = userGroup.getChildren().iterator();
    while (childUserGroups.hasNext()) {
        var childUserGroup = childUserGroups.next();
        getGroupUserEmails(childUserGroup, all_users);
    }
    var users = userGroup.getUsers().iterator();
    while (users.hasNext()) {
        var user = users.next();
        var email = String(user.getEMail() || '');
        if (email != '') {
all_users.push(email);
}
    }
    return all_users;
}
//Create an entry for each user for every task
function addEmails(email, data, email_items) {
    if (Object.keys(email_items).indexOf(email) == -1) {
email_items[email] = [];
}
    email_items[email].push(data);//item
    return email_items;
}
}