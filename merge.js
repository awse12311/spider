
var source_root = "C:\\Users\\mark.chang\\Documents\\Project\\永信藥品\\test_out\\DataGroup\\";
// Get the source folder path, assuming the local variable name is SourceFolderPath
var CustNumber = Watch.GetVariable("CustNumber");
var SammonsNumber = Watch.GetVariable("SammonsNumber");
var OrderNumber = Watch.GetVariable("OrderNumber");
var DeliveryNumber = Watch.GetVariable("DeliveryNumber");


var Source = source_root;
var CTarget = source_root + CustNumber;
var STarget = source_root + CustNumber + "\\" + SammonsNumber;
    // Create a file system object
var fso = new ActiveXObject("Scripting.FileSystemObject");
    // Get the source folder object
var sourceFolder = fso.GetFolder(Source);
var CTargetFolder,STargetFolder ;
    // Get the target folder path, assuming the local variable name is TargetFolderPath
    if(!fso.FolderExists(CTarget)){
        fso.CreateFolder(CTarget);
        CTargetFolder = fso.GetFolder(CTarget);
    }else{
        CTargetFolder = fso.GetFolder(CTarget);
    }

    if(!fso.FolderExists(STarget)){
        fso.CreateFolder(STarget);
        STargetFolder = fso.GetFolder(STarget);
    }else{
        STargetFolder = fso.GetFolder(STarget);
    }



var targetFilePath = "C:\\Users\\mark.chang\\Documents\\Project\\永信藥品\\test_out\\DataGroup\\GroupPDF";

var pdfFiles = new Array();
var fileEnum = new Enumerator(STargetFolder.Files);
for (; !fileEnum.atEnd(); fileEnum.moveNext()) {
    var file = fileEnum.item();
    if (fso.GetExtensionName(file.Path).toLowerCase() == "pdf") {
        pdfFiles.push(file.Path);
    }
}

var pdfMerger = new ActiveXObject("PdfFactory.PdfFile");

for (var i = 0; i < pdfFiles.length; i++) {
    pdfMerger.Append(pdfFiles[i]);
}

pdfMerger.Save(targetFilePath.trim());



