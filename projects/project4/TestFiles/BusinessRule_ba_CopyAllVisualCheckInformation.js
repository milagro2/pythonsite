/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_CopyAllVisualCheckInformation",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Copy All Visual Check Information",
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
    "contract" : "BusinessActionBindContract",
    "alias" : "ba_CopyAttributeValuesForArticle",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessActionImpl",
    "value" : "ba_CopyAttributeValuesForArticle",
    "description" : null
  }, {
    "contract" : "BusinessActionBindContract",
    "alias" : "ba_CopyReferencesForArticle",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessActionImpl",
    "value" : "ba_CopyReferencesForArticle",
    "description" : null
  }, {
    "contract" : "BusinessActionBindContract",
    "alias" : "ba_CopyDataContainersForArticle",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessActionImpl",
    "value" : "ba_CopyDataContainersForArticle",
    "description" : null
  }, {
    "contract" : "AttributeGroupBindContract",
    "alias" : "atg_TIIArticle_VisualCheck",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeGroupImpl",
    "value" : "atg_TIIArticle_VisualCheck",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_TIIVisualCheckGroupArticle",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_TIIVisualCheckGroupArticle",
    "description" : null
  }, {
    "contract" : "AttributeGroupBindContract",
    "alias" : "atg_TIIPack_VisualCheck",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeGroupImpl",
    "value" : "atg_TIIPack_VisualCheck",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_TIIVisualCheckGroupPack",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_TIIVisualCheckGroupPack",
    "description" : null
  }, {
    "contract" : "BusinessActionBindContract",
    "alias" : "ba_CopyAttributeValuesForPackUnit",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessActionImpl",
    "value" : "ba_CopyAttributeValuesForPackUnit",
    "description" : null
  }, {
    "contract" : "BusinessActionBindContract",
    "alias" : "ba_CopyDataContainersForPackUnit",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessActionImpl",
    "value" : "ba_CopyDataContainersForPackUnit",
    "description" : null
  } ],
  "messages" : [ {
    "variable" : "Error",
    "message" : "Please select a group you would like to copy.",
    "translations" : [ {
      "language" : "nl",
      "message" : "Selecteer een groep die je wilt kopiëren"
    } ]
  } ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,ba_CopyAttributeValuesForArticle,ba_CopyReferencesForArticle,ba_CopyDataContainersForArticle,atg_TIIArticle_VisualCheck,att_TIIVisualCheckGroupArticle,atg_TIIPack_VisualCheck,att_TIIVisualCheckGroupPack,ba_CopyAttributeValuesForPackUnit,ba_CopyDataContainersForPackUnit,Error) {
//First deal with article
if (atg_TIIArticle_VisualCheck) {
	var visualCheckAtgArr = atg_TIIArticle_VisualCheck.getChildren().toArray();
	for(var i in visualCheckAtgArr){
		node.getValue(att_TIIVisualCheckGroupArticle.getID()).addLOVValueByID(visualCheckAtgArr[i].getID());
	}
	ba_CopyAttributeValuesForArticle.execute (node);
	ba_CopyReferencesForArticle.execute (node);
	ba_CopyDataContainersForArticle.execute (node);
	node.getValue(att_TIIVisualCheckGroupArticle.getID()).deleteCurrent();
} else {
	var error = new Error();
	throw error;
}

//Then packaging units.

var PUs = node.getChildren().toArray();

for(var j in PUs) {
	var PU = PUs[j];
	if (atg_TIIPack_VisualCheck) {
		var visualCheckAtgArrPU = atg_TIIPack_VisualCheck.getChildren().toArray();
		for(var i in visualCheckAtgArrPU){
			node.getValue(att_TIIVisualCheckGroupPack.getID()).addLOVValueByID(visualCheckAtgArrPU[i].getID());
		}
		ba_CopyAttributeValuesForPackUnit.execute (PU);
		ba_CopyDataContainersForPackUnit.execute (PU);
		PU.getValue(att_TIIVisualCheckGroupPack.getID()).deleteCurrent();
	} else {
		var error = new Error();
		throw error;
	}
	
}
}