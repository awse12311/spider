
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
    Watch.Log(message, 3);
};

//ADODB Funtion Implementation
Database.prototype.executeQuery = function (query) {
    try {
        var rs = new ActiveXObject("ADODB.Recordset");
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
            values.push("'" + data[key] + "'");
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
            set.push(key + "='" + data[key] + "'");
        }
        var query = "UPDATE " + table + " SET " + set.join(", ") + " WHERE " + where + ";";
        this.executeNonQuery(query);
    } catch (e) {
        Watch.Log("Db--------------------Error updating data: " + e.message + " Data: " + JSON.stringify(data) + " Where: " + where, 3);
    }
};

Database.prototype.insertAndGetId = function (table, data) {
    try {
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
    } catch (e) {
        Watch.Log(e.message, 3);
        return null;
    }
};

Database.prototype.updateAndGetId = function (table, data, where) {
    try {
        // 執行更新操作
        this.update(table, data, where);
        // 獲取剛剛更新的資料的ID，假設identifier是唯一標識符
        var idQuery = "SELECT id FROM " + table + " WHERE " + where + ";";
        var result = this.executeQuery(idQuery);
        if (result.length > 0) {
            return result[0].id;
        } else {
            Watch.Log("can not get updated data", 3);
            return null;
        }
    } catch (e) {
        Watch.Log("update data and get id error" + e.message, 3);
        return null;
    }
};

Database.prototype.CheckAndInsert = function (table, data, checkWhere) {
    try {
        var SqlString = "SELECT COUNT(*) AS RecordCount FROM " + table + " Where " + checkWhere;
        var results = db.executeQuery(SqlString);
        if(results[0].RecordCount == 0){
            this.insert(table, data);
            // 獲取新插入數據的ID
            var idQuery = "SELECT SCOPE_IDENTITY() AS NewId";
            var result = this.executeQuery(idQuery);
            if (result.length > 0) {
                return result[0].NewId;
            } else {
                Watch.Log("can not get newid", 3);
                return null;
            }
        }else{
            return 0;
        }
        
    } catch (e) {
        Watch.Log("Error inserting data: " + e + " Data: " + JSON.stringify(data), 3);
    }
};

function P2_InsertAndUpdatePrintSub(date, CustNumber, SammonsNumber, OrderNumber, DeliveryNumber, InvNumber, P3_F090) {
    var CheckSqlString = "SELECT COUNT(*) AS RecordCount FROM YunShin_Print Where CustNumber = '" + CustNumber + "' and SammonsNumber = '" + SammonsNumber + "' " + " and OrderNumber = '" + OrderNumber + "' and DeliveryNumber = '" + DeliveryNumber + "' and date = '" + date + "';";
    var results = db.executeQuery(CheckSqlString);
    Watch.Log('YunShin_Print Count :' + results[0].RecordCount, 3);
    var GetPrintID;

    if (results[0].RecordCount == 0) {
        var Insert_YunShin_Print = {
            "CustNumber": CustNumber,
            "SammonsNumber": SammonsNumber,
            "OrderNumber": OrderNumber,
            "DeliveryNumber": DeliveryNumber,
            "InvNumber": InvNumber,
            "P3_F090": P3_F090,
            "date": date,
            "isPrint": false
        };
        GetPrintID = db.insertAndGetId("YunShin_Print", Insert_YunShin_Print);
        Watch.Log('insertAndGetId:' + GetPrintID, 3);
        
    } else {
        var Update_YunShin_Print = {
            "P3_F090": P3_F090,
            "isPrint": false
        };
        var whereClause = " CustNumber = '" + CustNumber + "' and SammonsNumber = '" + SammonsNumber + "' and OrderNumber = '" + OrderNumber + "'  and DeliveryNumber = '" + DeliveryNumber + "'";
        GetPrintID = db.updateAndGetId("YunShin_Print", Update_YunShin_Print, whereClause);
        Watch.Log('updateAndGetId:' + GetPrintID, 3);
    }

    //set select p_type name
    var P1 = DeliveryNumber;
    var P2 = date + "_" + CustNumber + "_" + SammonsNumber + "_" + OrderNumber + "_" + DeliveryNumber;
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
    Watch.Log('SqlString Select For P2:' + SqlStringSelectForP2, 3);
    //YunShin_Basic Select
    var results_P2 = db.executeQuery(SqlStringSelectForP2);
    if (results_P2.length > 0) {
        Watch.Log('results_P2:' + results_P2.length, 3);
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
            var subid = db.CheckAndInsert("YunShin_PrintSub",Insert_YunShin_PrintSub,where);
            if(subid == 0){
                Watch.Log('!!!!!!!!!!!!!!!YunShin_PrintSub is inserted:' + subid, 3);
                var Update_YunShin_PrintSub = {
                    "FileName": results_P2[j].FileName,
                    "StartPage": results_P2[j].StartPage,
                    "EndPage": results_P2[j].EndPage,
                    "Print_id": GetPrintID
                };
                var where = "P_type = '" + results_P2[j].P_type + "' and ID_Name = '" + results_P2[j].ID_Name + "'";
                var subid = db.updateAndGetId("YunShin_PrintSub", Update_YunShin_PrintSub, where);
                Watch.Log('!!!!!!!!!!!!!!!----YunShin_PrintSub Updated id:' + subid, 3);
            }else{
                Watch.Log('~~~~~~~~~~~~~~~YunShin_PrintSub insert id:' + subid, 3);
            }
        }
    }
}


