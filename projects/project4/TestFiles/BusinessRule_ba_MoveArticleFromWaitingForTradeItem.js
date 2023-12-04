/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_MoveArticleFromWaitingForTradeItem",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Move Article from Waiting For Trade Item",
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
    "alias" : "article",
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
    "contract" : "AttributeBindContract",
    "alias" : "att_TradeItemUnitDescriptor",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_TradeItemUnitDescriptor",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_Article",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_Article",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (article,ptp_PartnerArticle,att_TradeItemUnitDescriptor,prd_Article) {
function move(task) {
	// Sleep
	java.util.concurrent.TimeUnit.MINUTES.sleep(1);

	// Ensure article exists
	if (!article) {
		return;
	}

	// Ensure task exists
	if (!task) {
		return;
	}
	
	// Submit
	task.triggerByID('Submit','Trade item received');
}


//if giftbox: All is well: giftboxes can be created with a pack or a case as each.
//if article: Only ones created with an each are submitted. The rest will show an error message in WF variable: TIMSUpdate
var tradeItemUnitDescriptor = null;
article.getReferences(ptp_PartnerArticle).forEach((reference) => {
	tradeItemUnitDescriptor = reference.getTarget().getValue(att_TradeItemUnitDescriptor.getID()).getSimpleValue();
	logger.info(tradeItemUnitDescriptor + " Is de TI descriptor");
	return false;
});
logger.info('test');

if(!tradeItemUnitDescriptor){
	article.getWorkflowInstanceByID("wf_CreateArticle") && article.getWorkflowInstanceByID("wf_CreateArticle").setSimpleVariable('TIMSStatus', 'Er is geen TI descriptor!');
	article.getWorkflowInstanceByID("wf_CreateArticleOther") && article.getWorkflowInstanceByID("wf_CreateArticleOther").setSimpleVariable('TIMSStatus', 'Er is geen TI descriptor!');
	return;
}

if (article.getObjectType().getID() == prd_Article.getID() && tradeItemUnitDescriptor != 'BASE_UNIT_OR_EACH'){
	article.getWorkflowInstanceByID("wf_CreateArticle") && article.getWorkflowInstanceByID("wf_CreateArticle").setSimpleVariable('TIMSStatus', 'De EAN-code die je hebt geselecteerd is niet van een each! Verwijder dit artikel en probeer het opnieuw met de juiste EAN-code.');
	article.getWorkflowInstanceByID("wf_CreateArticleOther") && article.getWorkflowInstanceByID("wf_CreateArticleOther").setSimpleVariable('TIMSStatus', 'De EAN-code die je hebt geselecteerd is niet van een each! Verwijder dit artikel en probeer het opnieuw met de juiste EAN-code.');
	logger.info('This article does not have an each as TI');
	return;
}



//Submit WF state
var waitForTradeItemWFCreate = article.getTaskByID('wf_CreateArticle','WaitForTradeItem');
var waitForTradeItemWFCreateOther = article.getTaskByID('wf_CreateArticleOther','WaitForTradeItem');

if (waitForTradeItemWFCreate != null) {
	move(waitForTradeItemWFCreate);
}

if (waitForTradeItemWFCreateOther != null) {
	move(waitForTradeItemWFCreateOther);
}

article.getWorkflowInstanceByID("wf_CreateArticle") && article.getWorkflowInstanceByID("wf_CreateArticle").setSimpleVariable('TIMSStatus', 'Succes');
article.getWorkflowInstanceByID("wf_CreateArticleOther") && article.getWorkflowInstanceByID("wf_CreateArticleOther").setSimpleVariable('TIMSStatus', 'Succes');
logger.info('Submit van de Wait for TI');
}