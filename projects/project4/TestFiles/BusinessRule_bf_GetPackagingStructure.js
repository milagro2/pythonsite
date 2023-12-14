/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "bf_GetPackagingStructure",
  "type" : "BusinessFunction",
  "setupGroups" : [ "brg_Functions" ],
  "name" : "Get Packaging Structure",
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
  "pluginId" : "JavaScriptBusinessFunctionWithBinds",
  "binds" : [ {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_NextLowerLevel",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_NextLowerLevel",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_TradeItem",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_TradeItem",
    "description" : null
  }, {
    "contract" : "BusinessFunctionBindContract",
    "alias" : "bf_GetReferenceTargets",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>bf_GetReferenceTargets</BusinessFunction>\n</BusinessFunctionReference>\n",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation",
  "functionReturnType" : "java.util.List<com.stibo.core.domain.Product>",
  "functionParameterBinds" : [ {
    "contract" : "NodeBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : "The highest level trade item"
  } ]
}
*/
exports.operation0 = function (ref_NextLowerLevel,prd_TradeItem,bf_GetReferenceTargets,node) {
var totalNodes = new java.util.ArrayList();
var map = new java.util.TreeMap(java.util.Collections.reverseOrder());
var order = 1;
map.put(order+node, node);
//if (node.getObjectType().equals(tradeItemObjectType)) {
	var referenceTypeIDs = String(ref_NextLowerLevel.getID());
	var toDoNodes = [];
	toDoNodes.push(node);
	var failSAFE = 0;
	while (toDoNodes.length > 0 && failSAFE < 100) {
		failSAFE = failSAFE + 1;
		var toDoNode = toDoNodes.shift();
		if (toDoNode.queryReferences(ref_NextLowerLevel).asList(10).size() != -1) {
			var found = false;
			toDoNode.queryReferences(ref_NextLowerLevel).forEach(function(reference){
				order = order+1;
				for (var y=0; y < totalNodes.size(); y++) {
					if (totalNodes.get(y).getID() == reference.getTarget().getID()) {
						found = true;
						break;
					}
				}
				if (found == false) {
					toDoNodes.push(reference.getTarget());
					map.put(order+reference.getTarget(),reference.getTarget());
				}
			return true;
			});
		}
	}
//}
var keys = map.keySet().iterator();
while(keys.hasNext()){	
	var key = keys.next();
	totalNodes.add(map.get(key));
}
return totalNodes;
}