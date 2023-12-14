/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_RemoveCompleteArticle2",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Remove Complete Article 2 Manual test",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article", "prd_GiftBoxArticle" ],
  "allObjectTypesValid" : true,
  "runPrivileged" : true,
  "onApprove" : "Never",
  "dependencies" : [ {
    "libraryId" : "lib_GeneralLibrary",
    "libraryAlias" : "genLib"
  } ]
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
    "contract" : "AttributeBindContract",
    "alias" : "att_GlobalTradeIdentificationNumber",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_GlobalTradeIdentificationNumber",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_AvailabilityEndDate",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_AvailabilityEndDate",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_PricingValidityEndDate",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_PricingValidityEndDate",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_GlobalTradeIdentificationNumbers",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_GlobalTradeIdentificationNumbers",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ptp_PartnerArticle",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ptp_PartnerArticle",
    "description" : null
  }, {
    "contract" : "BusinessFunctionBindContract",
    "alias" : "bfGetAllPackgingUnits",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>bfGetAllPackgingUnits</BusinessFunction>\n</BusinessFunctionReference>\n",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "pte_TasteProfile",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "pte_TasteProfile",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_DataProvider",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_DataProvider",
    "description" : null
  }, {
    "contract" : "ProductBindContract",
    "alias" : "ArchivedArticles",
    "parameterClass" : "com.stibo.core.domain.impl.FrontProductImpl",
    "value" : "ArchivedArticles",
    "description" : null
  }, {
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_GlobalLocationNumber",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_GlobalLocationNumber",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_NextLowerLevel",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_NextLowerLevel",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_PartnerProductImage",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_PartnerProductImage",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,att_GlobalTradeIdentificationNumber,att_AvailabilityEndDate,att_PricingValidityEndDate,ref_GlobalTradeIdentificationNumbers,ptp_PartnerArticle,bfGetAllPackgingUnits,pte_TasteProfile,ref_DataProvider,ArchivedArticles,manager,att_GlobalLocationNumber,ref_NextLowerLevel,ref_PartnerProductImage,genLib) {
function makeNodeDeletable(node, manager, log) {

    // remove from any workflows
    var wfInstances = node.getWorkflowInstances();
    var wfIter = wfInstances.iterator();
    while (wfIter.hasNext()) {

        var wfInstance = wfIter.next();
        wfInstance.delete("Remove node from workflow for deletion of the node");
    }

    //remove any referencedBy references
    var refBySources = node.getReferencedBy();
    var rbIter = refBySources.iterator();
    while (rbIter.hasNext()) {

        var rbReference = rbIter.next();

        var refSource = rbReference.getSource();
        // what reference is it?
        var refType = rbReference.getReferenceType().getID();
        //log.info("Deleting " + refType + " from " + refSource.getID() + " to " + node.getID());
        // now delete it and approve the deletion
        rbReference.delete();

        var partRef = [refType];
        //genLib.partiallyApproveObject(refSource, partRef, "references", log);

    }

}

var objectsToDelete = [];

function markForDelete(thing) {
    var alreadyMarked = false;
            logger.info(thing.getID())
    objectsToDelete.forEach(function(existing) {
        if (existing.getID() == thing.getID()) {
            alreadyMarked = true;
            logger.info('found duplicate')
            return false; // stop loop
        }
        return true; // continue loop
    })

    if (!alreadyMarked) {
        objectsToDelete.push(thing);
    }
}


var tradeItemList = node.queryReferences(ptp_PartnerArticle).asList(10);
if (tradeItemList.size() > 0) {
   var tradeItem = tradeItemList.get(0).getTarget();
   markForDelete(tradeItem);
}

var partnerImageList = node.queryReferences(ref_PartnerProductImage).asList(10);

if (partnerImageList.size() > 0) {
   for (var k = 0; k < partnerImageList.size(); k++) {
       var partnerImage = partnerImageList.get(k).getTarget();
       log.info(partnerImage);
       markForDelete(partnerImage);
   }
}


var packagingUnit = node.getChildren();//getAllPackagingUnits.evaluate({ node: node });

log.info("Packaging = " +packagingUnit);
if (!packagingUnit.isEmpty()) {
	
   for (var i = 0; i < packagingUnit.size(); i++) {
       var packaging = packagingUnit.get(i);
       packaging.queryReferences(ptp_PartnerArticle).forEach(function(tiRef){
        markForDelete(tiRef.getTarget());
           return true
       });
       markForDelete(packaging);
   }
}
//Node handling.
markForDelete(node);


//Delete the object (article/ packaging unit)
function deleteObject(object) {
    try {
        object.delete();
    } catch (e) {
        if (e.javaException instanceof com.stibo.core.domain.DependencyException) {
            log.warning('Node ' + object.getTitle() + ' can\'t be deleted. ' + e.javaException.getMessage());
            throw 'Node ' + object.getTitle() + ' can\'t be deleted. ' + e.javaException.getMessage();
        } else {
            throw e;
        }
    }
}

//Remove the reference
function deleteGtinRef(object) {
    var partSet = new java.util.HashSet();
    object.queryReferences(ref_GlobalTradeIdentificationNumbers).forEach(function (gtinReference) {
        var gtinObj = gtinReference.getTarget();
        gtinReference.delete();

        var nonAppArr = object.getNonApprovedObjects().toArray();
        for (var i = 0; i < nonAppArr.length; i++) {
            if (nonAppArr[i] instanceof com.stibo.core.domain.partobject.EntityReferencePartObject) {
                if (nonAppArr[i].getReferenceType().equals(ref_GlobalTradeIdentificationNumbers.getID())) {
                    partSet.add(nonAppArr[i]);
                }
            }
        }
        if (partSet.size() > 0) {
            object.approve(partSet);
        }


        var gtinRefBy = gtinObj.queryReferencedBy(ref_GlobalTradeIdentificationNumbers).asList(10);
        if (gtinRefBy.size() == 0) {
            //log.info("Deleting " + gtinObj.getID());
            deleteObject(gtinObj);
        }

        return true;
    });
}

for(var j = 0; j < objectsToDelete.length; j++) {
	var obj = objectsToDelete[j];
	if(obj.getObjectType().getID() == "prd_TradeItem") {
	    var emptyTradeItemKey = new java.util.HashMap();	//attributevalue map
	    emptyTradeItemKey.put(att_GlobalTradeIdentificationNumber.getID(), "");
	    emptyTradeItemKey.put(att_GlobalLocationNumber.getID(), "");
	    var tradeItemKey = manager.getKeyHome().updateUniqueKeyValues2(emptyTradeItemKey, obj);
	}
	
	if(obj.getObjectType().getID() == "ent_GTIN") {
		logger.info("Deleting GTIN KEY");
	    var emptyGtinKey = new java.util.HashMap();	//attributevalue map
	    emptyGtinKey.put(att_GlobalTradeIdentificationNumber.getID(), "");
	    var gtinKey = manager.getKeyHome().updateUniqueKeyValues2(emptyGtinKey, obj);	
	}
	
	deleteGtinRef(obj);
	makeNodeDeletable(obj, manager, log);
	log.info("Deleting node; " + obj.getID());
	deleteObject(obj);
}
}