/*===== export metadata =====
{
  "contextId" : "nl-NL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "bf_DisplayTIMSChangeLog",
  "type" : "BusinessFunction",
  "setupGroups" : [ "brg_Functions" ],
  "name" : "Display TIMS Change Log",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ ],
  "allObjectTypesValid" : true,
  "runPrivileged" : true,
  "onApprove" : "Never",
  "dependencies" : [ ]
}
*/
/*===== business rule plugin definition =====
{
  "pluginId" : "JavaScriptBusinessFunctionWithBinds",
  "binds" : [ {
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "LoggerBindContract",
    "alias" : "log",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_TIMSChangeType",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_TIMSChangeType",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_ComponentTitle",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ComponentTitle",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_ComponentType",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ComponentType",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_TIMSOldValue",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_TIMSOldValue",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_TIMSNewValue",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_TIMSNewValue",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_TIMSChangeDate",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_TIMSChangeDate",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_ProductValue",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_ProductValue",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "att_TIMSTradeItemDescriptor",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "att_TIMSTradeItemDescriptor",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation",
  "functionReturnType" : "java.lang.String",
  "functionParameterBinds" : [ {
    "contract" : "NodeBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : "Node from which to retrieve the datacontainer"
  }, {
    "contract" : "StringBindContract",
    "alias" : "changeType",
    "parameterClass" : "null",
    "value" : null,
    "description" : "Eg; \"Logistic\" or \"Commercial\""
  } ]
}
*/
exports.operation0 = function (manager,log,att_TIMSChangeType,att_ComponentTitle,att_ComponentType,att_TIMSOldValue,att_TIMSNewValue,att_TIMSChangeDate,att_ProductValue,att_TIMSTradeItemDescriptor,node,changeType) {
// Get required information from datacontainer
var dataContainerRows = [];
var keyHome = manager.getHome(com.stibo.core.domain.datacontainerkey.keyhome.DataContainerKeyHome);
var dcTypeHome = manager.getHome(com.stibo.core.domain.datacontainertype.DataContainerTypeHome);
var dcType = dcTypeHome.getDataContainerTypeByID("dct_TIMSUpdateLog");

var sourceDataContainers = []

// Add article data container items
var containersArticle = node.getDataContainerByTypeID(dcType.getID()).getDataContainers().toArray();
containersArticle.forEach(function(container) {
	sourceDataContainers.push(container);
})

// Add children data container items
node.getChildren().forEach(function (child) {
	var containersPU = child.getDataContainerByTypeID(dcType.getID()).getDataContainers().toArray();
	containersPU.forEach(function(container) {
		sourceDataContainers.push(container);
	})
})

for (var x in sourceDataContainers) {
	var dct = sourceDataContainers[x].getDataContainerObject();
	if (dct.getValue(att_TIMSChangeType.getID()).getSimpleValue() == changeType) {
		var component = dct.getValue(att_ComponentTitle.getID()).getSimpleValue();
		var componentType = dct.getValue(att_ComponentType.getID()).getSimpleValue();
		var timsOldValue = dct.getValue(att_TIMSOldValue.getID()).getSimpleValue();
		var timsNewValue = dct.getValue(att_TIMSNewValue.getID()).getSimpleValue();
		var timsChangeDate = dct.getValue(att_TIMSChangeDate.getID()).getSimpleValue();
		var productValue = dct.getValue(att_ProductValue.getID()).getSimpleValue();
		var tradeItemDescriptor = dct.getValue(att_TIMSTradeItemDescriptor.getID()).getSimpleValue();
		dataContainerRows.push([tradeItemDescriptor, component, timsChangeDate, timsOldValue, timsNewValue, productValue])
	}
}

// Sort dataContainerRows
dataContainerRows = dataContainerRows.sort(function (a, b){return a[0] > b[0] ? 1 : -1})

// Build HTML View
const tableHeaderCellStart = '<td class="sourceTraceabity-header sourceTraceabity-cellBottom"><div class="gwt-Label sourceTraceabity-ellipseable-div" style="margin-right:8px;"">';
const tableHeaderCellEnd = '</div></td>';
const tableDataCellStart = '<td class="sourceTraceabity-cellData sourceTraceabity-cellBottom"><div class="gwt-Label sourceTraceabity-ellipseable-div" style="margin-right:8px;width:100%;word-break:break-word;">';
const tableDataCellEnd = '</div></td>';
const header = '<div style="margin:12px;margin-right:32px;"><table class="sourceTraceabity-mainTable"><tbody>';
const footer = '</tbody></table></div>';

//Table Header
var html = header;

// Column headers (repeat for each column)
html += tableHeaderCellStart + 'Object' + tableHeaderCellEnd;
html += tableHeaderCellStart + 'Field' + tableHeaderCellEnd;
html += tableHeaderCellStart + 'Change Date' + tableHeaderCellEnd;
html += tableHeaderCellStart + 'TIMS Old' + tableHeaderCellEnd;
html += tableHeaderCellStart + 'TIMS New' + tableHeaderCellEnd;
html += tableHeaderCellStart + 'Product Value' + tableHeaderCellEnd;

for (var i = 0; i < dataContainerRows.length; i++) {
	html += '<tr>';
	dataContainerRows[i].forEach((item) => {
		html += tableDataCellStart + item + tableDataCellEnd
	})
	html += '</tr>';
}

html = html + footer;
return html;
}