using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Data.Migrations
{
    /// <inheritdoc />
    public partial class Initial_Create : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ApplicationUserLesson_AspNetUsers_ApplicationUserId",
                table: "ApplicationUserLesson");

            migrationBuilder.DropForeignKey(
                name: "FK_ApplicationUserLesson_Lessons_LessonId",
                table: "ApplicationUserLesson");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ApplicationUserLesson",
                table: "ApplicationUserLesson");

            migrationBuilder.RenameTable(
                name: "ApplicationUserLesson",
                newName: "ApplicationUserLessons");

            migrationBuilder.RenameIndex(
                name: "IX_ApplicationUserLesson_LessonId",
                table: "ApplicationUserLessons",
                newName: "IX_ApplicationUserLessons_LessonId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ApplicationUserLessons",
                table: "ApplicationUserLessons",
                columns: new[] { "ApplicationUserId", "LessonId" });

            migrationBuilder.AddForeignKey(
                name: "FK_ApplicationUserLessons_AspNetUsers_ApplicationUserId",
                table: "ApplicationUserLessons",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ApplicationUserLessons_Lessons_LessonId",
                table: "ApplicationUserLessons",
                column: "LessonId",
                principalTable: "Lessons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ApplicationUserLessons_AspNetUsers_ApplicationUserId",
                table: "ApplicationUserLessons");

            migrationBuilder.DropForeignKey(
                name: "FK_ApplicationUserLessons_Lessons_LessonId",
                table: "ApplicationUserLessons");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ApplicationUserLessons",
                table: "ApplicationUserLessons");

            migrationBuilder.RenameTable(
                name: "ApplicationUserLessons",
                newName: "ApplicationUserLesson");

            migrationBuilder.RenameIndex(
                name: "IX_ApplicationUserLessons_LessonId",
                table: "ApplicationUserLesson",
                newName: "IX_ApplicationUserLesson_LessonId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ApplicationUserLesson",
                table: "ApplicationUserLesson",
                columns: new[] { "ApplicationUserId", "LessonId" });

            migrationBuilder.AddForeignKey(
                name: "FK_ApplicationUserLesson_AspNetUsers_ApplicationUserId",
                table: "ApplicationUserLesson",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ApplicationUserLesson_Lessons_LessonId",
                table: "ApplicationUserLesson",
                column: "LessonId",
                principalTable: "Lessons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
