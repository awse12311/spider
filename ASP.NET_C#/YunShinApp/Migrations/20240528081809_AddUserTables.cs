using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace YunShinApp.Migrations
{
    /// <inheritdoc />
    public partial class AddUserTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    DateC = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateM = table.Column<DateTime>(type: "datetime2", nullable: false),
                    BatchID = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "YunShin_Basics",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ID_Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    P_Type = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    FileName = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    FileRoute = table.Column<string>(type: "nvarchar(400)", maxLength: 400, nullable: false),
                    Page = table.Column<int>(type: "int", nullable: false),
                    DateC = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateM = table.Column<DateTime>(type: "datetime2", nullable: false),
                    BatchID = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_YunShin_Basics", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "YunShin_Prints",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CustNumber = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    SammonsNumber = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    OrderNumber = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    DeliveryNumber = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    InvNumber = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    P3_F090 = table.Column<bool>(type: "bit", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsPrint = table.Column<bool>(type: "bit", nullable: false),
                    DateC = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateM = table.Column<DateTime>(type: "datetime2", nullable: false),
                    BatchID = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_YunShin_Prints", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LoginLogs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    LoginTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IPAddress = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    UserId1 = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LoginLogs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LoginLogs_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_LoginLogs_Users_UserId1",
                        column: x => x.UserId1,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "UserDetails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    FullName = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Phone = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Address = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    DateC = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateM = table.Column<DateTime>(type: "datetime2", nullable: false),
                    BatchID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId1 = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserDetails_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserDetails_Users_UserId1",
                        column: x => x.UserId1,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "UserPasses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    PasswordHash = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    DateC = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateM = table.Column<DateTime>(type: "datetime2", nullable: false),
                    BatchID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId1 = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserPasses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserPasses_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserPasses_Users_UserId1",
                        column: x => x.UserId1,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "YunShin_PrintSubs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    P_Type = table.Column<string>(type: "nvarchar(5)", maxLength: 5, nullable: false),
                    FileName = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    FileRoute = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    ID_Name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    StartPage = table.Column<int>(type: "int", nullable: false),
                    EndPage = table.Column<int>(type: "int", nullable: false),
                    DateC = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateM = table.Column<DateTime>(type: "datetime2", nullable: false),
                    BatchID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Print_Id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_YunShin_PrintSubs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_YunShin_PrintSubs_YunShin_Prints_Print_Id",
                        column: x => x.Print_Id,
                        principalTable: "YunShin_Prints",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_LoginLogs_UserId",
                table: "LoginLogs",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_LoginLogs_UserId1",
                table: "LoginLogs",
                column: "UserId1");

            migrationBuilder.CreateIndex(
                name: "IX_UserDetails_UserId",
                table: "UserDetails",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserDetails_UserId1",
                table: "UserDetails",
                column: "UserId1",
                unique: true,
                filter: "[UserId1] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_UserPasses_UserId",
                table: "UserPasses",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserPasses_UserId1",
                table: "UserPasses",
                column: "UserId1");

            migrationBuilder.CreateIndex(
                name: "IX_YunShin_PrintSubs_Print_Id",
                table: "YunShin_PrintSubs",
                column: "Print_Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LoginLogs");

            migrationBuilder.DropTable(
                name: "UserDetails");

            migrationBuilder.DropTable(
                name: "UserPasses");

            migrationBuilder.DropTable(
                name: "YunShin_Basics");

            migrationBuilder.DropTable(
                name: "YunShin_PrintSubs");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "YunShin_Prints");
        }
    }
}
