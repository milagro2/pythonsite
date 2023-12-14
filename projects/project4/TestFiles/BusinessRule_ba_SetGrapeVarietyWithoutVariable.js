/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SetGrapeVarietyWithoutVariable",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_SetValuesAndLinkes" ],
  "name" : "Set Grape Variety Without Variable",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "prd_Article", "prd_ProductFamily" ],
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
    "contract" : "ReferenceTypeBindContract",
    "alias" : "ref_GrapeSpeciesCultivar",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ref_GrapeSpeciesCultivar",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_GrapeVariety",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_GrapeVariety",
    "description" : null
  }, {
    "contract" : "ListOfValuesBindContract",
    "alias" : "lov_GrapeVariety",
    "parameterClass" : "com.stibo.core.domain.impl.ListOfValuesImpl",
    "value" : "lov_GrapeVariety",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_COSMOSNumberCounter",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_COSMOSNumberCounter",
    "description" : null
  }, {
    "contract" : "EntityBindContract",
    "alias" : "GrapeSpeciesCultivar",
    "parameterClass" : "com.stibo.core.domain.impl.entity.FrontEntityImpl$$Generated$$12",
    "value" : "GrapeSpeciesCultivar",
    "description" : null
  }, {
    "contract" : "BusinessActionBindContract",
    "alias" : "ba_InitiateInEventProcPostArticleToCOSM",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessActionImpl",
    "value" : "ba_InitiateInEventProcPostArticleToCOSM",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_ProductType",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ProductType",
    "description" : null
  } ],
  "messages" : [ {
    "variable" : "ErrorMessage",
    "message" : "No grape species have been selected, please make sure at least one Grape Species is selected",
    "translations" : [ {
      "language" : "nl",
      "message" : "Er zijn geen druif soorten geselecteerd, om verder te kunnen moet er minimaal één soort worden geselecteerd"
    } ]
  }, {
    "variable" : "ErrorMessageSequence",
    "message" : "Please add the sequence number to the Grape Varieties, and make sure the sequence is unique",
    "translations" : [ {
      "language" : "nl",
      "message" : "Volgorde nummers moeten worden toegevoegd aan de druif soorten, en de volgorde moet uniek zijn"
    } ]
  } ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,manager,ref_GrapeSpeciesCultivar,att_GrapeVariety,lov_GrapeVariety,att_COSMOSNumberCounter,GrapeSpeciesCultivar,ba_InitiateInEventProcPostArticleToCOSM,att_ProductType,ErrorMessage,ErrorMessageSequence) {
/*
   * If no grape species (Cultivar) reference has been added or the sequence on the reference has been completed
   * then show message "Please select grape race(s) and the sequence of these races", skip further processing.
   * Based on the selected grape species (Cultivar) and the sequence find the LOV value "Grape variety" and
   * set the value on the article. If no value can be found, a new value is added to the LOV and the value
   * is set to the article.
   *
   * Bindings:
   * grapeSpeciesCultivarRef--> Grape Species (Cultivar) (ref_GrapeSpeciesCultivar)
   * grapeVarietyAtt --> Grape Variety (att_GrapeVariety)
   * grapeVarietyLov --> Grape Variety (lov_GrapeVariety)
   * COSMOSNumberCounterAtt --> COSMOS Number Counter (att_COSMOSNumberCounter)
   * grapeSpeciesCultivarRootEnt --> Grape Species (Cultivar) (GrapeSpeciesCultivar)
   */

var references = node.queryReferences(ref_GrapeSpeciesCultivar).asList(10);
var isWine = 'Wijn'.equals(node.getValue(att_ProductType.getID()).getSimpleValue());
var isMousserend = 'Mousserend'.equals(node.getValue(att_ProductType.getID()).getSimpleValue());

// If not wine or bubbling, early exit
if (isWine == false && isMousserend == false) {
	return;
}

// If bubbling, and no grape specied, early exit
if (isMousserend && references.size() == 0) {
	return;
}

// If no references, throw error
if (references.size() == 0) {
  var errorMessage = new ErrorMessage();
  throw errorMessage;
}

if (references.size() == 1) {
  references.get(0).getValue('att_Sequence').setSimpleValue(1);
}

var concatinatedTargets;
var map = new java.util.TreeMap();

node.queryReferences(ref_GrapeSpeciesCultivar).forEach(function (reference) {
  var hasValue = reference.getValue('att_Sequence').getSimpleValue() == undefined;
  if (hasValue) {
    errorMessageSequence = new ErrorMessageSequence();
    throw errorMessageSequence;
  }
  map.put(reference.getValue("att_Sequence").getSimpleValue(), reference.getTarget());
  return true;
});

var keys = map.keySet().iterator();
while (keys.hasNext()) {
  var key = keys.next();
  if (concatinatedTargets) {
    concatinatedTargets = concatinatedTargets + ' - ' + map.get(key).getName();
  } else {
    concatinatedTargets = map.get(key).getName();
  }
}

//Check if LOV value is present or not
var lovExists = false;
var query = lov_GrapeVariety.queryValidValues();
query.forEach(function (nodetest) {
  if (nodetest.getValue().equals(concatinatedTargets)) {
    lovExists = true;
    return false;
  }
  return true;
});

if (lovExists) {
	node.getValue(att_GrapeVariety.getID()).setValue(concatinatedTargets);
} else {
	// If there is no LoV Name to match the concatenated string, create the LoV instance
	var id = parseInt(GrapeSpeciesCultivar.getValue(att_COSMOSNumberCounter.getID()).getSimpleValue()) + 1;
	lov_GrapeVariety.createListOfValuesValue(concatinatedTargets, null, id);

	node.getValue(att_GrapeVariety.getID()).setLOVValueByID(id);
	GrapeSpeciesCultivar.getValue(att_COSMOSNumberCounter.getID()).setSimpleValue(id);

	var packagingUnits = node.getChildren().toArray();
  for (var y in packagingUnits) {
    ba_InitiateInEventProcPostArticleToCOSM.execute(packagingUnits[y]);
  }
}
}