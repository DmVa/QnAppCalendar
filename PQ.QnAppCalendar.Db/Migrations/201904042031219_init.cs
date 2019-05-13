namespace PQ.QnAppCalendar.Db.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class init : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "pq.CalendarStage",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        CalendarStageConfigId = c.Int(nullable: false),
                        SortOrder = c.Int(nullable: false, defaultValue: 0),
                        Name = c.String(maxLength: 250),
                        StageType = c.Int(nullable: false),
                        IsServiceDefault = c.Int(nullable: false, defaultValue: 0),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("pq.CalendarStageConfig", t => t.CalendarStageConfigId, cascadeDelete: true)
                .Index(t => t.CalendarStageConfigId);
            
            CreateTable(
                "pq.CalendarStageConfig",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UnitId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "pq.CalendarStageService",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        CalendarStageId = c.Int(nullable: false),
                        ServiceId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("pq.CalendarStage", t => t.CalendarStageId, cascadeDelete: true)
                .Index(t => t.CalendarStageId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("pq.CalendarStageService", "CalendarStageId", "pq.CalendarStage");
            DropForeignKey("pq.CalendarStage", "CalendarStageConfigId", "pq.CalendarStageConfig");
            DropIndex("pq.CalendarStageService", new[] { "CalendarStageId" });
            DropIndex("pq.CalendarStage", new[] { "CalendarStageConfigId" });
            DropTable("pq.CalendarStageService");
            DropTable("pq.CalendarStageConfig");
            DropTable("pq.CalendarStage");
        }
    }
}
