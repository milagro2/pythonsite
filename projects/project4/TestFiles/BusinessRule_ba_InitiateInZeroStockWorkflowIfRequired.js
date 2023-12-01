/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_InitiateInZeroStockWorkflowIfRequired",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_WorkflowProcessing" ],
  "name" : "Initiate in Zero Stock Workflow if Required",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article", "prd_BundleArticle", "prd_GiftBoxArticle", "prd_PackagingUnitCase", "prd_PackagingUnitEach", "prd_PackagingUnitPack", "prd_PackagingUnitPallet" ],
  "allObjectTypesValid" : false,
  "runPrivileged" : true,
  "onApprove" : "Trigger",
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
    "contract" : "AttributeGroupBindContract",
    "alias" : "atg_InformationWhichRequiresZeroStock",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeGroupImpl",
    "value" : "atg_InformationWhichRequiresZeroStock",
    "description" : null
  }, {
    "contract" : "ManagerBindContract",
    "alias" : "step",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_ExciseGroup",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ExciseGroup",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_NetContents",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_NetContents",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_Article",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_Article",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_BundleArticle",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_BundleArticle",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_GiftBoxArticle",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_GiftBoxArticle",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_ZeroStockInformationChanges",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ZeroStockInformationChanges",
    "description" : null
  }, {
    "contract" : "BusinessActionBindContract",
    "alias" : "ba_SetCorrectUnitForNumberAttributes",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessActionImpl",
    "value" : "ba_SetCorrectUnitForNumberAttributes",
    "description" : null
  }, {
    "contract" : "BusinessActionBindContract",
    "alias" : "ba_SetDecimalsOnNumberValues",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessActionImpl",
    "value" : "ba_SetDecimalsOnNumberValues",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,atg_InformationWhichRequiresZeroStock,step,att_ExciseGroup,att_NetContents,prd_Article,prd_BundleArticle,prd_GiftBoxArticle,att_ZeroStockInformationChanges,ba_SetCorrectUnitForNumberAttributes,ba_SetDecimalsOnNumberValues) {
/*
 * First ensure that the object in main workspace has normalized number values & units
 */
ba_SetCorrectUnitForNumberAttributes.execute(node);
ba_SetDecimalsOnNumberValues.execute(node);


/*
 * If there changes on the attributes as stated in the attribute group, then the product needs to be added to the workflow "wf_ZeroStockInformationWorkflow" 
 * (only if it is not yet in the workflow).
 * If the product is approved for the first time, then the BR should not execute.
 * Please check whether it is still in the first state (on entry there is another business rule which might forward the item.
 * Added functionality on approval for Packaging Unit, in order to check for gestistillerd whether the attribute net contents has been updated.
 */

var notificationString = new java.lang.StringBuilder('');

log.info("Checking node for zero stock " + node.getID());

//Return values for all attributes in the attribute group for the current object
function getAttributeValues(product) {
    var values = {};
    var attributes = atg_InformationWhichRequiresZeroStock.getAllAttributes().iterator();
    log.info(product);
    while (attributes.hasNext()) {
        var attribute = attributes.next();
        var attributeId = attribute.getID();
        values[attributeId] = product.getValue(attribute.getID()) || "";
    }
    return values;
}
//check if the value for node has changed (Comparing with the approved context)
function checkAttributesChanged(node,notifications) {
    //Get all current values.
    var currentValues = getAttributeValues(node);    
    var node_id = node.getID();
    var isAttributeChanged = false;
    step.executeInWorkspace("Approved", function (manager) {
        var node_inapproved = manager.getProductHome().getProductByID(node_id);
        //Get values from approved context
        var approvedValues = getAttributeValues(node_inapproved);
        for (var i in approvedValues) {
        	//Compare and return status
        		var currentVal = approvedValues[i].getSimpleValue();
        		var newVal = currentValues[i].getSimpleValue();
        		if(!isNaN(currentValues[i].getValue()) && !isNaN(approvedValues[i].getValue())){
        			currentVal = parseFloat(approvedValues[i].getValue()).toFixed(2);
        			newVal = parseFloat(currentValues[i].getValue()).toFixed(2);
        		}

        		log.info("Comparing " + currentValues[i].getAttribute().getID() + ": Old Value = " + currentVal + " , New Value = " + newVal);
            if (currentVal != newVal) {
            	 notifications.append(currentValues[i].getAttribute().getName() + ' is gewijzigd van ' + currentVal + " naar " + newVal + ". ");
                isAttributeChanged = true;
            }
        }  
        
    });
    return isAttributeChanged;
}
function checkNetContentChanged(node, notifications){
    //Get all current values.
    var currentValue = node.getValue(att_NetContents.getID()).getSimpleValue();    
    var node_id = node.getID();
    var isAttributeChanged = false;
    step.executeInWorkspace("Approved", function (manager) {
        var node_inapproved = manager.getProductHome().getProductByID(node_id);
        //Get values from approved context
        var approvedValue = node.getValue(att_NetContents.getID()).getSimpleValue();
        	//Compare and return status
       if (approvedValue != currentValue) {
       	notifications.append('The attribute value of '+att_NetContents.getName() + ' has been changed\n ');
           isAttributeChanged = true;
        }     
    });
    return isAttributeChanged;
}

var initiateWorkflow = false;
var triggerEvent = false;
var triggerMessage = "";
var workflowId = "wf_ZeroStockInformationWorkflow";//wf_ZeroStockInformationWorkflow

if(node.getObjectType().getID().startsWith("prd_PackagingUnit")){
	log.info("In packaging unit if...");
	var parent = node.getParent();
	var exciseGroup = parent.getValue(att_ExciseGroup.getID()).getSimpleValue();
	if(parent.isInWorkflow("wf_CreateArticle") || parent.isInWorkflow("wf_CreateArticleOther") || node.isInWorkflow("wf_CreatePU")){
		log.info("In create wf..");
		initiateWorkflow = false;
		triggerEvent = false;
		triggerMessage = "Article creation";
	}else if ("gedistilleerd".equals(exciseGroup) && checkNetContentChanged(node, notificationString)){
			log.info("Is distilled & netContent");
			node = parent;
			initiateWorkflow = true;
	}else if (checkAttributesChanged(node, notificationString)){
			log.info("In Check attribute changed...");
			node = parent;
			initiateWorkflow = true;
	}else{
		log.info("In else statement....");
		node = parent;
		initiateWorkflow = true;
		triggerEvent = true;
		triggerMessage = "No Zero Stock relevant attributes changed";
	}
}else{
	log.info("In article / giftbox if....");
	if (node.isInWorkflow("wf_CreateArticle") || node.isInWorkflow("wf_CreateArticleOther")) {//Object is approved for the first time. 
	    //Initiate to the workflow and trigger to next state.
	    log.info("In create workflows");
	    initiateWorkflow = true;
	    triggerEvent = true;
	    triggerMessage = "Article creation";
	    	if (node.isInState("wf_CreateArticle", "Final_State")) {
	    		var workflowInstance = node.getWorkflowInstanceByID("wf_CreateArticle");
			workflowInstance.delete("Completed creation workflow");
		}else if (node.isInState("wf_CreateArticleOther", "Final_State")){
			var workflowInstance = node.getWorkflowInstanceByID("wf_CreateArticleOther");
			workflowInstance.delete("Completed creation workflow");
		}
	} else if (checkAttributesChanged(node, notificationString)) {
		log.info("Attributes changed");
	    //If already approved and attributes in group changed, then initiate to workflow
	    initiateWorkflow = true;
	} else {
		log.info("Else....");
		initiateWorkflow = true;
		triggerEvent = true;
		triggerMessage = "No zero stock relevant attributes changed";
	}
}

var workflowInstance = node.getWorkflowInstanceByID(workflowId);
var isBundle = false;
var approvalStatus = node.getApprovalStatus();
var revision = node.getRevision().getName();

if(node.getObjectType().getID().startsWith("prd_Bundle")) {
	isBundle = true;
}

log.info("initiateWorkflow = " + initiateWorkflow );
log.info("triggerEvent = " + triggerEvent );
log.info("triggerMessage = " + triggerMessage );
log.info("workflowInstance = " + workflowInstance );

if (initiateWorkflow && triggerEvent && !workflowInstance) {
	log.info("We should not be getting here for " + node.getID());
	log.info("intiate = " + initiateWorkflow + ", triggerEvent = " + triggerEvent);
	workflowInstance = node.startWorkflowByID(workflowId, "Initiated on approval: "+triggerMessage);
	log.info("workflowInstance = " + workflowInstance );
	
	var task = workflowInstance.getTaskByID("RemoveStockFromWarehouse");
	if (task) {
	   log.info("Autoforwarding for first time approval");
	   task.triggerByID("AutoForwardedFirstTimeApproval", triggerMessage);
	}
}else if (initiateWorkflow && !workflowInstance) {
	log.info("We should be getting here for " + node.getID());
	if (notificationString != '') {
		log.info(notificationString);
		node.getValue(att_ZeroStockInformationChanges.getID()).addValue(revision+ ": " +notificationString);
	}
	workflowInstance = node.startWorkflowByID(workflowId, "Initiated on approval: Zero stock relevant attributes");
	var task = workflowInstance.getTaskByID("RemoveStockFromWarehouse");

	workflowInstance.setSimpleVariable("isZeroStockRelevant", "YES");
	if (task) {
		
	   if(isBundle) {
	   	log.info("Forwarding bundles automatically");
	   	task.triggerByID("bundleForward", "Bundles are forwarded automatically");
	   } else {

	   	log.info("Doing stock check, valid stock attributes changed");
	    	task.triggerByID("Submit", "Stock is zero");
	   };
	   
	}
} else if (initiateWorkflow && workflowInstance) {
	log.info("Getting in last else...");
	if (notificationString != '') {
		var currentNotification = node.getValue(att_ZeroStockInformationChanges.getID()).getSimpleValue();
		if (approvalStatus != 'Completely Approved' || currentNotification == null) { 
			node.getValue(att_ZeroStockInformationChanges.getID()).addValue("v"+revision+ ": " +notificationString);			
		} else {
			node.getValue(att_ZeroStockInformationChanges.getID()).deleteCurrent();
			node.getValue(att_ZeroStockInformationChanges.getID()).addValue(revision+ ": " +notificationString);
		}
	}
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
    "contract" : "AttributeBindContract",
    "alias" : "att_OperationalPackagingRoles",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_OperationalPackagingRoles",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_PackagingUnitCase",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_PackagingUnitCase",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_PackagingUnitPack",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_PackagingUnitPack",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_PackagingUnitPallet",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_PackagingUnitPallet",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Precondition"
}
*/
exports.precondition0 = function (node,att_OperationalPackagingRoles,prd_PackagingUnitCase,prd_PackagingUnitPack,prd_PackagingUnitPallet) {
var packaging_count = 0;
if (node.getObjectType().equals(prd_PackagingUnitPallet) || node.getObjectType().equals(prd_PackagingUnitPack)|| node.getObjectType().equals(prd_PackagingUnitCase)){
	var packagingRoles = node.getValue(att_OperationalPackagingRoles.getID()).getValues().iterator();
	while (packagingRoles.hasNext()) {
	   packagingRole = String(packagingRoles.next().getID());
	   if (packagingRole == "isTradeItemAConsumerUnit" || packagingRole == "isTradeItemADespatchUnit") {
	       packaging_count++;
	   }
	}
}else{
	packaging_count++;
}
if (packaging_count > 0){
	return true
}else{
	return false
}
}
/*===== business rule plugin definition =====
{
  "pluginId" : "JavaScriptBusinessConditionWithBinds",
  "binds" : [ {
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Precondition"
}
*/
exports.precondition1 = function (manager) {
// Used to do partial approval of certain sets of data without triggering the approval of the zero stock workflow.
// Put in comments after usage.

var user = manager.getCurrentUser().getID();

if (user.equals("PNL0P78W")) {
	return false;
}


return true;
}