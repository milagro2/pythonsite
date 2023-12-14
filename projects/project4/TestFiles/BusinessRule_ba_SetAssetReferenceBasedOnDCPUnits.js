/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SetAssetReferenceBasedOnDCPUnits",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_AssetRelatedActions" ],
  "name" : "Set Asset References Based On DC PUnits",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article", "prd_GiftBoxArticle" ],
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
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ptp_PartnerArticle",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ptp_PartnerArticle",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_PartnerProductImage",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_PartnerProductImage",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_BundleArticle",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_BundleArticle",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_PackagingUnitEach",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_PackagingUnitEach",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,ptp_PartnerArticle,ref_PartnerProductImage,prd_BundleArticle,prd_PackagingUnitEach) {
//get the data container
/*var dataContainers = node.getDataContainerByTypeID('dct_ProductAssetInformation').getDataContainers();
var datContainerIterator = dataContainers.iterator();
while (datContainerIterator.hasNext()) {
    var singleDataContainer = datContainerIterator.next();
	var imageRef = singleDataContainer.getDataContainerObject().getDataContainerReferences(ref_PartnerProductImage).toArray();
	for (var i in imageRef) {
		var target = imageRef[i].getTarget();
		if(target){
			node.queryReferencedBy(ptp_PartnerArticle).forEach(function(reference){
			var article = reference.getSource();
			logger.info(article);
				if (!(article.getObjectType().equals(prd_PackagingUnitEach) || article.getObjectType().equals(prd_BundleArticle))){
					try{
				 		article.createReference(target,ref_PartnerProductImage);
				 	}catch(e){
				 		if (e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
				 			log.info("Reference is present already  -->" + e);
				 		}else{
			           		throw (e);
				 		}
			        	}
				}
				return true;
			});
		}
	}
}*/

if (node.getObjectType().getID() == 'prd_Article' || node.getObjectType().getID() == 'prd_GiftBoxArticle') {
	node.queryChildren().forEach(function(packagingUnit) {
		setPartnerImages(packagingUnit, manager);
		return true;
	});
}

//Set Partner Source Image
function setPartnerImages(node, manager) {
	if (!node.getObjectType().getID().equals(prd_PackagingUnitEach.getID())) {
		node.queryReferences(ptp_PartnerArticle).forEach(function(reference) {
		var tradeItem = reference.getTarget();
		var dataContainers = tradeItem.getDataContainerByTypeID('dct_ProductAssetInformation').getDataContainers();
		var datContainerIterator = dataContainers.iterator();
		while (datContainerIterator.hasNext()) {
		    var singleDataContainer = datContainerIterator.next();
			var imageRef = singleDataContainer.getDataContainerObject().getDataContainerReferences(ref_PartnerProductImage).toArray();
			log.info(imageRef);
			for (var i in imageRef) {
				var target = imageRef[i].getTarget();
				if (target) {
					tradeItem.queryReferencedBy(ptp_PartnerArticle).forEach(function(reference) {
					var article = reference.getSource();
					log.info(article+' '+target+' '+ref_PartnerProductImage);
						if (!(article.getObjectType().equals(prd_PackagingUnitEach) || article.getObjectType().equals(prd_BundleArticle))) {
							try {
						 		article.createReference(target,ref_PartnerProductImage);
						 	} catch (e) {
						 		if (e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
						 			log.info('Reference is present already  -->' + e);
						 		} else {
					           		throw (e);
						 		}
					        	}
						}
						return true;
					});
				}
			}
		}
		return true;
		});
	}
}
}