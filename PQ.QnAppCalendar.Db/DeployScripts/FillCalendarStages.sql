IF NOT EXISTS (SELECT Id FROM pq.CalendarStage WHERE StageType =0)
INSERT INTO [pq].[CalendarStage]  ([SortOrder],[Name],[StageType])  VALUES  (0,'None', 0)

IF NOT EXISTS (SELECT Id FROM pq.CalendarStage WHERE StageType =1)
INSERT INTO [pq].[CalendarStage]  ([SortOrder],[Name],[StageType])  VALUES  (1,'Expected', 1)

IF NOT EXISTS (SELECT Id FROM pq.CalendarStage WHERE StageType =2)
INSERT INTO [pq].[CalendarStage]  ([SortOrder],[Name],[StageType])  VALUES  (2,'Waiting', 2)

IF NOT EXISTS (SELECT Id FROM pq.CalendarStage WHERE StageType =3)
INSERT INTO [pq].[CalendarStage]  ([SortOrder],[Name],[StageType], [IsServiceDefault])  VALUES  (3,'In Service', 3, 1)

IF NOT EXISTS (SELECT Id FROM pq.CalendarStage WHERE StageType =4)
INSERT INTO [pq].[CalendarStage]  ([SortOrder],[Name],[StageType])  VALUES  (4,'Completed', 4)

IF NOT EXISTS (SELECT Id FROM pq.CalendarStage WHERE StageType =5)
INSERT INTO [pq].[CalendarStage]  ([SortOrder],[Name],[StageType])  VALUES  (5,'Waiting for Customer Action', 5)

INSERT INTO pq.CalendarStageService(ServiceId, CalendarStageId)          
SELECT ServiceId, (SELECT TOP 1 ID FROM pq.[CalendarStage] WHERE StageType =3 AND IsDefault = 1) from qf.Service          
WHERE ServiceId NOT IN (Select ServiceId FROM pq.CalendarStageService)