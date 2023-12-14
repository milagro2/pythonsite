/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_AssignBrandToTradeItem",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Assign Brand to trade item",
  "description" : null,
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
    "contract" : "AttributeBindContract",
    "alias" : "att_BrandName",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_BrandName",
    "description" : null
  }, {
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_Brand",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_Brand",
    "description" : null
  }, {
    "contract" : "LookupTableHomeBindContract",
    "alias" : "lookupTable",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "QueryHomeBindContract",
    "alias" : "home",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "ast_Brand",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "ast_Brand",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,att_BrandName,ref_Brand,lookupTable,home,ast_Brand) {
/*Based on the brand name provided by the data providers, try to select the correct brand from the transformation table.
 * 
 * Bindings: 
 * brandNameAtt --> Brand Name (att_BrandName)
 * brandRef --> Brand (ref_Brand)
 */

//From Trade item, retrieve attribute value Brand Name. 
var brandName = node.getValue(att_BrandName.getID()).getSimpleValue();
var lookupdata = lookupTable.	getLookupTableValue("tlt_ExternalBrandToBrand", brandName);
if(lookupdata){
	//Find the target node by name
	var nameCondition = com.stibo.query.condition.Conditions.name();
	var condition = com.stibo.query.condition.Conditions;	
	var querySpecificationToFindBrand = home.queryFor(com.stibo.core.domain.Asset).where(
	  nameCondition.eq(lookupdata)
	  .and(condition.objectType(ast_Brand))
	);
	var result = querySpecificationToFindBrand.execute().asList(1);
	if(result.size()>0){	
		var brandNode = result.get(0);
		//create the reference
		try{
		node.createReference(brandNode, ref_Brand);
		}catch(e){
			if(!e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException){
				throw (e);
			}
		}
	}
}
}