/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "lib_ValueList",
  "type" : "BusinessLibrary",
  "setupGroups" : [ "brg_Libraries" ],
  "name" : "ValueList",
  "description" : null,
  "scope" : null,
  "validObjectTypes" : [ ],
  "allObjectTypesValid" : false,
  "runPrivileged" : false,
  "onApprove" : null,
  "dependencies" : [ ]
}
*/
/*===== business rule plugin definition =====
{
  "pluginId" : "JavaScriptBusinessLibrary",
  "binds" : [ ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
function getValueList() {
    return {
    'Packaging': {
        'BLIK': 'BLIK',
        'BOEK': 'BOEK',
        'DOOS': 'DS',
        'FLES': 'FLE',
        'FUST': 'FUST',
        'GLAS': 'GLAS',
        'KIST': 'KIST',
        'KOKER': 'KOKER',
        'KRAT': 'KRAT',
        'KRUIK': 'KRUIK',
        'PACK': 'PACK',
        'PAK': 'PAK',
        'STUK': 'STUK',
        'TRAY': 'TRAY',
    },
    'ProductType': {
        'Wijn': '1',
        'Beer': '10',
        'Liqueur': '11',
        'Soft_Drink': '12',
        'Non_Food': '13',
        'Sherry': '2',
        'Port': '3',
        'Mousserend': '4',
        'Domestic_Distilled': '5',
        'Mix': '6',
        'Whisky': '7',
        'Armagnac_Brandy_Calvados_Grappa': '8',
        'Cognac': '9',
    },
    'Stream': {
        'DC': 'DC',
        'RZ': 'RZ',
    },
};
}
/*===== business library exports - this part will not be imported to STEP =====*/
exports.getValueList = getValueList