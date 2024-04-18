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
            migrationBuilder.DropTable(
                name: "CareerRoadmap");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CareerRoadmap",
                columns: table => new
                {
                    CareersId = table.Column<int>(type: "int", nullable: false),
                    RoadmapsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CareerRoadmap", x => new { x.CareersId, x.RoadmapsId });
                    table.ForeignKey(
                        name: "FK_CareerRoadmap_Careers_CareersId",
                        column: x => x.CareersId,
                        principalTable: "Careers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CareerRoadmap_Roadmaps_RoadmapsId",
                        column: x => x.RoadmapsId,
                        principalTable: "Roadmaps",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CareerRoadmap_RoadmapsId",
                table: "CareerRoadmap",
                column: "RoadmapsId");
        }
    }
}
