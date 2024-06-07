
//ADODB INIT
function Database() {
    try {
        this.connection = new ActiveXObject("ADODB.Connection");
        this.connection.ConnectionString = ConnectionString;
        this.connection.Open();
        Watch.Log("Db--------------------Database connection opened.", 3);
    } catch (e) {
        Watch.Log("Db--------------------Error opening database connection: " + e, 3);
    }
}
Database.prototype.close = function () {
    try {
        this.connection.Close();
        Watch.Log("Db--------------------Database connection closed.", 3);
    } catch (e) {
        Watch.Log("Db--------------------Error closing database connection: " + e, 3);
    }
};
Database.prototype.log = function (message) {
    Watch.Log("Db--------------------" + message, 3);
};
Database.prototype.executeQuery = function (query) {
    var rs = null
    try {
        rs = new ActiveXObject("ADODB.Recordset");
        rs.Open(query, this.connection);
        var results = [];
        while (!rs.EOF) {
            var result = {};
            for (var i = 0; i < rs.Fields.Count; i++) {
                result[rs.Fields(i).Name] = rs.Fields(i).Value;
            }
            results.push(result);
            rs.MoveNext();
        }
        rs.Close();
        Watch.Log("Db--------------------Query executed: " + query, 3);
        return results;
    } catch (e) {
        Watch.Log("Db--------------------Error executing query: " + e + " Query: " + query, 3);
        return [];
    }finally{
        if(rs)
        {
            rs.Close();
        }
    }
};
Database.prototype.executeNonQuery = function (query) {
    try {
        var cmd = new ActiveXObject("ADODB.Command");
        cmd.ActiveConnection = this.connection;
        cmd.CommandText = query;
        cmd.Execute();
        Watch.Log("Db--------------------NonQuery executed: " + query, 3);
    } catch (e) {
        Watch.Log("Db--------------------Error executing nonQuery: " + e + " Query: " + query, 3);
    }
};
Database.prototype.insert = function (table, data) {
    try {
        var keys = [], values = [];
        for (var key in data) {
            keys.push(key);
            values.push("'" + data[key].replace(/'/g,"''") + "'");
            Watch.Log('Db--------------------data:' + key+'_'+data[key], 3);
        }
        var query = "INSERT INTO " + table + " (" + keys.join(", ") + ") VALUES (" + values.join(", ") + ")";
        this.executeNonQuery(query);
    } catch (e) {
        Watch.Log("Db--------------------Error inserting data: " + e + " Data: " + JSON.stringify(data), 3);
    }
};
Database.prototype.update = function (table, data, where) {
    try {
        var set = [];
        
        for (var key in data) {
            set.push(key + "='" + data[key].replace(/'/g,"''") + "'");
            Watch.Log("Db--------------------table Data: " + key + "='" + data[key] + "'", 3);
        }
        var query = "UPDATE " + table + " SET " + set.join(", ") + " WHERE " + where + ";";
        this.executeNonQuery(query);
        Watch.Log("Db--------------------susses updating table" + table + " Data: " + query, 3);

    } catch (e) {
        Watch.Log("Db--------------------Error updating data: " + e.message + " Data: " + JSON.stringify(data) + " Where: " + where, 3);
    }
};
Database.prototype.insertAndGetId = function (table, data) {
    try {
        Watch.Log('Step8--------------------P3_F090:' + data['P3_F090'].toString(), 3);
        this.insert(table, data);
        // 獲取新插入數據的ID
        var idQuery = "SELECT SCOPE_IDENTITY() AS NewId";
        var result = this.executeQuery(idQuery);
        if (result.length > 0) {
            return result[0].NewId;
        } else {
            Watch.Log("Db--------------------can not get newid:" + data, 3);
            return null;
        }
    } catch (e) {
        Watch.Log('Db--------------------' + e.message, 3);
        return null;
    }
};
Database.prototype.updateAndGetId = function (table, data, where) {
    try {
        // 執行更新操作
        var set = [];
        for (var key in data) {
            set.push(key + "='" + data[key] + "'");
            Watch.Log("Db--------------------table Data: " + key + "='" + data[key] + "'", 3);
        }
        var query = "UPDATE " + table + " SET " + set.join(", ") + " WHERE " + where + ";";
        this.executeNonQuery(query);
        Watch.Log("Db--------------------susses updating table" + table + " Data: " + query, 3);
        // 獲取剛剛更新的資料的ID，假設identifier是唯一標識符
        var idQuery = "SELECT id FROM " + table + " WHERE " + where + ";";
        var result = this.executeQuery(idQuery);
        if (result.length > 0) {
            return result[0].id;
        } else {
            Watch.Log("Db--------------------can not get updated data", 3);
            return null;
        }
    } catch (e) {
        Watch.Log("Db--------------------update data and get id error" + e.message, 3);
        return null;
    }
};
Database.prototype.checkAndInsert = function (table, data, checkWhere) {
    try {
        var SqlString = "SELECT COUNT(*) AS RecordCount FROM " + table + " Where " + checkWhere;
        var results = db.executeQuery(SqlString);
        if (results[0].RecordCount == 0) {
            this.insert(table, data);
            // 獲取新插入數據的ID
            var idQuery = "SELECT SCOPE_IDENTITY() AS NewId";
            var result = this.executeQuery(idQuery);
            if (result.length > 0) {
                return result[0].NewId;
            } else {
                Watch.Log("Db--------------------can not get newid", 3);
                return null;
            }
        } else {
            return 0;
        }

    } catch (e) {
        Watch.Log("Db--------------------Error inserting data: " + e + " Data: " + JSON.stringify(data), 3);
    }
};
Database.prototype.executeSPQuery = function (query, hasParams, params) {
    try {
        var cmd = new ActiveXObject("ADODB.Command");
        cmd.ActiveConnection = this.connection;
        cmd.CommandText = query;
        cmd.CommandType = 4; // adCmdStoredProc

        if (hasParams && params) {
            for (var i = 0; i < params.length; i++) {
                cmd.Parameters.Append(cmd.CreateParameter(params[i].name, params[i].type, 1, params[i].size, params[i].value));
            }
        }

        var rs = cmd.Execute();
        var results = [];
        while (!rs.EOF) {
            var result = {};
            for (var i = 0; i < rs.Fields.Count; i++) {
                result[rs.Fields(i).Name] = rs.Fields(i).Value;
            }
            results.push(result);
            rs.MoveNext();
        }
        rs.Close();
        Watch.Log("execute Query Susses:" + query, 3);
        return results;
    } catch (e) {
        Watch.Log("execute Query Error:" + e.message + " select :" + query, 3);
        return [];
    }
};
Database.prototype.executeSPNonQuery = function (query, hasParams, params) {
    try {
        var cmd = new ActiveXObject("ADODB.Command");
        cmd.ActiveConnection = this.connection;
        cmd.CommandText = query;
        cmd.CommandType = 4; // adCmdStoredProc

        if (hasParams && params) {
            for (var i = 0; i < params.length; i++) {
                cmd.Parameters.Append(cmd.CreateParameter(params[i].name, params[i].type, 1, params[i].size, params[i].value));
            }
        }

        cmd.Execute();
        Watch.Log("execute non Query Susses:" + query, 3);
    } catch (e) {
        Watch.Log("execute non Query Error:" + e.message + " select :" + query, 3);
    }
};
Database.prototype.resultToJson = function (results) {
    try {
        return JSON.stringify(results, null, 2); // 格式化輸出 JSON
    } catch (e) {
        Watch.Log(e, 3)
        return null;
    }
};
Database.prototype.saveToFile = function (jsonData, filePath) {
    try {
        var fso = new ActiveXObject("Scripting.FileSystemObject");
        var file = fso.CreateTextFile(filePath, true);
        file.Write(jsonData);
        file.Close();
        //Watch.Log("CSV is Save：" + query, 3);
    } catch (e) {
        //Watch.Log("Save CSV Document is Error：" + e.message, 3);
    }
};

function P2_InsertAndUpdatePrintSub(SDate, CustNumber, SammonsNumber, OrderNumber, DeliveryNumber, InvNumber, P3_F090) {
    var CheckSqlString = "SELECT COUNT(*) AS RecordCount FROM YunShin_Print Where CustNumber = '" + CustNumber + "' and SammonsNumber = '" + SammonsNumber + "' " + " and OrderNumber = '" + OrderNumber + "' and DeliveryNumber = '" + DeliveryNumber + "' and SDate = '" + SDate + "';";
    var results = db.executeQuery(CheckSqlString);
    Watch.Log('Stpe7--------------------P2 Start YunShin_Print Record Count:' + results[0].RecordCount, 3);
    var GetPrintID;

    if (results[0].RecordCount == 0) {
        
        var Insert_YunShin_Print = {
            "CustNumber": CustNumber,
            "SammonsNumber": SammonsNumber,
            "OrderNumber": OrderNumber,
            "DeliveryNumber": DeliveryNumber,
            "InvNumber": InvNumber,
            "P3_F090": P3_F090,
            "SDate": SDate,
            "isPrint": false
        };
        
        GetPrintID = db.insertAndGetId("YunShin_Print", Insert_YunShin_Print);
        Watch.Log('Step8--------------------insert And Get Id:' + GetPrintID, 3);

    } else {
        Watch.Log('Step8--------------------P3_F090:' + P3_F090, 3);
        var Update_YunShin_Print = {
            "P3_F090": P3_F090,
            "isPrint": false
        };
        var whereClause = " CustNumber = '" + CustNumber + "' and SammonsNumber = '" + SammonsNumber + "' and OrderNumber = '" + OrderNumber + "'  and DeliveryNumber = '" + DeliveryNumber + "'";
        GetPrintID = db.updateAndGetId("YunShin_Print", Update_YunShin_Print, whereClause);
        Watch.Log('Step8--------------------update And Get Id:' + GetPrintID, 3);
    }

    //set select p_type name
    var P1 = DeliveryNumber;
    var P2 = SDate + "_" + CustNumber + "_" + SammonsNumber + "_" + OrderNumber + "_" + DeliveryNumber;
    var P3 = CustNumber + "_" + SammonsNumber;
    var P4 = CustNumber + "_" + OrderNumber + "_" + DeliveryNumber;
    var P5 = CustNumber + "_" + SammonsNumber + "_" + DeliveryNumber;
    var P6 = CustNumber + "_" + SammonsNumber + "_" + DeliveryNumber;
    var P7 = InvNumber;
    //YunShin_Basic Group By
    var SqlStringSelectForP2 = "SELECT ID_Name,P_type,FileName,FileRoute,MIN(Page) AS StartPage,MAX(Page) AS EndPage FROM YunShin_Basic Where ID_Name IN ('"
        + P1 + "','"
        + P2 + "','"
        + P3 + "','"
        + P4 + "','"
        + P5 + "','"
        + P6 + "','"
        + P7 + "')" +
        " GROUP BY ID_Name, P_Type, FileName, FileRoute" +
        " ORDER BY P_Type,ID_Name;";
    //YunShin_Basic Select
    var results_P2 = db.executeQuery(SqlStringSelectForP2);
    Watch.Log('Step9--------------------db Select Count for YunShin_Basic Group By:' + SqlStringSelectForP2, 3);

    if (results_P2.length > 0) {
        Watch.Log('Step10--------------------YunShin_Basic Group By Length:' + results_P2.length, 3);
        for (var j = 0; j < results_P2.length; j++) {
            //insert YunShin_PrintSub
            var Insert_YunShin_PrintSub = {
                "P_type": results_P2[j].P_type,
                "FileName": results_P2[j].FileName,
                "FileRoute": results_P2[j].FileRoute,
                "ID_Name": results_P2[j].ID_Name,
                "StartPage": results_P2[j].StartPage,
                "EndPage": results_P2[j].EndPage,
                "Print_id": GetPrintID
            };
            var where = "P_type = '" + results_P2[j].P_type + "' and ID_Name = '" + results_P2[j].ID_Name + "'";
            //return 0 代表已新增過了
            var subid = db.checkAndInsert("YunShin_PrintSub", Insert_YunShin_PrintSub, where);
            if (subid == 0) {
                Watch.Log('Step11--------------------YunShin_PrintSub is:' + subid + 'then Update YunShin_PrintSub', 3);
                var Update_YunShin_PrintSub = {
                    "FileName": results_P2[j].FileName,
                    "StartPage": results_P2[j].StartPage,
                    "EndPage": results_P2[j].EndPage,
                    "Print_id": GetPrintID
                };
                var where = "P_type = '" + results_P2[j].P_type + "' and ID_Name = '" + results_P2[j].ID_Name + "'";
                var subid = db.updateAndGetId("YunShin_PrintSub", Update_YunShin_PrintSub, where);
                Watch.Log('Step11-1--------------------YunShin_PrintSub Updated id:' + subid, 3);
            } else {
                Watch.Log('Step11--------------------YunShin_PrintSub insert id:' + subid, 3);
            }
        }
    }
}


//Run Process
var s = Watch.GetOriginalFileName().replace('.pdf','');
Watch.Log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!The job filename is: " + s, 3);
var FileRoute = Watch.GetMetadataFilename().replace('.dat.meta', '') + '.json';
Watch.Log("Step1--------------------get Json File Route" + FileRoute, 3)
var fso = new ActiveXObject("Scripting.FileSystemObject");

var JsonFile = fso.OpenTextFile(FileRoute, 1);

var JsonContent = JsonFile.ReadAll();
JsonContent = JSON.parse(JsonContent);
Watch.Log("Step2--------------------Get Json Data" + JsonContent, 3)

JsonFile.Close();

var JArray = [];
for (var i = 0; i < JsonContent.length; i++) {
    var jobject = JsonContent[i];
    // Watch.Log(jobject,3)
    JArray.push(jobject);
}
var pageLength = JArray.length;


Watch.Log('Step3--------------------Page length:' + pageLength, 3);
//ADODB Connection String
var ConnectionString = "Provider=SQLOLEDB;Data Source=localhost\\SQLEXPRESS;Initial Catalog=YunShin;Integrated Security=SSPI;";


for (var i = 0; i < pageLength; i++) {
    var P_Type = JArray[i].P_type;
    var Page = JArray[i].Page;
    Watch.Log('Step4--------------------Page Index:' + Page, 3);
    var FileName = Watch.GetVariable("FileID");

    var ID_Name = '';
    var ID_Name_next = '';
    var CSOD = '';
    var CustNumber = '';
    var SammonsNumber = '';
    var OrderNumber = '';
    var DeliveryNumber = '';
    var InvNumber = '';
    var SDate;
    var P3_F090 = false;
    switch (P_Type) {
        case "P1":
            DeliveryNumber = JArray[i].DeliveryNumber;
            ID_Name = DeliveryNumber;
            if (i + 1 < pageLength) {
                var DeliveryNumber_next = JArray[i + 1].DeliveryNumber;
                ID_Name_next = DeliveryNumber_next;
            }
            break;
        case "P2":
            CSOD = JArray[i].CSOD;
            CustNumber = JArray[i].CustNumber;
            SammonsNumber = JArray[i].SammonsNumber;
            OrderNumber = JArray[i].OrderNumber;
            DeliveryNumber = JArray[i].DeliveryNumber;
            InvNumber = JArray[i].InvNumber;
            SDate = JArray[i].Date;
            Watch.Log("JArray[i].IsGroup:" + JArray[i].IsGroup,3);
            P3_F090 = JArray[i].IsGroup == 'true' ? 1 : 0;
            Watch.Log("P3_F090:" + P3_F090,3);
            ID_Name = SDate + "_" + CSOD;
            if (i + 1 < pageLength) {
                var CSOD_next = JArray[i + 1].CSOD;
                var SDate_next = JArray[i + 1].Date;
                ID_Name_next = SDate_next + "_" + CSOD_next;
            }
            break;
        case "P3":
            CustNumber = JArray[i].CustNumber;
            SammonsNumber = JArray[i].SammonsNumber;
            ID_Name = CustNumber + "_" + SammonsNumber;
            if (i + 1 < pageLength) {
                var CustNumber_next = JArray[i + 1].CustNumber;
                var SammonsNumber_next = JArray[i + 1].SammonsNumber;
                ID_Name_next = CustNumber_next + "_" + SammonsNumber_next;
            }
            break;
        case "P4":
            CustNumber = JArray[i].CustNumber;
            OrderNumber = JArray[i].OrderNumber;
            DeliveryNumber = JArray[i].DeliveryNumber;
            ID_Name = CustNumber + "_" + OrderNumber + "_" + DeliveryNumber;
            if (i + 1 < pageLength) {
                var CustNumber_next = JArray[i + 1].CustNumber;
                var OrderNumber_next = JArray[i + 1].OrderNumber;
                var DeliveryNumber_next = JArray[i + 1].DeliveryNumber;
                ID_Name_next = CustNumber_next + "_" + OrderNumber_next + "_" + DeliveryNumber_next;
            }
            break;
        case "P5":
            CustNumber = JArray[i].CustNumber;
            SammonsNumber = JArray[i].SammonsNumber;
            DeliveryNumber = JArray[i].DeliveryNumber;
            ID_Name = CustNumber + "_" + SammonsNumber + "_" + DeliveryNumber;
            if (i + 1 < pageLength) {
                var CustNumber_next = JArray[i + 1].CustNumber;
                var SammonsNumber_next = JArray[i + 1].SammonsNumber;
                var DeliveryNumber_next = JArray[i + 1].DeliveryNumber;
                ID_Name_next = CustNumber_next + "_" + SammonsNumber_next + "_" + DeliveryNumber_next;
            }
            break;
        case "P6":
            CustNumber = JArray[i].CustNumber;
            SammonsNumber = JArray[i].SammonsNumber;
            DeliveryNumber = JArray[i].DeliveryNumber;
            ID_Name = CustNumber + "_" + SammonsNumber + "_" + DeliveryNumber;
            if (i + 1 < pageLength) {
                var CustNumber_next = JArray[i + 1].CustNumber;
                var SammonsNumber_next = JArray[i + 1].SammonsNumber;
                var DeliveryNumber_next = JArray[i + 1].DeliveryNumber;
                ID_Name_next = CustNumber_next + "_" + SammonsNumber_next + "_" + DeliveryNumber_next;
            }
            break;
        case "P7":
            InvNumber = JArray[i].InvNumber;
            ID_Name = InvNumber;
            if (i + 1 < pageLength) {
                var InvNumber_next = JArray[i + 1].InvNumber;
                ID_Name_next = InvNumber_next;
            }
            break;
    }
    Watch.Log('Step5--------------------Page type:' + P_Type, 3);
    //ADODB DB INIT
    var db = new Database();
    try {
        // DB executeQuery
        var SqlString = "SELECT COUNT(*) AS RecordCount FROM YunShin_Basic Where ID_Name = '" + ID_Name + "' and P_Type = '" + P_Type + "'" + " and Page = " + Page;
        var results = db.executeQuery(SqlString);
        Watch.Log("Step6--------------------db select YunShin_Basic data count:" + results[0].RecordCount, 3);
        if (results[0].RecordCount == 0) {
            var Insert_YunShin_Basic = {
                "ID_Name": ID_Name,
                "P_Type": P_Type,
                "FileName": FileName,
                "FileRoute": "C:\\Project\\YS\\out\\Backup",
                "Page": Page
            };
            db.insert("YunShin_Basic", Insert_YunShin_Basic);
            Watch.Log("Step6-1--------------------Insert_YunShin_Basic:" + Insert_YunShin_Basic, 3);
            if (P_Type == "P2") {
                Watch.Log("Step6-2--------------------Insert_YunShin_Basic:" + Insert_YunShin_Basic, 3);
                P2_InsertAndUpdatePrintSub(SDate, CustNumber, SammonsNumber, OrderNumber, DeliveryNumber, InvNumber, JArray[i].IsGroup);
                var WhereParams = [{name:'FileName',type:200,size:255,value:FileName}];
                var results_Query = db.executeSPQuery("YunShinPrint_OrderByCustNumber", true ,WhereParams);
                var resultsToJson = db.resultToJson(results_Query);
                Watch.Log(resultsToJson, 3);
                db.saveToFile(resultsToJson, 'C:\\Project\\YS\\out\\Step1\\' + s + '.json');
            }
        } else {
            var updateFileName = {
                "ID_Name": ID_Name,
                "FileName": FileName
            };
            var whereClause = "ID_Name='" + ID_Name + "' and P_Type = '" + P_Type + "'";
            db.update("YunShin_Basic", updateFileName, whereClause);
            Watch.Log("Step6-1--------------------Update_YunShin_Basic" + results[0].RecordCount, 3);

            if (P_Type == "P2") {
                Watch.Log("Step6-2--------------------Insert_YunShin_Basic:" + Insert_YunShin_Basic, 3);
                P2_InsertAndUpdatePrintSub(SDate, CustNumber, SammonsNumber, OrderNumber, DeliveryNumber, InvNumber, JArray[i].IsGroup);
                var WhereParams = [{name:'FileName',type:200,size:255,value:FileName}];
                var results_Query = db.executeSPQuery("YunShinPrint_OrderByCustNumber", true , WhereParams);
                var resultsToJson = db.resultToJson(results_Query);
                Watch.Log(resultsToJson, 3);
                db.saveToFile(resultsToJson, 'C:\\Project\\YS\\out\\Step1\\' + s + '.json');
            }
        }
    } catch (error) {
        Watch.Log("Log--------------------Error:" + error.message, 3);
    } finally {
        db.close();
    }
}