//Run Process

var FileRoute = Watch.GetMetadataFilename().replace('.dat.meta', '') + '.json';
Watch.Log(FileRoute, 3)
var fso = new ActiveXObject("Scripting.FileSystemObject");

var JsonFile = fso.OpenTextFile(FileRoute, 1);

var JsonContent = JsonFile.ReadAll();
JsonContent = JSON.parse(JsonContent);
Watch.Log(JsonContent, 3)

JsonFile.Close();

var JArray = [];
for (var i = 0; i < JsonContent.length; i++) {
    var jobject = JsonContent[i];
    // Watch.Log(jobject,3)
    JArray.push(jobject);
}
var pageLength = JArray.length;


Watch.Log('matedata pageLength:' + pageLength, 3);
//ADODB Connection String
var ConnectionString = "Provider=SQLOLEDB;Data Source=localhost\\SQLEXPRESS;Initial Catalog=YunShin;Integrated Security=SSPI;";


for (var i = 0; i < pageLength; i++) {

    var P_Type = JArray[i].P_type;
    var Page = JArray[i].Page;
    Watch.Log('matedata Page Index:' + Page, 3);
    var FileName = Watch.GetVariable("FileID");

    var ID_Name = '';
    var ID_Name_next = '';
    var CSOD = '';
    var CustNumber = '';
    var SammonsNumber = '';
    var OrderNumber = '';
    var DeliveryNumber = '';
    var InvNumber = '';
    var date;
    var P3_F090;

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
            date = JArray[i].Date;
            Watch.Log('---------------------------------------------date get' + date, 3);
            P3_F090 = JArray[i].IsGroup;
            ID_Name = date + "_" + CSOD;
            if (i + 1 < pageLength) {
                var CSOD_next = JArray[i + 1].CSOD;
                var date_next = JArray[i + 1].date;
                ID_Name_next = date_next + "_" + CSOD_next;
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
    //ADODB DB INIT
    var db = new Database();
    try {
        // DB executeQuery

        var SqlString = "SELECT COUNT(*) AS RecordCount FROM YunShin_Basic Where ID_Name = '" + ID_Name + "' and P_Type = '" + P_Type + "'" + " and Page = " + Page + ";";
        var results = db.executeQuery(SqlString);
        Watch.Log(results[0].RecordCount, 3);
        if (results[0].RecordCount == 0) {
            var Insert_YunShin_Basic = {
                "ID_Name": ID_Name,
                "P_Type": P_Type,
                "FileName": FileName,
                "FileRoute": "C:\\Project\\YS\\out\\Backup",
                "Page": Page
            };
            db.insert("YunShin_Basic", Insert_YunShin_Basic);
            if (P_Type == "P2") {
                P2_InsertAndUpdatePrintSub(date, CustNumber, SammonsNumber, OrderNumber, DeliveryNumber, InvNumber, P3_F090);
            }
        } else {
            var updateFileName = {
                "ID_Name": ID_Name,
                "FileName": FileName
            };
            var whereClause = "ID_Name='" + ID_Name + "' and P_Type = '" + P_Type + "'";
            db.update("YunShin_Basic", updateFileName, whereClause);
            if (P_Type == "P2") {
                P2_InsertAndUpdatePrintSub(date, CustNumber, SammonsNumber, OrderNumber, DeliveryNumber, InvNumber, P3_F090);
            }
        }

    } catch (error) {
        Watch.Log("Error:" + error.message, 3);
    } finally {
        db.close();
    }


}



