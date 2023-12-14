/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_MoveDownloadSupplierProductImage",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_AssetRelatedActions" ],
  "name" : "Move and Download Supplier Product Image",
  "description" : "Moves Assets created by the inbound Trade Item integration to the right location and downloads the asset content.",
  "scope" : "Global",
  "validObjectTypes" : [ "prd_TradeItem" ],
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
    "contract" : "AssetDownloadHomeBindContract",
    "alias" : "assetDownloadHome",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "AssetDownload_AssetURLAttribute",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "AssetDownload.AssetURLAttribute",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_AssetDownloadError",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_AssetDownloadError",
    "description" : null
  }, {
    "contract" : "LoggerBindContract",
    "alias" : "logger",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_PartnerProductImage",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_PartnerProductImage",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_Level1Partner",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_Level1Partner",
    "description" : null
  }, {
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "ClassificationBindContract",
    "alias" : "PartnerItems",
    "parameterClass" : "com.stibo.core.domain.impl.FrontClassificationImpl",
    "value" : "PartnerItems",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,assetDownloadHome,AssetDownload_AssetURLAttribute,att_AssetDownloadError,logger,ref_PartnerProductImage,prd_Level1Partner,manager,PartnerItems) {
/* 
 *  Name: 	ba_MoveDownloadSupplierProductImage - Move and Download Supplier Product Image
 *  Purpose: 	Moves Assets created by the inbound Trade Item integration to the right location and downloads the asset content.
 *  Binds:
 *  			node -> Current Object 
 *  			assetDownloadHome -> Asset Download Home
 *  			assetURLAttribute -> Attribute -> Asset URL Attribute (AssetDownload__AssetURLAttribute)
 *  			assetDownloadErrorAttribute -> Attribute -> Asset Download Error (att_AssetDownloadError)
 *  			logger -> Logger
 *  			refSPI -> Reference Type -> Supplier Product Image (ref_SupplierProductImage)
 *  			plevel1 -> Object Type -> Level 1 Partner (prd_Level1Partner)
 *  			manager -> STEP Manager
 *  			defParent -> Classification -> Partner Items (PartnerItems)
 *  			
 *  			
*/

function htmlencode(str) {
    return str.replace(/[&<>"']/g, function($0) {
        return "&" + {"&":"amp", "<":"lt", ">":"gt", '"':"quot", "'":"#39"}[$0] + ";";
    });
}
if (node.getParent().getObjectType().getID()==prd_Level1Partner.getID()){
	var tiparentlvl1 = manager.getClassificationHome().getClassificationByID(node.getParent().getID());
}
if (node.getParent().getParent().getObjectType().getID()==prd_Level1Partner.getID()){
	var tiparentlvl1 = manager.getClassificationHome().getClassificationByID(node.getParent().getParent().getID());
} 
if (node.getParent().getParent().getParent().getObjectType().getID()==prd_Level1Partner.getID()){
	var tiparentlvl1 = manager.getClassificationHome().getClassificationByID(node.getParent().getParent().getParent().getID());
}

var itr = node.getDataContainerByTypeID("dct_ProductAssetInformation").getDataContainers().iterator();
while (itr.hasNext()) {
	var dataContainer = itr.next().getDataContainerObject();
	var dcref = dataContainer.getDataContainerReferences(ref_PartnerProductImage);
	for(var i = 0 ; i < dcref.size() ; i++) {
		var referencedAsset = dcref.get(i).getTarget();
		var itr2 = referencedAsset.getClassifications().iterator();
		var dpflag = 0;
		var tipflag = 0;		
		while (itr2.hasNext()) {
			var assClass = itr2.next();
			if (assClass.getID() == PartnerItems.getID()) {
				dpflag = 1;	
			}				
			if (assClass.getID().toString() == tiparentlvl1.getID().toString()) {
				tipflag = 1;
			}
		}
		if (dpflag == 1 && tipflag == 1) {
			referencedAsset.removeClassification(PartnerItems);
		}			
		if (dpflag == 1 && tipflag == 0) {
			referencedAsset.addClassification(tiparentlvl1);
			referencedAsset.removeClassification(PartnerItems);	
		}
		if (referencedAsset.hasContent()==false){
			var url = String(referencedAsset.getValue(AssetDownload_AssetURLAttribute.getID()).getSimpleValue());
			if (url != "null") {
				var url = String(url);
				referencedAsset.getValue(att_AssetDownloadError.getID()).deleteCurrent();
				url = url.replace (/\s/g,'%20');
				var urlFileName = url.substring(url.lastIndexOf('/') + 1, String(url).length);
				if (urlFileName.indexOf('?') != -1) {
					url = url + '.jpg';
				}
				
				try {
					assetDownloadHome.downloadAssetContent (referencedAsset,new java.net.URL(url));
				} catch (error) {
					referencedAsset.getValue(att_AssetDownloadError.getID()).setSimpleValue(htmlencode(error.message));
					logger.info ('Error found while downloading asset content: ' + error.message);
				}
			} else {
				referencedAsset.getValue(att_AssetDownloadError.getID()).setSimpleValue('No URL found to download.');
			}
		}
		var approvalStatus = referencedAsset.getApprovalStatus();
		if (approvalStatus != "Completely Approved") {
			referencedAsset.approve();
		}
	}
 }
}