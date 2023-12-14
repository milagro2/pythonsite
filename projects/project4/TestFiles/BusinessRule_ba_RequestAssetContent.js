/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_RequestAssetContent",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Request Asset Content",
  "description" : "Request Asset Content",
  "scope" : "Global",
  "validObjectTypes" : [ "ast_PrimaryProductImage" ],
  "allObjectTypesValid" : false,
  "runPrivileged" : true,
  "onApprove" : "Never",
  "dependencies" : [ ]
}
*/
/*===== business rule plugin definition =====
{
  "pluginId" : "JavaScriptBusinessActionWithBinds",
  "binds" : [ ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function () {
java.util.concurrent.TimeUnit.SECONDS.sleep(20);
}
/*===== business rule plugin definition =====
{
  "pluginId" : "JavaScriptBusinessActionWithBinds",
  "binds" : [ {
    "contract" : "GatewayBinding",
    "alias" : "giep_GMUL1",
    "parameterClass" : "com.stibo.core.domain.impl.integrationendpoint.gateway.FrontGatewayIntegrationEndpointImpl",
    "value" : "giep_GMUL1",
    "description" : null
  }, {
    "contract" : "LoggerBindContract",
    "alias" : "logger",
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
exports.operation1 = function (giep_GMUL1,logger,node) {
var request = giep_GMUL1.post();
request.header('client-id', '0ff147830592406794886ff4b7085034');
request.header('client-secret', '5ED8817395a34715A1B80b7B0A4f43b2');
//request.header("Accept", "*/*");
//request.header("Accept-Encoding", "gzip, deflate, br");
//request.header("Connection", "keep-alive");
var ECMDAMID = node.getValue('att_ECMDAMID').getValue();
logger.info(ECMDAMID);
request.pathQuery({rendition: 'Native File', id: ECMDAMID});

try {
   var response = request.invoke();
   logger.info(response);
} catch (err) {//If invalid  package_itemnumber & package_itemdate is passed, API throws 500 error. Not handling the error
	// Check is response message differs if we request an incorrect package_itemnuimber or package_itemdate. Handle these errors accordingly. eg; response.contains something.
   logger.info(err);
}
}
/*===== business rule plugin definition =====
{
  "pluginId" : "JavaScriptBusinessActionWithBinds",
  "binds" : [ ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation2 = function () {
java.util.concurrent.TimeUnit.SECONDS.sleep(20);
}