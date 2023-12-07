/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_UpdateShowOnline",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Update Bundle Component Show Online",
  "description" : "Update Bundle Component Show Online",
  "scope" : "Global",
  "validObjectTypes" : [ "prd_BundleArticle" ],
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
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_BundleComponent",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_BundleComponent",
    "description" : null
  }, {
    "contract" : "LoggerBindContract",
    "alias" : "logger",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_ShowComponentOnline",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ShowComponentOnline",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_AvailabilityEndDateDes",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_AvailabilityEndDateDes",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_ProductType",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ProductType",
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
exports.operation0 = function (ref_BundleComponent,logger,att_ShowComponentOnline,att_AvailabilityEndDateDes,att_ProductType,node) {
var linksArray = node.getReferences().get(ref_BundleComponent).toArray();

for (i = 0; i < linksArray.length; i++) {
	var comp = linksArray[i];
	var ptype = comp.getTarget().getValue(att_ProductType.getID()).getValue();
	var todate = comp.getValue(att_AvailabilityEndDateDes.getID()).getValue();
	if ((todate != null && todate != '9999-04-12' && todate != '9999-12-12') || ptype == 'Non-Food') {
		logger.info('No');
		logger.info(todate);
		comp.getValue(att_ShowComponentOnline.getID()).setValue('Nee');
		} else {
		logger.info('Yes');
		logger.info(todate);
		comp.getValue(att_ShowComponentOnline.getID()).setValue('Ja');
		}
}
}