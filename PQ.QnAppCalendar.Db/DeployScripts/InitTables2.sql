IF schema_id('pq') IS NULL
    EXECUTE('CREATE SCHEMA [pq]')
CREATE TABLE [pq].[CalendarStage] (
    [Id] [int] NOT NULL IDENTITY,
    [CalendarStageConfigId] [int] NOT NULL,
    [SortOrder] [int] NOT NULL DEFAULT 0,
    [Name] [nvarchar](250),
    [StageType] [int] NOT NULL,
    [IsServiceDefault] [int] NOT NULL DEFAULT 0,
    CONSTRAINT [PK_pq.CalendarStage] PRIMARY KEY ([Id])
)
CREATE INDEX [IX_CalendarStageConfigId] ON [pq].[CalendarStage]([CalendarStageConfigId])
CREATE TABLE [pq].[CalendarStageConfig] (
    [Id] [int] NOT NULL IDENTITY,
    [UnitId] [int] NOT NULL,
    CONSTRAINT [PK_pq.CalendarStageConfig] PRIMARY KEY ([Id])
)
CREATE TABLE [pq].[CalendarStageService] (
    [Id] [int] NOT NULL IDENTITY,
    [CalendarStageId] [int] NOT NULL,
    [ServiceId] [int] NOT NULL,
    CONSTRAINT [PK_pq.CalendarStageService] PRIMARY KEY ([Id])
)
CREATE INDEX [IX_CalendarStageId] ON [pq].[CalendarStageService]([CalendarStageId])
ALTER TABLE [pq].[CalendarStage] ADD CONSTRAINT [FK_pq.CalendarStage_pq.CalendarStageConfig_CalendarStageConfigId] FOREIGN KEY ([CalendarStageConfigId]) REFERENCES [pq].[CalendarStageConfig] ([Id]) ON DELETE CASCADE
ALTER TABLE [pq].[CalendarStageService] ADD CONSTRAINT [FK_pq.CalendarStageService_pq.CalendarStage_CalendarStageId] FOREIGN KEY ([CalendarStageId]) REFERENCES [pq].[CalendarStage] ([Id]) ON DELETE CASCADE
CREATE TABLE [dbo].[__MigrationHistory] (
    [MigrationId] [nvarchar](150) NOT NULL,
    [ContextKey] [nvarchar](300) NOT NULL,
    [Model] [varbinary](max) NOT NULL,
    [ProductVersion] [nvarchar](32) NOT NULL,
    CONSTRAINT [PK_dbo.__MigrationHistory] PRIMARY KEY ([MigrationId], [ContextKey])
)

