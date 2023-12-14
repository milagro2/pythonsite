/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_PrimaryAssetInitialCheck",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_AssetRelatedActions" ],
  "name" : "Add primary asset - Initial check",
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
  }, {
    "contract" : "CurrentWorkflowBindContract",
    "alias" : "wf",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "TransitionEvaluationBindContract",
    "alias" : "trans",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_AvailabilityEndDate",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_AvailabilityEndDate",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_BundleComponent",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_BundleComponent",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_AvailabilityStartDate",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_AvailabilityStartDate",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_AvailabilityEndDateDes",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_AvailabilityEndDateDes",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,manager,log,wf,trans,att_AvailabilityEndDate,ref_BundleComponent,att_AvailabilityStartDate,att_AvailabilityEndDateDes) {
var sdf = new java.text.SimpleDateFormat('yyyy-MM-dd');
var today = sdf.format(new Date());

function nextweek() {
    var today = new Date();
    var nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate()+7);
    nextweek = sdf.format(nextweek);
    return nextweek;
}

var wfi = node.getWorkflowInstance(wf);
var transMessage = trans.getMessage();
var skipEvent = false;

//Trigger next event for everything that is not initiated by new packshots for article that are part of a bundle.
//"New packshot for article: " +  articleNo + " initiating bundle");

if (!(transMessage.indexOf('initiating bundle') > -1)) {
	node.getTaskByID('wf_AddPrimaryAsset' , 'ApproveSourceImage').triggerLaterByID('Approved', 'Not part of bundle initiation, can forward automatically.');
} else {
	var references = node.queryReferences(ref_BundleComponent).asList(10);

	var endDateBundle = node.getValue(att_AvailabilityEndDate.getID()).getSimpleValue();

	if (endDateBundle) {
		var endDateParsedBundle = sdf.format(sdf.parse(endDateBundle));
		var dateNextWeek = nextweek();
		log.info('date next week = ' + dateNextWeek);

		if (endDateParsedBundle < dateNextWeek) {
			log.info('Add primary asset - endDateParsedBundle < dateNextWeek for the bundle');
			skipEvent = true;
		}
	}

	if (references.size()>0) {
		node.queryReferences(ref_BundleComponent).forEach(function(reference) {
			//var component = reference.getTarget();
			//var startDate = reference.getValue(att_AvailabilityStartDate.getID()).getSimpleValue();
			var endDate = reference.getValue(att_AvailabilityEndDateDes.getID()).getSimpleValue();

			if (endDate) {
				var endDateParsed = sdf.format(sdf.parse(endDate));
				var dateNextWeek = nextweek();
				log.info('date next week = ' + dateNextWeek);

				if (endDateParsed < dateNextWeek && endDateParsed > today) {
					skipEvent = true;
					log.info('Add primary asset - endDateParsedBundle < dateNextWeek for ' + reference.getTarget().getID());
				}
			} return true;
		});
	}
	log.info('Add primary asset - SKIP EVENT = ' + skipEvent);
	if (skipEvent) {
		//One of the bundle components has an endDate which lies within 7 days from the current date. We do not wish to gather a new packshot for this node.
		node.getTaskByID('wf_AddPrimaryAsset' , 'ApproveSourceImage').triggerLaterByID('Reject', 'One of the bundle components has an endDate which lies within 7 days from the current date.');
	} else {
		node.getTaskByID('wf_AddPrimaryAsset' , 'ApproveSourceImage').triggerLaterByID('Approved', 'Part of bundle initiation, no items with endDate within 7 days.');
		var wfi = node.getWorkflowInstance(wf);
		wfi.setSimpleVariable('bundleInitiation', transMessage);
	}
}
}