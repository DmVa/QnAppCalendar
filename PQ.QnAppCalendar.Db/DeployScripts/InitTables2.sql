IF schema_id('pq') IS NULL
BEGIN
    EXECUTE('CREATE SCHEMA [pq]')
END
IF (NOT EXISTS (SELECT *   FROM INFORMATION_SCHEMA.TABLES     WHERE TABLE_SCHEMA = 'pq'   AND  TABLE_NAME = 'CalendarStage'))
BEGIN
	
CREATE TABLE [pq].[CalendarStage] (
    [Id] [int] NOT NULL IDENTITY,
    [SortOrder] [int] NOT NULL DEFAULT 0,
    [Name] [nvarchar](250),
    [StageType] [int] NOT NULL,
    CONSTRAINT [PK_pq.CalendarStage] PRIMARY KEY ([Id])
)
	
END
IF (NOT EXISTS (SELECT *   FROM INFORMATION_SCHEMA.TABLES     WHERE TABLE_SCHEMA = 'pq'   AND  TABLE_NAME = 'CalendarStageService'))
BEGIN

CREATE TABLE [pq].[CalendarStageService] (
    [Id] [int] NOT NULL IDENTITY,
    [CalendarStageId] [int] NOT NULL,
    [ServiceId] [int] NOT NULL,
    CONSTRAINT [PK_pq.CalendarStageService] PRIMARY KEY ([Id])
)
CREATE INDEX [IX_CalendarStageId] ON [pq].[CalendarStageService]([CalendarStageId])
ALTER TABLE [pq].[CalendarStageService] ADD CONSTRAINT [FK_pq.CalendarStageService_pq.CalendarStage_CalendarStageId] FOREIGN KEY ([CalendarStageId]) REFERENCES [pq].[CalendarStage] ([Id]) ON DELETE CASCADE
END

