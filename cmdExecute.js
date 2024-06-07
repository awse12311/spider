var objShell = new ActiveXObject("Shell.Application");
var PrinServertIP = "192.168.1.57";
executableCommand = "lpr _S" + PrinServertIP + " -P q1 " + FileName;
objShell.Run(executableCommand);