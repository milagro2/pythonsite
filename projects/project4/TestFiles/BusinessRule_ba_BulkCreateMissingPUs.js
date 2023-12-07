/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_BulkCreateMissingPUs",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Bulk Create Missing PUs",
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
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ptp_PartnerArticle",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ptp_PartnerArticle",
    "description" : null
  }, {
    "contract" : "BusinessFunctionBindContract",
    "alias" : "bf_GetPackagingStructure",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>bf_GetPackagingStructure</BusinessFunction>\n</BusinessFunctionReference>\n",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_TradeItemUnitDescriptor",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_TradeItemUnitDescriptor",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_NextLowerLevel",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_NextLowerLevel",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_Article",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_Article",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_GlobalTradeIdentificationNumber",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_GlobalTradeIdentificationNumber",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_POSDescription",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_POSDescription",
    "description" : null
  }, {
    "contract" : "BusinessActionBindContract",
    "alias" : "ba_SetShelfCard",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessActionImpl",
    "value" : "ba_SetShelfCard",
    "description" : null
  }, {
    "contract" : "BusinessActionBindContract",
    "alias" : "ba_SetCreationDate",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessActionImpl",
    "value" : "ba_SetCreationDate",
    "description" : null
  }, {
    "contract" : "BusinessActionBindContract",
    "alias" : "ba_CreateNewGTIN",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessActionImpl",
    "value" : "ba_CreateNewGTIN",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_QuantityOfNextLowerLevel",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_QuantityOfNextLowerLevel",
    "description" : null
  }, {
    "contract" : "BusinessActionBindContract",
    "alias" : "ba_CopyTIInformation",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessActionImpl",
    "value" : "ba_CopyTIInformation",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_GiftBoxArticle",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_GiftBoxArticle",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,ptp_PartnerArticle,bf_GetPackagingStructure,att_TradeItemUnitDescriptor,ref_NextLowerLevel,prd_Article,att_GlobalTradeIdentificationNumber,att_POSDescription,ba_SetShelfCard,ba_SetCreationDate,ba_CreateNewGTIN,att_QuantityOfNextLowerLevel,ba_CopyTIInformation,prd_GiftBoxArticle) {
function getObjectTypeFromDescriptor(descriptor) {
	var map = {
		'PACK_OR_INNER_PACK': 'prd_PackagingUnitPack',
		'CASE': 'prd_PackagingUnitCase',
		'DISPLAY_SHIPPER': 'prd_PackagingUnitPallet',
		'PALLET': 'prd_PackagingUnitPallet',
	}

	var result = map[descriptor];
	if (!result) {
		throw new Error('No object type found for descriptor : ' + descriptor);
	}
	return result;
}

function setValuesAndReferences(packagingUnit, tradeItem) {
	var tradeItemGTIN = tradeItem.getValue(att_GlobalTradeIdentificationNumber.getID()).getSimpleValue();
	packagingUnit.setName(tradeItem.getName());
	packagingUnit.getValue(att_GlobalTradeIdentificationNumber.getID()).setSimpleValue(tradeItemGTIN);
	packagingUnit.createReference(tradeItem, ptp_PartnerArticle);
	var nameValue = String(tradeItem.getName()).toUpperCase().substring(0,24);
	packagingUnit.getValue(att_POSDescription.getID()).setSimpleValue(nameValue);
	ba_SetShelfCard.execute(packagingUnit);
	ba_SetCreationDate.execute(packagingUnit);
	ba_CreateNewGTIN.execute(packagingUnit);
	ba_CopyTIInformation.execute(tradeItem);
}

function createPU(tradeItem, article) {
	var tradeItemUnitDescriptor = tradeItem.getValue(att_TradeItemUnitDescriptor.getID()).getSimpleValue();
	var objectType = getObjectTypeFromDescriptor(tradeItemUnitDescriptor);
	var pu = article.createProduct('', objectType);
	setValuesAndReferences(pu, tradeItem);
	if (tradeItemUnitDescriptor == 'PACK_OR_INNER_PACK' || tradeItemUnitDescriptor == 'CASE') {
		pu.startWorkflowByID('wf_CreatePU', 'New PU created with type : ' + objectType);
	}
}

// Get other trade items
var searchMap = {};
var searchList = [];
var articleTradeItems = [];
searchList.push(node);

while(searchList.length > 0) {
    // Get search item
	var currentTradeItem = searchList.pop();
    
    // If we've seen this item before, ignore
    if (searchMap[currentTradeItem.getID()]) {
        continue;
    }
    
    // Otherwise push to result list
    searchMap[currentTradeItem.getID()] = currentTradeItem;
    articleTradeItems.push(currentTradeItem);
	
    // And add children to search list
	currentTradeItem.queryReferences(ref_NextLowerLevel).forEach((reference) => {
		var source = reference.getTarget();
		searchList.push(source);
		return true;
	})
}

var article;
articleTradeItems.forEach((tradeItem) => {
	var tradeItemUnitDescriptor = tradeItem.getValue(att_TradeItemUnitDescriptor.getID()).getSimpleValue();
	if (tradeItemUnitDescriptor == 'BASE_UNIT_OR_EACH') {
		var refs = tradeItem.queryReferencedBy(ptp_PartnerArticle).asList(100);
		tradeItem.queryReferencedBy(ptp_PartnerArticle).forEach((reference) => {
			var sourceObjectID = reference.getSource().getObjectType().getID();
			if (sourceObjectID.equals(prd_Article.getID()) || sourceObjectID.equals(prd_GiftBoxArticle.getID())) {
				article = reference.getSource();
			}
			return true;
		});
	}
})

// If there's no article, skip
if (!article) {
    throw new Error('No article found')
}

// If the article is in a creation workflow, skip
if (article.isInWorkflow("wf_CreateArticle") 
|| article.isInWorkflow("wf_CreateArticleOther")
|| article.isInWorkflow("wf_CompleteMandatoryInfo")) {
	throw new Error('Article is in workflow')
}

// Check article to see if PU exists
var tradeItemUnitDescriptor = node.getValue(att_TradeItemUnitDescriptor.getID()).getSimpleValue();
var objectType = getObjectTypeFromDescriptor(tradeItemUnitDescriptor);
article.getChildren().toArray().forEach((child) => {
	if (child.getObjectType().getID() == objectType) {
		throw new Error('PU already exists');
	}
});

createPU(node, article)

// If You want to do the same thing from article,
// keeping for future use
/* 
function setValuesAndReferences(packagingUnit, tradeItem) {
	var tradeItemGTIN = tradeItem.getValue(att_GlobalTradeIdentificationNumber.getID()).getSimpleValue();
	packagingUnit.setName(tradeItem.getName());
	packagingUnit.getValue(att_GlobalTradeIdentificationNumber.getID()).setSimpleValue(tradeItemGTIN);
	packagingUnit.createReference(tradeItem, ptp_PartnerArticle);

	var nameValue = String(tradeItem.getName()).toUpperCase().substring(0,24);
	packagingUnit.getValue(att_POSDescription.getID()).setSimpleValue(nameValue);
	ba_SetShelfCard.execute(packagingUnit);
	ba_SetCreationDate.execute(packagingUnit);
	ba_CreateNewGTIN.execute(packagingUnit);
	ba_CopyTIInformation.execute(tradeItem);
}

function createPU(tradeItem, article) {
	var tradeItemUnitDescriptor = tradeItem.getValue(att_TradeItemUnitDescriptor.getID()).getSimpleValue();

    if (tradeItemUnitDescriptor == 'PACK_OR_INNER_PACK') {
        var packPU = article.createProduct('','prd_PackagingUnitPack');
        setValuesAndReferences(packPU, tradeItem);
        packPU.startWorkflowByID('wf_CreatePU','New Pack created');
    } else if (tradeItemUnitDescriptor == 'CASE') {
        var casePU = article.createProduct('','prd_PackagingUnitCase');
        setValuesAndReferences(casePU, tradeItem);
        casePU.startWorkflowByID('wf_CreatePU','New Case created');
    } else if (tradeItemUnitDescriptor == 'DISPLAY_SHIPPER' || tradeItemUnitDescriptor == 'PALLET') {
        var palletPU = article.createProduct('','prd_PackagingUnitPallet');
        setValuesAndReferences(palletPU, tradeItem);
    }
}

// Node is article
var article = node;

// If there's no article, skip
if (!article) {
    throw new Error('No article found')
}

// If the article is in a creation workflow, skip
if (article.isInWorkflow("wf_CreateArticle") 
|| article.isInWorkflow("wf_CreateArticleOther")
|| article.isInWorkflow("wf_CompleteMandatoryInfo")) {
	throw new Error('Article is in workflow')
}

// Get tradeItem from article
var tradeItems = article.queryReferences(ptp_PartnerArticle).asList(100);
if (tradeItems.size() != 1) {
	throw new Error('Provided article has less or more than one ptp_PartnerArticle reference')
}
var tradeItem = tradeItems.get(0).getTarget()

// Get other trade items
var searchMap = {};
var searchList = [];
var articleTradeItems = [];
searchList.push(tradeItem);

while(searchList.length > 0) {
    // Get search item
	var currentTradeItem = searchList.pop();
    
    // If we've seen this item before, ignore
    if (searchMap[currentTradeItem.getID()]) {
        continue;
    }
    
    // Otherwise push to result list
    searchMap[currentTradeItem.getID()] = currentTradeItem;
    articleTradeItems.push(currentTradeItem);
	
    // And add children to search list
	currentTradeItem.queryReferencedBy(ref_NextLowerLevel).forEach((reference) => {
		var source = reference.getSource();
		searchList.push(source);
		return true;
	})
}

// Create PU for each trade item
articleTradeItems.forEach((tradeItem) => {
	var pus = [];
	tradeItem.queryReferencedBy(ptp_PartnerArticle).forEach((reference) => {
		var source = reference.getSource();
		var typeID = source.getObjectType().getID();
		if (typeID == 'prd_PackagingUnitEach' || 
		typeID == 'prd_PackagingUnitPack' || 
		typeID == 'prd_PackagingUnitCase' || 
		typeID == 'prd_PackagingUnitPallet') {
			pus.push(source)
		}
		return true
	});

	if (pus.length == 0) {
		logger.info('CREATE PU : ' + tradeItem.getName())
		// createPU(tradeItem, article)
	}
})

*/
}