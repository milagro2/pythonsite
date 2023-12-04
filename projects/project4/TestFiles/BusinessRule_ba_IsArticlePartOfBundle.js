/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_IsArticlePartOfBundle",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_AssetRelatedActions" ],
  "name" : "Is article part of bundle",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article" ],
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
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,manager,log) {
var bundle = 'prd_BundleArticle';
var refTypeID = 'ref_BundleComponent';

var sdf = new java.text.SimpleDateFormat('yyyy-MM-dd');
var today = sdf.format(new Date());

var refType = manager.getReferenceTypeHome().getReferenceTypeByID(refTypeID);
var puEach = [];
//Bundles are linked on PU_EACH.
var children = node.queryChildren().forEach(function(child) {
	if (child.getObjectType().getID() == 'prd_PackagingUnitEach') {
		puEach.push(child);
	}
	return true;
});


for (var j = 0; j < puEach.length; j++) {
	var referencedPrds = puEach[j].getReferencedByProducts().toArray();
	var articleNo = puEach[j].getValue('att_ItemNumber').getSimpleValue();

	var bundleRefArray = referencedPrds.filter(function (bundleRef) {
			return (bundle.equals(bundleRef.getSource().getObjectType().getID()));
	});
}

if (bundleRefArray.length > 0) {
	for ( var i = 0; i < bundleRefArray.length; i++) {
		var source = bundleRefArray[i].getSource();
		var sourceObjectType = source.getObjectType().getID();

		if (sourceObjectType == 'prd_BundleArticle') {
			var bundleWfi = source.getWorkflowInstanceByID('wf_AddPrimaryAsset');
			var endDate = bundleRefArray[i].getValue('att_AvailabilityEndDateDes').getSimpleValue();
			if (endDate) {
				var endDateParsed = sdf.format(sdf.parse(endDate));
			}

			//Check if bundle is not in the workflow already
			if (bundleWfi == null) {
				if (endDate) {
					if (endDateParsed <= today) {
						//Doing nothing, endDate is in the past for this bundle.
					} else {
						log.info('starting workflow for ' + source);
						var initiateWf = source.startWorkflowByID('wf_AddPrimaryAsset', 'New packshot for article: ' + articleNo + ' initiating bundle');
					}
				} else {
						log.info('starting workflow for ' + source);
						var initiateWf = source.startWorkflowByID('wf_AddPrimaryAsset', 'New packshot for article: ' + articleNo + ' initiating bundle');
				}
			}
		}
	}
}
}