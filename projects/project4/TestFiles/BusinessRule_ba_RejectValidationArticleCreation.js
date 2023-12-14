/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_RejectValidationArticleCreation",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Reject Validation Article Creation",
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
    "value" : "<AttributeValidatedContextParameter>\n  <Parameters>\n    <Parameter ID=\"Attribute\" Type=\"java.lang.String\">att_RejectedForUserGroups</Parameter>\n    <Parameter ID=\"ID\" Type=\"java.lang.String\">1</Parameter>\n  </Parameters>\n</AttributeValidatedContextParameter>",
    "description" : null
  }, {
    "contract" : "AttributeValidatedContextParameterStringBinding",
    "alias" : "instruction",
    "parameterClass" : "com.stibo.core.domain.businessrule.attributecontextparameter.AttributeValidatedContextParameter",
    "value" : "<AttributeValidatedContextParameter>\n  <Parameters>\n    <Parameter ID=\"Attribute\" Type=\"java.lang.String\">att_WorkflowInstructions</Parameter>\n    <Parameter ID=\"ID\" Type=\"java.lang.String\">2</Parameter>\n  </Parameters>\n</AttributeValidatedContextParameter>",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_RejectedForUserGroups",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_RejectedForUserGroups",
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
    "translations" : [ {
      "language" : "nl",
      "message" : "Artikel {article} heeft de creatie workflow nog niet voltooid en nog niet gepubliceerd. Voltooi de aanmaak voordat u een update aanvraagt."
    } ]
  } ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,workRequiredFrom,instruction,att_RejectedForUserGroups,att_WorkflowInstructions,manager,ErrorMessage) {
if (node.isInWorkflow('wf_CreateArticle')) {
	if (node.isInState('wf_CreateArticle','FinalValidationMerchandising')) {
		setAttributeValues();
		var task = node.getTaskByID('wf_CreateArticle','FinalValidationMerchandising');
		if (task) {
			task.triggerByID('Reject','Forwarded from Business rule');
		}
	}
}

function setAttributeValues() {
	if (workRequiredFrom) {
		var workRequiredFromValues = workRequiredFrom.split('<multisep/>');
		for (var x in workRequiredFromValues) {
			log.info(workRequiredFromValues[x]);
			node.getValue(att_RejectedForUserGroups.getID()).addLOVValueByID(workRequiredFromValues[x]);
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
/*===== business rule plugin definition =====
{
  "pluginId" : "ReferenceOtherBABusinessAction",
  "parameters" : [ {
    "id" : "ReferencedBA",
    "type" : "com.stibo.core.domain.businessrule.BusinessAction",
    "value" : "ba_ForwardScreen"
  } ],
  "pluginType" : "Operation"
}
*/
