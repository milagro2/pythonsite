/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SetPackFromPackType",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_SetValuesAndLinkes" ],
  "name" : "Set Packaging from Packaging Type",
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
    "alias" : "att_Packaging",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_Packaging",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_PackagingType",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_PackagingType",
    "description" : null
  }, {
    "contract" : "LookupTableHomeBindContract",
    "alias" : "lookupTable",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,att_Packaging,att_PackagingType,lookupTable) {
/*On trade item, retrieve attribute LoV value ID of att_PackagingType. Set on trade item attribute LoV value of att_Packaging based on the LoV value ID of att_PackagingType using the Transformation table tlt_PackagingTypeCodeToPackaging.
 * If no value is found return error message "Packaging Type mapping is not present, please contact your Admin to get the value added to the tlt_PackagingTypeCodeToPackaging lookup table".
 * 
 * Bindings:
 * packagingAtt --> Packaging (att_Packaging)
 * packagingTypeAtt --> Packaging Type Code (att_PackagingType)
 */

// retrieve attribute LoV value ID of att_PackagingType
var packagingType = node.getValue(att_PackagingType.getID()).getLOVValue();

if(packagingType){

	//fetch the value from lookup table
	var packageLookUpData = lookupTable.getLookupTableValue("tlt_PackagingTypeCodeToPackaging", packagingType.getID());

	if(packageLookUpData){

			node.getValue(att_Packaging.getID()).setSimpleValue(packageLookUpData);
			
	}
}
}