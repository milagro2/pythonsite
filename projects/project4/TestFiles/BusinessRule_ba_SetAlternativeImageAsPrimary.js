/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SetAlternativeImageAsPrimary",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_AssetRelatedActions" ],
  "name" : "Set Alternative Image as Primary",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article", "prd_BundleArticle", "prd_GiftBoxArticle", "prd_PackagingUnitCase", "prd_PackagingUnitPack", "prd_PackagingUnitPallet" ],
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
    "alias" : "ref_AlternativeProductImage",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_AlternativeProductImage",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_PrimaryProductImage",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_PrimaryProductImage",
    "description" : null
  }, {
    "contract" : "WebUiContextBind",
    "alias" : "web",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,manager,log,ref_AlternativeProductImage,ref_PrimaryProductImage,web) {
var selectedReference = web.getSelection();

log.info('selected reference = ' + selectedReference.get(0));
try {
	log.info('Creating primary image as seasonal');
	var currentPrimaryImage = node.queryReferences(ref_PrimaryProductImage).asList(10);
	log.info('Creating primaryImage = ' + currentPrimaryImage);
	if (currentPrimaryImage.size() > 0) {
		log.info('Creating primary image size greater than 0');
		var currentPrimaryImageTarget = currentPrimaryImage.get(0).getTarget();
		var newPrimaryImage = selectedReference.get(0);
		//Create primary as alternative
		try {
			node.createReference(currentPrimaryImageTarget, ref_AlternativeProductImage);
		} catch (e) {
			if (!e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
				log.info('Primary image already linked as alternative');
			}
		}
		//Create alternative as primary
		currentPrimaryImage.get(0).setTarget(selectedReference.get(0));
	} else {
		log.info('Creating primary image size is 0');
		node.createReference(selectedReference.get(0), ref_PrimaryProductImage);
	}
} catch (e) {
	if (!e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
		throw (e);
	}
}
}