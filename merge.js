// 获取源文件夹路径，假设本地变量名为 SourceFolderPath
var sourceFolderPath = WScript.CreateObject("Scripting.FileSystemObject").GetStandardStream(0).ReadToEnd();

// 获取目标文件路径，假设本地变量名为 TargetFilePath
var targetFilePath = WScript.CreateObject("Scripting.FileSystemObject").GetStandardStream(1).ReadToEnd();

// 创建文件系统对象
var fso = new ActiveXObject("Scripting.FileSystemObject");

// 获取源文件夹对象
var sourceFolder = fso.GetFolder(sourceFolderPath.trim());

// 获取目标文件夹中所有PDF文件
var pdfFiles = new Array();
var fileEnum = new Enumerator(sourceFolder.Files);
for (; !fileEnum.atEnd(); fileEnum.moveNext()) {
    var file = fileEnum.item();
    if (fso.GetExtensionName(file.Path).toLowerCase() == "pdf") {
        pdfFiles.push(file.Path);
    }
}

// 创建一个新的PDF文件对象
var pdfMerger = new ActiveXObject("PdfFactory.PdfFile");

// 遍历PDF文件列表，逐个合并到目标文件中
for (var i = 0; i < pdfFiles.length; i++) {
    pdfMerger.Append(pdfFiles[i]);
}

// 保存合并后的PDF文件到目标文件中
pdfMerger.Save(targetFilePath.trim());

// 输出合并完成的信息
WScript.Echo("PDF文件合并完成。合并后的文件保存在：" + targetFilePath.trim());
