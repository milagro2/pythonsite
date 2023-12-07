/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SetStatiegeldAndEmballage",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Set Statiegeld and Emballage",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article", "prd_GiftBoxArticle", "prd_PackagingUnitCase", "prd_PackagingUnitEach", "prd_PackagingUnitPack", "prd_PackagingUnitPallet" ],
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
    "contract" : "BusinessFunctionBindContract",
    "alias" : "bf_GetPackagingStructure",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>bf_GetPackagingStructure</BusinessFunction>\n</BusinessFunctionReference>\n",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_IsReturnable",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_IsReturnable",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_NetContents",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_NetContents",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_NetContentOfBaseItem",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_NetContentOfBaseItem",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_MaxNetContentOfBaseItem",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_MaxNetContentOfBaseItem",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_NextLowerLevel",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_NextLowerLevel",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_QuantityOfNextLowerLevel",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_QuantityOfNextLowerLevel",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_AmountOfBaseItems",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_AmountOfBaseItems",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "ent_Deposit",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "ent_Deposit",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "pte_Deposit",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "pte_Deposit",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "pte_Emballage",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "pte_Emballage",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "ent_Emballage",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "ent_Emballage",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_Packaging",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_Packaging",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_ProductType",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ProductType",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_DepositMaterialType",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_DepositMaterialType",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_ValidityStartDate",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ValidityStartDate",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,manager,bf_GetPackagingStructure,att_IsReturnable,att_NetContents,att_NetContentOfBaseItem,att_MaxNetContentOfBaseItem,ref_NextLowerLevel,att_QuantityOfNextLowerLevel,att_AmountOfBaseItems,ent_Deposit,pte_Deposit,pte_Emballage,ent_Emballage,att_Packaging,att_ProductType,att_DepositMaterialType,att_ValidityStartDate) {
if (node.getObjectType().getID() == 'prd_Article' || node.getObjectType().getID() == 'prd_GiftBoxArticle') {
	node.queryChildren().forEach(function(packagingUnit) {
		setStatiegeld(packagingUnit, manager);
		return true;
	});
} else {
	setStatiegeld(node, manager);
}

//Search for statiegeld and create reference
function setStatiegeld(node, manager) {
	var returnableValue = node.getValue(att_IsReturnable.getID()).getLOVValue();
	var packagingValue = node.getValue(att_Packaging.getID()).getLOVValue();
	if (returnableValue && packagingValue) {
		var packagingID = packagingValue.getID();
		var returnableID = returnableValue.getID();
		if (returnableID == '-1') {
			var quantityList = new java.util.ArrayList;
			var nextLowerLevelPUs = bf_GetPackagingStructure.evaluate({node: node}).toArray();
			var netContentsBaseItem;
			for (var x in nextLowerLevelPUs) {
				var nextLowerLevelPU = nextLowerLevelPUs[x];
				if (nextLowerLevelPU.getObjectType().getID() != 'prd_Article' && nextLowerLevelPU.getObjectType().getID() != 'prd_GiftBoxArticle') {
					quantityList.add(nextLowerLevelPU.queryReferences(ref_NextLowerLevel).asList(10).get(0).getValue(att_QuantityOfNextLowerLevel.getID()).getSimpleValue());
				}
				if (nextLowerLevelPU.getObjectType().getID() == 'prd_PackagingUnitEach') {
					netContentsBaseItem = nextLowerLevelPU.getValue(att_NetContents.getID()).getValue();
				}
			}
			var materialType;
			if ('10'.equals(node.getValue(att_ProductType.getID()).getLOVValue().getID())) {
				materialType = 'Glass';
			} else {
				materialType = 'PET';
			}
			var totalQuantity = multiplyList(quantityList);
			log.info(quantityList+' '+totalQuantity+' '+materialType+' '+netContentsBaseItem);
			var condition = com.stibo.query.condition.Conditions;
			var home = manager.getHome(com.stibo.query.home.QueryHome);
			var querySpecification = home.queryFor(com.stibo.core.domain.entity.Entity).where(
						        condition.valueOf(att_AmountOfBaseItems).eq(totalQuantity)
						        .and(condition.valueOf(att_NetContentOfBaseItem).numeric().lt(netContentsBaseItem))
						        .and(condition.valueOf(att_MaxNetContentOfBaseItem).numeric().gt(netContentsBaseItem))
						        .and(condition.objectType(ent_Deposit))
							   .and(condition.valueOf(att_DepositMaterialType).eq(materialType))
						    	   );
			var result = querySpecification.execute().asList(1);
			log.info(result);
			if (result.size()>0) {
				var existingReferences = node.queryReferences(pte_Deposit).asList(1);
				if (existingReferences.size()>0) {
					var targetExistingReference = existingReferences.get(0).getTarget();
					if (targetExistingReference.getID() != result.get(0).getID()) {
						existingReferences.get(0).delete();
					}
				}
				var newReference = createreference(node, result.get(0), pte_Deposit);
				newReference.getValue(att_ValidityStartDate.getID()).setSimpleValue(toISOStringLocal(new Date()));
			}
			if (packagingValue.getID() == 'KRAT') {
				setEmballage(node, totalQuantity, home, condition);
			}
		}
	}
}

//Search for emballage and create reference
function setEmballage(node, totalQuantity, home, condition) {
	var querySpecificationEmballage = home.queryFor(com.stibo.core.domain.entity.Entity).where(
				        		    condition.valueOf(att_AmountOfBaseItems).eq(totalQuantity)
				        		    .and(condition.objectType(ent_Emballage))
				    	   		    );
	var resultEmballage = querySpecificationEmballage.execute().asList(1);
	if (resultEmballage.size()>0) {
		var existingReferences = node.queryReferences(pte_Emballage).asList(1);
		if (existingReferences.size()>0) {
			var targetExistingReference = existingReferences.get(0).getTarget();
			if (targetExistingReference.getID() != resultEmballage.get(0).getID()) {
				existingReferences.get(0).delete();
			}
		}
		var newReference = createreference(node, resultEmballage.get(0), pte_Emballage);
		newReference.getValue(att_ValidityStartDate.getID()).setSimpleValue(toISOStringLocal(new Date()));
	}
}

//Calculate number of base items in packaging
function multiplyList(list) {
	var totalQuantity = 1;
	var listIterator = list.iterator();
	while (listIterator.hasNext()) {
		var quantity = listIterator.next();
		totalQuantity = totalQuantity * Number(quantity);
	}
	return totalQuantity;
}

function createreference(source, target, referenceType) {
	try {
	 	var reference = source.createReference(target, referenceType);
	} catch (e) {
		if (e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
			logger.info('Reference exists, no action needed');
		} else {
			throw (e);
		}
	}
	return reference;
}

function toISOStringLocal(d) {
  function z(n) {
return (n<10?'0':'') + n;
}
  return d.getFullYear() + '-' + z(d.getMonth()+1) + '-' + z(d.getDate());
}
}