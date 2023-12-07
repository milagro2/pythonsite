/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_SetDefaultAwardStartEndDate",
  "type" : "BusinessAction",
  "setupGroups" : [ "brg_Actions" ],
  "name" : "Set default Award Start and End Date",
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
    "contract" : "AttributeBindContract",
    "alias" : "att_ValidityStartDate",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ValidityStartDate",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_ValidityEndDate",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ValidityEndDate",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_VisibleShelfLabel",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_VisibleShelfLabel",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,att_ValidityStartDate,att_ValidityEndDate,att_VisibleShelfLabel) {
/*On Article, retrieve data containers Gall Awards (dct_GallAwards).
 * If data containers are present, retrieve values of the attributes on the data containers.
 * If there are no values on the attributes, set values as below:
 * Validity start date → Today's date
 * Validity end date → 31-12- 9999
 * Shelf Label Y/N → Set LoV ID to 0
 *
 * Bindings:
 * validityStartDateAtt --> Validity start date (att_ValidityStartDate)
 * validityEndDateAtt --> Validity end date (att_ValidityEndDate)
 * visibleShelfLabelAtt --> Shelf Label Y/N (att_VisibleShelfLabel)
 */
var containers = node.getDataContainerByTypeID('dct_GallAwards').getDataContainers().iterator();
while (containers.hasNext()) {
	var containerObject = containers.next().getDataContainerObject();
	var startDate = containerObject.getValue(att_ValidityStartDate.getID()).getSimpleValue();
	var endDate = containerObject.getValue(att_ValidityEndDate.getID()).getSimpleValue();
	var shelflabel = containerObject.getValue(att_VisibleShelfLabel.getID()).getSimpleValue();
	if (!startDate || !endDate || !shelflabel) {
		var sdf = new java.text.SimpleDateFormat('yyyy-MM-dd');
		 containerObject.getValue(att_ValidityStartDate.getID()).setSimpleValue(sdf.format(new Date()));
		 containerObject.getValue(att_ValidityEndDate.getID()).setSimpleValue('9999-12-31');
		 if (!shelflabel) {
		 containerObject.getValue(att_VisibleShelfLabel.getID()).setLOVValueByID(0);
		 }
	}
}
}