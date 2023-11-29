/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_InitiateWorkForTWorWS",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_WorkflowProcessing" ],
  "name" : "Initiate Work For Text writer or Wine Specialist",
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
    "contract" : "AttributeValidatedContextParameterStringBinding",
    "alias" : "workRequiredFrom",
    "parameterClass" : "com.stibo.core.domain.businessrule.attributecontextparameter.AttributeValidatedContextParameter",
    "value" : "<AttributeValidatedContextParameter>\n  <Parameters>\n    <Parameter ID=\"Attribute\" Type=\"java.lang.String\">att_WorkRequiredFromUserGroups</Parameter>\n    <Parameter ID=\"ID\" Type=\"java.lang.String\">1</Parameter>\n  </Parameters>\n</AttributeValidatedContextParameter>",
    "description" : null
  }, {
    "contract" : "AttributeValidatedContextParameterStringBinding",
    "alias" : "instruction",
    "parameterClass" : "com.stibo.core.domain.businessrule.attributecontextparameter.AttributeValidatedContextParameter",
    "value" : "<AttributeValidatedContextParameter>\n  <Parameters>\n    <Parameter ID=\"Attribute\" Type=\"java.lang.String\">att_WorkflowInstructions</Parameter>\n    <Parameter ID=\"ID\" Type=\"java.lang.String\">2</Parameter>\n  </Parameters>\n</AttributeValidatedContextParameter>",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_WorkRequiredFromUserGroups",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_WorkRequiredFromUserGroups",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_WorkflowInstructions",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_WorkflowInstructions",
    "description" : null
  }, {
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ {
    "variable" : "ErrorMessage",
    "message" : "Article {article} has not completed the creation workflow and has not yet been published. Please complete creation before requesting an update.",
    "translations" : [ ]
  }, {
    "variable" : "ErrorMessageMigration",
    "message" : "Article {article} has not completed the migration workflow. Please complete the migration workflow before requesting an update.",
    "translations" : [ ]
  } ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,workRequiredFrom,instruction,att_WorkRequiredFromUserGroups,att_WorkflowInstructions,manager,ErrorMessage,ErrorMessageMigration) {
/*Initiate work for for Text writer or wine specialist.
 *
 * Bindings:
 * workRequiredFrom --> Work Required From User Groups (att_WorkRequiredFromUserGroups)
 * instruction --> Workflow Instructions (att_WorkflowInstructions)
 *
 */
//If the article is in the workflow "Article creation" then throw an error "Article is still in the creation workflow"
if (node.isInWorkflow('wf_CreateArticle')) {
	errorMessage = new ErrorMessage();
	errorMessage.article = node.getName();
	throw errorMessage;
}
if (node.isInWorkflow('wf_CompleteMandatoryInfo')) {
	errorMessageMigration = new ErrorMessageMigration();
	errorMessageMigration.article = node.getName();
	throw errorMessageMigration;
}
/*If the article is in the workflow "Update Existing Article" and in the state "Manual Validation Commercial Assistant", then
 * Add the provided values to the corresponding attributes as multi value to the 'att_WorkRequiredFromUserGroups'
 * Add to the text 'att_WorkflowInstructions'
 * Forward the article through event "Further Updates Required"
 */
if (node.isInWorkflow('wf_UpdateExistingArticle')) {
	if (node.isInState('wf_UpdateExistingArticle','ManualValidationCA')) {
		setAttributeValues();
		var task = node.getTaskByID('wf_UpdateExistingArticle','ManualValidationCA');
		if (task) {
			task.triggerByID('Further_Updates_Required','Forwarded from Business rule');
		}
	} else {
		/*If the article is in the workflow "Update Existing Article" and not in the state "Manual Validation Commercial Assistant", then
		 * Remove the product from the workflow. Add the provided values to the corresponding attributes
		 *     As multi value to the 'att_WorkRequiredFromUserGroups'
		 *     Add to the text 'att_WorkflowInstructions'
		 *     Re-initiate the product in the workflow
		 *     Forward the product to the next state through event "User_Initiated_Update"
		 */
		var wf = manager.getWorkflowHome().getWorkflowByID('wf_UpdateExistingArticle');
		node.getWorkflowInstance(wf).delete('Exit from WF');
		setAttributeValues();
		wf.start(node,'Initiated from Business rule');
		var task = node.getTaskByID('wf_UpdateExistingArticle','Initial');
		if (task) {
			task.triggerByID('User_Initiated_update','Forwarded from Business rule');
		}
	}
} else {
	/*If the article is not in the workflow "Update Existing Article", then
	 * Set the provided values to the corresponding attributes (not adding, replacing)
	 * As multi value to the 'att_WorkRequiredFromUserGroups'
	 * Add to the text 'att_WorkflowInstructions'
	 * Initiate the product in the workflow
	 * Forward the product to the next state through event "User_Initiated_Update"
	 */
	setAttributeValues();
	manager.getWorkflowHome().getWorkflowByID('wf_UpdateExistingArticle').start(node,'Initiated from Business rule');
	var task = node.getTaskByID('wf_UpdateExistingArticle','Initial');
	if (task) {
		task.triggerByID('User_Initiated_update','Forwarded from Business rule');
	}
}

function setAttributeValues() {
	if (workRequiredFrom) {
		var workRequiredFromValues = workRequiredFrom.split('<multisep/>');
		for (var x in workRequiredFromValues) {
			log.info(workRequiredFromValues[x]);
			node.getValue(att_WorkRequiredFromUserGroups.getID()).addLOVValueByID(workRequiredFromValues[x]);
		}
	}
	if (instruction) {
		var existingInstruction = node.getValue(att_WorkflowInstructions.getID()).getSimpleValue();
		if (existingInstruction) {
			node.getValue(att_WorkflowInstructions.getID()).setSimpleValue(existingInstruction+'\n'+instruction);
		} else {
			node.getValue(att_WorkflowInstructions.getID()).setSimpleValue(instruction);
		}
	}
}
}