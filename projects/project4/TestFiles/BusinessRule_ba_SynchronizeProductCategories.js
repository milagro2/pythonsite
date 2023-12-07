/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SynchronizeProductCategories",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Synchronize Supplier product categories",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article", "prd_GiftBoxArticle" ],
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
    "contract" : "ObjectTypeBindContract",
    "alias" : "prd_Article",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "prd_Article",
    "description" : null
  }, {
    "contract" : "ProductBindContract",
    "alias" : "PartnerItemsRoot",
    "parameterClass" : "com.stibo.core.domain.impl.FrontProductImpl",
    "value" : "PartnerItemsRoot",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,manager,prd_Article,PartnerItemsRoot) {
/*The functionality synchronizes the product categories and the supplier product categories, 
 * creating new nodes, maintaining and removing them. This also includes all the specification attribute links for adding, 
 * changing the metadata and removing.
 * 
 * Binding:
 * articleObjectType --> Article (prd_Article)
 * partnerRoot --> Partner Items Root (PartnerItemsRoot)
 */

var list = new java.util.ArrayList();
var existingParent = existingPartnerParentObjType(node);
log.info(existingParent.getName());
var partnerParent;
for(var i=list.size()-1; i>=0;i--){
	if(list.get(i).getObjectType().getID().equals("prd_ProductRoot")){
		partnerParent = PartnerItemsRoot;
		//syncronize(list.get(i),partnerRoot);	
	}else if(list.get(i).getObjectType().getID().equals("prd_ProductFamily")){		
		continue;	
	}else{
		if(!partnerParent){			
			partnerParent = manager.getProductHome().getProductByID("Partner"+existingParent.getID()); 
		}		
		var newPartnerProduct = partnerParent.createProduct("Partner"+list.get(i).getID(),list.get(i).getObjectType().getID()+"Partner");
		newPartnerProduct.setName(list.get(i).getName());
		partnerParent = newPartnerProduct;
	//	log.info(list.get(i).getName()+"--->"+newPartnerProduct.getName());	
		syncronize(list.get(i),newPartnerProduct);
	}
	
}

function syncronize(source,target){		
	var sourceAttributeLinks = source.getAttributeLinks().toArray();
	var targetAttributeLinks = target.getAttributeLinks().toArray();	
	for (var sa in sourceAttributeLinks) {
		log.info(sourceAttributeLinks[sa].getAttribute().getID());
			var found = false;
			var syncAttributeLink;
			for (var ta in targetAttributeLinks) {
				if (targetAttributeLinks[ta].getAttribute().getID() == sourceAttributeLinks[sa].getAttribute().getID()) {
					//log.info("  targetAttributeLink->-"+targetAttributeLinks[ta].getAttribute().getID());
					found = true;
					syncAttributeLink = targetAttributeLinks[ta];
					break;
				}
			}
			if (!found) {
				syncAttributeLink = target.createAttributeLink(sourceAttributeLinks[sa].getAttribute());
			}
			var attributeLinkValues = sourceAttributeLinks[sa].getValues().toArray();
			for (var al in attributeLinkValues) {
				syncAttributeLink.getValue(attributeLinkValues[al].getAttribute().getID()).setSimpleValue(attributeLinkValues[al].getSimpleValue());
			}
		}
		for (var tal in targetAttributeLinks) {
			var found = false;
			for (var sal in sourceAttributeLinks) {
				if (targetAttributeLinks[tal].getAttribute().getID() == sourceAttributeLinks[sal].getAttribute().getID()) {
					found = true;
					break;
				}
			}
			if (found == false) {
				targetAttributeLinks[tal].delete();
			}
		}
}


function existingPartnerParentObjType(product){	
	if(!product){
		throw "Invalid Hierarchy";
	}	
	if(manager.getProductHome().getProductByID("Partner"+product.getParent().getID()) || product.getObjectType().getID().equals("prd_ProductRoot")){			
		return product.getParent();
	}else{
		list.add(product.getParent());
		return existingPartnerParentObjType(product.getParent());
	}
}
logger.info("Sync/done");
}