UPDATE qf.ReceptionPointPageItem
SET ServiceFilterId = NULL WHERE 
ServiceFilterId IN (SELECT ServiceFilterId FROM qf.ServiceFilter WHERE ExtRef = 'PQ.Calendar.UnitServices')

DELETE FROM qf.ServiceFilter WHERE ExtRef = 'PQ.Calendar.UnitServices'

IF EXISTS (SELECT *   FROM INFORMATION_SCHEMA.TABLES     WHERE TABLE_SCHEMA = 'pq'   AND  TABLE_NAME = 'CalendarStageService')
BEGIN
	DROP TABLE pq.CalendarStageService
END
IF EXISTS (SELECT *   FROM INFORMATION_SCHEMA.TABLES     WHERE TABLE_SCHEMA = 'pq'   AND  TABLE_NAME = 'CalendarStage')
BEGIN
	DROP TABLE pq.CalendarStage
END
IF EXISTS (SELECT *   FROM INFORMATION_SCHEMA.TABLES     WHERE TABLE_SCHEMA = 'pq'   AND  TABLE_NAME = 'CalendarStageConfig')
BEGIN
	DROP TABLE pq.CalendarStageConfig
END

IF schema_id('pq') IS NOT NULL
BEGIN
    EXECUTE('DROP SCHEMA [pq]')
END

