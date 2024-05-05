using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Data.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CourseInstructor_Instrutors_InstructorsId",
                table: "CourseInstructor");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Instrutors",
                table: "Instrutors");

            migrationBuilder.RenameTable(
                name: "Instrutors",
                newName: "Instructors");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Instructors",
                table: "Instructors",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CourseInstructor_Instructors_InstructorsId",
                table: "CourseInstructor",
                column: "InstructorsId",
                principalTable: "Instructors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CourseInstructor_Instructors_InstructorsId",
                table: "CourseInstructor");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Instructors",
                table: "Instructors");

            migrationBuilder.RenameTable(
                name: "Instructors",
                newName: "Instrutors");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Instrutors",
                table: "Instrutors",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CourseInstructor_Instrutors_InstructorsId",
                table: "CourseInstructor",
                column: "InstructorsId",
                principalTable: "Instrutors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
