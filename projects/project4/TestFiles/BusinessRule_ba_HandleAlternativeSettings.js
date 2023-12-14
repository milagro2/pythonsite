/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_HandleAlternativeSettings",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_AssetRelatedActions" ],
  "name" : "Handle alternative settings",
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
    "contract" : "LoggerBindContract",
    "alias" : "log",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_NewPackshotPlaceholder",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_NewPackshotPlaceholder",
    "description" : null
  } ],
  "messages" : [ {
    "variable" : "aMessage",
    "message" : "Selected item is in create article workflow, or in a related asset workflow.",
    "translations" : [ {
      "language" : "nl",
      "message" : "Geselecteerde artikel is in de creatie of gerelateerde asset workflow"
    } ]
  }, {
    "variable" : "bMessage",
    "message" : "No primary source image set. This is needed before starting the workflow.",
    "translations" : [ {
      "language" : "nl",
      "message" : "Er is geen 'primary source image' geselecteerd. Dit is nodig voordat de workflow kan starten."
    } ]
  }, {
    "variable" : "cMessage",
    "message" : "Please upload a new image before continuing ",
    "translations" : [ {
      "language" : "nl",
      "message" : "Upload een nieuwe asset voordat je door kunt gaan"
    } ]
  } ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,ref_AlternativeProductImage,ref_PrimaryProductImage,log,ref_NewPackshotPlaceholder,aMessage,bMessage,cMessage) {
var wfi = node.getWorkflowInstanceByID('wf_AddPrimaryAsset');

if (wfi) {
	var alternativeSetting = wfi.getSimpleVariable('alternativeSetting');
}

log.info(String(alternativeSetting) + ' is the alternative setting');
//Alternative settings LOV is ;
// 0 : Replace primary packshot
// 1 : Create as alternative, keep current primary image
// 2:  Create alternative, set as primary image

//First find new uploaded asset.
var newPackshots = node.queryReferences(ref_NewPackshotPlaceholder).asList(10);
var newPackshot;

if (newPackshots.size() > 0) {
	newPackshot = newPackshots.get(0).getTarget();
}


if (newPackshot) {
	switch (String(alternativeSetting)) {
		case '0':

			//Remove primary, replace with new uploaded asset
			var primaryReference = node.queryReferences(ref_PrimaryProductImage).asList(10);

			if (primaryReference.size() > 0) {
				var primaryImage = primaryReference.get(0).getTarget();
				var sourceID = primaryReference.get(0).getSource().getID();
				if (node.getID() == sourceID) {
					primaryReference.get(0).delete();
				}
				node.createReference(newPackshot, ref_PrimaryProductImage);
			} else {
				node.createReference(newPackshot, ref_PrimaryProductImage);
			}


		case '1':
			//Create as alternative, keep current primary image;
			try {
					//First create primary image as alternative, delete is handled later.
					log.info('Creating new alternative image');
					node.createReference(newPackshot, ref_AlternativeProductImage);
				} catch (e) {
					if (!e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
						throw (e);
					}
				}


			break;
		case '2':
			//Create alternative, set as primary image
			// Then move current primary image to seasonal
			var primaryReference = node.queryReferences(ref_PrimaryProductImage).asList(10);

			if (primaryReference.size() > 0) {
				var primaryImage = primaryReference.get(0).getTarget();
				var sourceID = primaryReference.get(0).getSource().getID();


				try {
					log.info('Creating primary image as alternative');
					node.createReference(primaryImage, ref_AlternativeProductImage);
					//Clear primary reference after.
				} catch (e) {
					if (!e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
						throw (e);
					}
				}
			}

			//Now set the new seasonal reference as primary
			try {
				log.info('Setting alternative image as primary , new primary will be = ' + newPackshot.getID());
				if (node.getID() == sourceID) {
					log.info('deleting');
					primaryReference.get(0).delete();
				}
				log.info('creating');
				node.createReference(newPackshot, ref_PrimaryProductImage);
			} catch (e) {
				if (!e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
					throw (e);
				}
			}

			break;
		default:
			//Remove primary, replace with new uploaded asset
			var primaryReference = node.queryReferences(ref_PrimaryProductImage).asList(10);

			if (primaryReference.size() > 0) {
				var primaryImage = primaryReference.get(0).getTarget();
				var sourceID = primaryReference.get(0).getSource().getID();
				if (node.getID() == sourceID) {
					primaryReference.get(0).delete();
				}
				node.createReference(newPackshot, ref_PrimaryProductImage);
			} else {
				node.createReference(newPackshot, ref_PrimaryProductImage);
			}

			log.info('Default or case 0, replacing primary packshot');
	}

	//Cleanup placeholder reference.
	var placeholderReferences = node.queryReferences(ref_NewPackshotPlaceholder).asList(10);

	if (placeholderReferences.size() > 0) {
			placeholderReferences.get(0).delete();
	}
} else {
	var errorMessage = new cMessage();
	throw errorMessage;
}

//Partial approval
var partSet = new java.util.HashSet();
var nonAppArr = node.getNonApprovedObjects().toArray();
log.info(nonAppArr);

for (var i = 0; i < nonAppArr.length; i++) {
	log.info(nonAppArr[i]);

      if (nonAppArr[i] instanceof com.stibo.core.domain.partobject.AssetReferencePartObject) {
              if ((ref_PrimaryProductImage.getID().equals(nonAppArr[i].getReferenceType())) || (ref_AlternativeProductImage.getID().equals(nonAppArr[i].getReferenceType()))) {
                  partSet.add(nonAppArr[i]);
              }
	}
}

if (partSet.size() > 0) {
   logger.info('Partially approving: ' + node.getID());
   try {
	  log.info(partSet);
       node.approve(partSet);
   } catch (error) {
       logger.warning('Partially approving failed for: ' + node.getID());
       throw error;
   }
} else {
       logger.info('Nothing to approve');
}
}