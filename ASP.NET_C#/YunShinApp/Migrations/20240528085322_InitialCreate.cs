using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace YunShinApp.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LoginLogs_Users_UserId1",
                table: "LoginLogs");

            migrationBuilder.DropForeignKey(
                name: "FK_UserDetails_Users_UserId1",
                table: "UserDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_UserPasses_Users_UserId1",
                table: "UserPasses");

            migrationBuilder.DropIndex(
                name: "IX_UserPasses_UserId1",
                table: "UserPasses");

            migrationBuilder.DropIndex(
                name: "IX_UserDetails_UserId",
                table: "UserDetails");

            migrationBuilder.DropIndex(
                name: "IX_UserDetails_UserId1",
                table: "UserDetails");

            migrationBuilder.DropIndex(
                name: "IX_LoginLogs_UserId1",
                table: "LoginLogs");

            migrationBuilder.DropColumn(
                name: "UserId1",
                table: "UserPasses");

            migrationBuilder.DropColumn(
                name: "UserId1",
                table: "UserDetails");

            migrationBuilder.DropColumn(
                name: "UserId1",
                table: "LoginLogs");

            migrationBuilder.CreateIndex(
                name: "IX_UserDetails_UserId",
                table: "UserDetails",
                column: "UserId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_UserDetails_UserId",
                table: "UserDetails");

            migrationBuilder.AddColumn<int>(
                name: "UserId1",
                table: "UserPasses",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserId1",
                table: "UserDetails",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserId1",
                table: "LoginLogs",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserPasses_UserId1",
                table: "UserPasses",
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
                name: "IX_LoginLogs_UserId1",
                table: "LoginLogs",
                column: "UserId1");

            migrationBuilder.AddForeignKey(
                name: "FK_LoginLogs_Users_UserId1",
                table: "LoginLogs",
                column: "UserId1",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UserDetails_Users_UserId1",
                table: "UserDetails",
                column: "UserId1",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UserPasses_Users_UserId1",
                table: "UserPasses",
                column: "UserId1",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
