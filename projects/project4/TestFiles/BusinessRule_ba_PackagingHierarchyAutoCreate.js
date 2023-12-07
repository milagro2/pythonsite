/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_PackagingHierarchyAutoCreate",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Packaging Hierarchy Auto Create",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article", "prd_GiftBoxArticle" ],
  "allObjectTypesValid" : false,
  "runPrivileged" : true,
  "onApprove" : "Never",
  "dependencies" : [ {
    "libraryId" : "lib_TradeItems",
    "libraryAlias" : "lib_TradeItems"
  } ]
}
*/
/*===== business rule plugin definition =====
{
  "pluginId" : "JavaScriptBusinessActionWithBinds",
  "binds" : [ {
    "contract" : "ManagerBindContract",
    "alias" : "managertest",
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
exports.operation0 = function (manager,node,lib_TradeItems) {
/**
 * This rule should run on entry of the Packaging Hierarchy step in the create workflow.
 * Its goal is to create the PU Hierarchy automatically if meets the requirements. 
 */

// Set up trade item helper
var tradeItemHelper = lib_TradeItems.init(manager);

// Get article
var article = node;

// Get article trade item
var articleTradeItem = tradeItemHelper.getTradeItemForArticle(article);

// If there is no trade item, exit early
if (!articleTradeItem) {
  throw new Error('No trade item could be found on article : ' + article.getName());
}

// Get hierarchy for trade item
var tradeItemHierarchy = tradeItemHelper.getTIMSHierarchyForTradeItem(articleTradeItem);

// Analyze hierarchy
var hierarchyIsComplex = false;
var hierarchyHasEach = false;
var hierarchyHasPack = false;
var hierarchyHasCase = false;
var hierarchyHasPallet = false;

var currentTradeItem = tradeItemHierarchy;
while (true) {
  if (currentTradeItem.parents.length > 1) {
    hierarchyIsComplex = true;
    break;
  }

  if (currentTradeItem.node_type == 'BASE_UNIT_OR_EACH') {
    hierarchyHasEach = true;
  }

  if (currentTradeItem.node_type == 'PACK_OR_INNER_PACK') {
    hierarchyHasPack = true;
  }

  if (currentTradeItem.node_type == 'CASE') {
    hierarchyHasCase = true;
  }

  // Break if no more parents
  if (currentTradeItem.parents.length == 0) {
  	 break;
  }

  // Go to parent if there's only one
  currentTradeItem = currentTradeItem.parents[0];
}

// Ensure hierarchy is not complex
if (hierarchyIsComplex) {
  logger.info('Hierarchy is complex, not auto-creating.');
  return;
}

// Ensure there is something
if (hierarchyHasEach + hierarchyHasPack + hierarchyHasCase < 2) {
  logger.info('Hierarchy does not have 2 or more units to create.');
  return;
}

// Ensure in create workflow, in Create Packaging Hierarchy step
var workflowInstanceCreateArticle = node.getWorkflowInstanceByID("wf_CreateArticle");
var workflowInstanceCreateArticleOther = node.getWorkflowInstanceByID("wf_CreateArticleOther");
var workflowInstance = workflowInstanceCreateArticle || workflowInstanceCreateArticleOther || null;
if (!workflowInstance) {
  logger.info('Article not in Create Article or Create Article Other workflow. not auto-creating');
  return;
}

var workflowTask = workflowInstance.getTaskByID("CreatePUHierarchy");
if (!workflowTask) {
  logger.info('Article not in CreatePUHierarchy step. not auto-creating');
  return;
}

// Create hierarchy !
var currentTradeItem = tradeItemHierarchy;
var i = 0;
while (true) {  
  // Break if no more parents
  if (currentTradeItem.parents.length == 0) {
  	 break;
  } else {
  	currentTradeItem = currentTradeItem.parents[0];
  }

  // Ignore each
  if (currentTradeItem.node_type == 'BASE_UNIT_OR_EACH' ) { continue }

  // Create PU
  tradeItemHelper.createPUFromTradeItem(currentTradeItem.node, article);
}

// Submit 
workflowTask.triggerLaterByID("Submit", "Packaging Hierarchy automatically created");
}
