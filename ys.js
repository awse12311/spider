// Get the Data Mapper output data
var inputData = Watch.GetVariable("DataMapperOutput");

// If the data exists
if (inputData) {
    // Create an XML document object
    var xmlDoc = new ActiveXObject("Msxml2.DOMDocument.6.0");
    
    // Create the root element
    var root = xmlDoc.createElement("Root");
    xmlDoc.appendChild(root);
    
    // Convert the Data Mapper output data to XML format
    for (var i = 0; i < inputData.RowCount; i++) {
        var row = inputData.GetRow(i);
        var item = xmlDoc.createElement("Item");
        for (var j = 0; j < inputData.ColumnCount; j++) {
            var columnName = inputData.GetColumnName(j);
            var columnValue = row[columnName];
            var element = xmlDoc.createElement(columnName);
            element.text = columnValue;
            item.appendChild(element);
        }
        root.appendChild(item);
    }
    
    // Save the XML file
    var outputPath = "C:\\path\\to\\output\\file.xml"; // Replace with the path to save the XML file
    xmlDoc.save(outputPath);
    
    // Log success message
    Watch.Log("XML file generated successfully: " + outputPath);
} else {
    // If the data does not exist, log error message
    Watch.Log("Data Mapper output data not found.");
}

