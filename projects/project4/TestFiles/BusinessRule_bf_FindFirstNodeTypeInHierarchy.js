/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "bf_FindFirstNodeTypeInHierarchy",
  "type" : "BusinessFunction",
  "setupGroups" : [ "brg_Functions" ],
  "name" : "Find First Node Type in Hierarchy",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ ],
  "allObjectTypesValid" : true,
  "runPrivileged" : false,
  "onApprove" : "Never",
  "dependencies" : [ ]
}
*/
/*===== business rule plugin definition =====
{
  "pluginId" : "JavaScriptBusinessFunctionWithBinds",
  "binds" : [ {
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "LoggerBindContract",
    "alias" : "log",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation",
  "functionReturnType" : "com.stibo.core.domain.Node",
  "functionParameterBinds" : [ {
    "contract" : "NodeBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : ""
  }, {
    "contract" : "StringBindContract",
    "alias" : "objectTypeID",
    "parameterClass" : "null",
    "value" : null,
    "description" : "objectType ID to find"
  } ]
}
*/
exports.operation0 = function (manager,log,node,objectTypeID) {
var returnNode = null;

// check if we have a existing objectType
var objectTypeToFind = manager.getObjectTypeHome().getObjectTypeByID(objectTypeID);

if (objectTypeToFind) {
   var found = false;
   if (node.getParent()) {
       var ancestorNode = node;
       do {
           ancestorNode = ancestorNode.getParent();
           if (ancestorNode.objectType.getID() === objectTypeToFind.getID()) {
               log.info("Found node with objectID (" + objectTypeID + ") in ancestry; nodeID: " + ancestorNode.getID());
               returnNode = ancestorNode;
               found = true;
           } else {
               log.info("skipped node " + ancestorNode.getID() + ", wrong objectType (" + ancestorNode.objectType.getID() + "<>" + objectTypeToFind.getID() + ")");
           }
       } while (ancestorNode.getParent() && !found);
   } else {
       log.info("Node " + node.getID() + " has no parents");
   }
} else {
   log.info("Invalid objectType ID given: " + objectTypeID);
}

return returnNode;

}