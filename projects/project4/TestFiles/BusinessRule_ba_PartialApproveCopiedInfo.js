/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_PartialApproveCopiedInfo",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_CopyTradeItem" ],
  "name" : "Partial Approve Copied Info",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_TradeItem" ],
  "allObjectTypesValid" : false,
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
    "contract" : "AttributeGroupBindContract",
    "alias" : "atg_TIIArticle_AlwaysOverwrite",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeGroupImpl",
    "value" : "atg_TIIArticle_AlwaysOverwrite",
    "description" : null
  }, {
    "contract" : "AttributeGroupBindContract",
    "alias" : "atg_TIIPack_AlwaysOverwrite",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeGroupImpl",
    "value" : "atg_TIIPack_AlwaysOverwrite",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ptp_PartnerArticle",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ptp_PartnerArticle",
    "description" : null
  }, {
    "contract" : "BusinessFunctionBindContract",
    "alias" : "bf_GetArticleFromPackagingUnit",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>bf_GetArticleFromPackagingUnit</BusinessFunction>\n</BusinessFunctionReference>\n",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,atg_TIIArticle_AlwaysOverwrite,atg_TIIPack_AlwaysOverwrite,ptp_PartnerArticle,bf_GetArticleFromPackagingUnit) {
var copiedInformationList = new java.util.ArrayList();
var attributes = atg_TIIArticle_AlwaysOverwrite.getAttributes().toArray();
for (var x in attributes) {
	copiedInformationList.add(attributes[x].getID());
}
var dataContainers = atg_TIIArticle_AlwaysOverwrite.getDataContainerTypes().toArray();
for (var x in dataContainers) {
	copiedInformationList.add(dataContainers[x].getID());
}
var references = atg_TIIArticle_AlwaysOverwrite.getLinkTypes().toArray();
for (var x in references) {
	copiedInformationList.add(references[x].getID());
}

var attributes = atg_TIIPack_AlwaysOverwrite.getAttributes().toArray();
for (var x in attributes) {
	copiedInformationList.add(attributes[x].getID());
}
var dataContainers = atg_TIIPack_AlwaysOverwrite.getDataContainerTypes().toArray();
for (var x in dataContainers) {
	copiedInformationList.add(dataContainers[x].getID());
}
var references = atg_TIIPack_AlwaysOverwrite.getLinkTypes().toArray();
for (var x in references) {
	copiedInformationList.add(references[x].getID());
}

node.queryReferencedBy(ptp_PartnerArticle).forEach(function(reference) {
	var source = reference.getSource();
	var workflowCreate;
	var workflowCreateOther;
	var inWF = false;
	
	if(source.getObjectType().getID() == "prd_Article") {
		workflowCreate = source.isInWorkflow('wf_CreateArticle');
		workflowCreateOther = source.isInWorkflow('wf_CreateArticleOther');
	} else {
		var article = bf_GetArticleFromPackagingUnit.evaluate({"node" : source});
		workflowCreate = article.isInWorkflow('wf_CreateArticle');
		workflowCreateOther = article.isInWorkflow('wf_CreateArticleOther');
	}

	if(workflowCreate || workflowCreateOther) {
		inWF = true;
	}
	partialApprove(source, copiedInformationList, inWF);
	return true;
});


//Partial approve copied information
function partialApprove(node, informationObjectIDs, inWF) {
	var parts_not_approved = node.getNonApprovedObjects();
	log.info("Not approved before check = " + parts_not_approved);
	var parts_itr = parts_not_approved.iterator();
		while (parts_itr.hasNext()) {
		var parts_object = parts_itr.next();
		if (parts_object.toString().indexOf('ValuePartObject') != -1) {//Only consider attributes
			if (informationObjectIDs.indexOf(String(parts_object.getAttributeID())) == -1) {//Only consider copied attributes
				parts_itr.remove();
				continue;
			}
		} else if (parts_object.toString().indexOf('DataContainerPartObject') != -1) {//Only consider data containers
			if (informationObjectIDs.indexOf(String(parts_object.getDataContainerTypeID())) == -1) {//Only consider copied Data Containers
				parts_itr.remove();
				continue;
			}
		} else if (parts_object.toString().indexOf('ClassificationLinkPartObject') != -1) {//Only consider classification links
			if (informationObjectIDs.indexOf(String(parts_object.getLinkTypeID())) == -1) {//Only consider copied Classification Links
				parts_itr.remove();
				continue;
			}
		} else if (parts_object.toString().indexOf('ReferencePartObject') != -1) {//Only consider references
			if (informationObjectIDs.indexOf(String(parts_object.getReferenceType())) == -1) {//Only consider copied References
				parts_itr.remove();
				continue;
			}
		}
	}
	//Approve only authorized information objects
	log.info("Not approved after check = " + parts_not_approved);
	log.info("Article in WF = "+ inWF);
	//We check for create workflow because a partial approval will trigger the zero stock workflow, which will trigger the initiate autoforward from create/other 
	// and this will approve everything and send it to cosmos. 
	if(!inWF && parts_not_approved.size() > 0) {
			node.approve(parts_not_approved);
	}
}
}