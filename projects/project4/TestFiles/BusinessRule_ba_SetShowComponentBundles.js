/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SetShowComponentBundles",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_WorkflowProcessing" ],
  "name" : "Set show component Bundles",
  "description" : null,
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
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_BundleComponent",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_BundleComponent",
    "description" : null
  }, {
    "contract" : "ProductBindContract",
    "alias" : "Level2_224342",
    "parameterClass" : "com.stibo.core.domain.impl.FrontProductImpl",
    "value" : "Level2_224342",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_Level2",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_Level2",
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
    "alias" : "att_AvailabilityStartDateDesc",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_AvailabilityStartDateDesc",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,manager,log,ref_BundleComponent,Level2_224342,prd_Level2,att_ShowComponentOnline,att_AvailabilityEndDateDes,att_AvailabilityStartDateDesc) {
var today = new Date();
var tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
var isoDate = new java.text.SimpleDateFormat('yyyy-MM-dd');
var date = isoDate.format(today);
var dateTomorrow = isoDate.format(tomorrow);

node.queryReferences(ref_BundleComponent).forEach(function (bundleRef) {
	var bundle = bundleRef.getTarget();
	log.info('Checking ' + bundle);
        var found = false;
        if (bundle.getParent()) {
            var ancestorNode = bundle;
            log.info('Checking bundle ' + bundle.getName());
            do {
                ancestorNode = ancestorNode.getParent();
                if (ancestorNode.objectType.getID() === prd_Level2.getID()) {
                    returnNode = ancestorNode;
                    if (returnNode.getID().equals(Level2_224342.getID())) {
	                    found = true;
	              		log.info('Found nonsellable level 2');
	                    //Set show online to no
	                    bundleRef.getValue(att_ShowComponentOnline.getID()).setLOVValueByID(0);
                    }
                } else {
                    log.info('skipped node ' + ancestorNode.getID() + ', wrong objectType (' + ancestorNode.objectType.getID() + '<>' + prd_Level2.getID() + ')');
                }
            } while (ancestorNode.getParent() && !found);
            log.info(found);
            if (!found) {
            		//Check date vs current date
            		var dateEnd = bundleRef.getValue(att_AvailabilityEndDateDes.getID()).getSimpleValue();
            		var dateStart = bundleRef.getValue(att_AvailabilityStartDateDesc.getID()).getSimpleValue();

            		if (dateEnd <= date) {
            			log.info(dateEnd + ' < ' + date);
            			log.info('Setting to no, since date in the past');
            			bundleRef.getValue(att_ShowComponentOnline.getID()).setLOVValueByID(0);
            		} else if (dateStart > dateTomorrow) {
	            		log.info(dateStart + ' > ' + date);
            			 log.info('Setting to no, since start date is in future');
            			 bundleRef.getValue(att_ShowComponentOnline.getID()).setLOVValueByID(0);
            		} else {
            			log.info('Setting to yes');
            			bundleRef.getValue(att_ShowComponentOnline.getID()).setLOVValueByID(-1);
            		}
            }
        } else {
            log.info('Node ' + node.getID() + ' has no parents');
        }

	return true;
});

//No approval needed since attribute is externally maitained.
}