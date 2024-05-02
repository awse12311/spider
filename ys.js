var source_root = "C:\\Users\\mark.chang\\Documents\\Project\\永信藥品\\test_out\\Step1\\";
// Get the source folder path, assuming the local variable name is SourceFolderPath
var CustNumber = Watch.GetVariable("CustNumber");
var SammonsNumber = Watch.GetVariable("SammonsNumber");
var OrderNumber = Watch.GetVariable("OrderNumber");
var DeliveryNumber = Watch.GetVariable("DeliveryNumber");

var Source = source_root + "C" + CustNumber;
var Target = Source + "\\S" + SammonsNumber;


// Create a file system object
var fso = new ActiveXObject("Scripting.FileSystemObject");

// Get the source folder object
var sourceFolder = fso.GetFolder(Source);
// Get the target folder path, assuming the local variable name is TargetFolderPath
if (!fso.FolderExists(Target)) {
    fso.CreateFolder(Target);
    var TargetFolder = fso.GetFolder(Target);
} else {
    var TargetFolder = fso.GetFolder(Target);
}

// Iterate through the files in the source folder
var files = new Enumerator(sourceFolder.files);
for (; !files.atEnd(); files.moveNext()) {
    var file = files.item();

    // Get the file name
    var fileName = file.Name;

    // Check if the file name contains a specific keyword, using "keyword" as an example here
    Watch.Log("Get File P4_C" + CustNumber + "_O" + OrderNumber + "_D" + DeliveryNumber + ".pdf", 3);
    if (fileName.indexOf("P4_C" + CustNumber + "_O" + OrderNumber + "_D" + DeliveryNumber) !== -1) {
        // Create the target subfolder path, assuming the subfolder name is "KeywordFolder"
        var targetSubFolderPath = TargetFolder;

        // Check if the target subfolder exists, if not, create it
        if (!fso.FolderExists(targetSubFolderPath)) {
            fso.CreateFolder(targetSubFolderPath);
        }

        // Move the file to the target subfolder
        file.Move(targetSubFolderPath + "\\" + fileName);
        Watch.Log("Move File P4_C" + CustNumber + "_O" + OrderNumber + "_D" + DeliveryNumber + ".pdf", 3);
    }
    Watch.Log("Get File P5_C" + CustNumber + "_S" + SammonsNumber + "_D" + DeliveryNumber + ".pdf to " + targetSubFolderPath, 3);
    if (fileName.indexOf("P5_C" + CustNumber + "_S" + SammonsNumber + "_D" + DeliveryNumber) !== -1) {
        // Create the target subfolder path, assuming the subfolder name is "KeywordFolder"
        var targetSubFolderPath = TargetFolder;

        // Check if the target subfolder exists, if not, create it
        if (!fso.FolderExists(targetSubFolderPath)) {
            fso.CreateFolder(targetSubFolderPath);
        }

        // Move the file to the target subfolder
        file.Move(targetSubFolderPath + "\\" + fileName);
        Watch.Log("Move File P5_C" + CustNumber + "_S" + SammonsNumber + "_D" + DeliveryNumber + ".pdf to " + targetSubFolderPath, 3);
    }
    Watch.Log("Get File P6_C" + CustNumber + "_S" + SammonsNumber + "_D" + DeliveryNumber + ".pdf to " + targetSubFolderPath, 3);
    if (fileName.indexOf("P6_C" + CustNumber + "_S" + SammonsNumber + "_D" + DeliveryNumber) !== -1) {
        // Create the target subfolder path, assuming the subfolder name is "KeywordFolder"
        var targetSubFolderPath = TargetFolder;

        // Check if the target subfolder exists, if not, create it
        if (!fso.FolderExists(targetSubFolderPath)) {
            fso.CreateFolder(targetSubFolderPath);
        }

        // Move the file to the target subfolder
        file.Move(targetSubFolderPath + "\\" + fileName);
        Watch.Log("Move File P6_C" + CustNumber + "_S" + SammonsNumber + "_D" + DeliveryNumber + ".pdf to " + targetSubFolderPath, 3);
    }
}
