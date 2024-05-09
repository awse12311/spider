var sourceFile = "C:\\Path\\To\\Your\\File.docx"; // 設置要列印的文件路徑
var destinationFile = "C:\\Path\\To\\Your\\Destination\\File.pdf"; // 設置 PDF 文件的目標路徑

var shell = new ActiveXObject("WScript.Shell");
var fso = new ActiveXObject("Scripting.FileSystemObject");

if (fso.FileExists(sourceFile)) {
    var printerName = "Microsoft Print to PDF"; // 設置列印機名稱

    // 設置列印命令
    var printCommand = 'print /D:"' + printerName + '" "' + sourceFile + '"';

    // 執行列印命令
    shell.Run(printCommand, 0, true);

    // 等待列印完成

    // 檢查 PDF 文件是否存在
    if (fso.FileExists(destinationFile)) {
        // 如果目標 PDF 文件已存在，刪除它
        fso.DeleteFile(destinationFile);
    }

    // 移動列印好的 PDF 文件到指定目錄
    fso.MoveFile(sourceFile.replace(".docx", ".pdf"), destinationFile);

    WScript.Echo("PDF 文件已生成並保存到指定目錄。");
} else {
    WScript.Echo("文件不存在。");
}
