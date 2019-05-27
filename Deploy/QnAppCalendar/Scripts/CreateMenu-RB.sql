DECLARE @ExtRef NVARCHAR(50)
SET @ExtRef = 'PqCorkBoard'

	DECLARE @GroupCustomPageId INT

	DECLARE db_cursor CURSOR
	FOR
	SELECT gcp.groupcustompageid
	FROM qf.custommenu AS cm
	JOIN qf.groupcustompage AS gcp ON cm.custommenuid = gcp.custommenuid
	WHERE extref = @ExtRef

	-- Remove Custom Menu From Group 
	OPEN db_cursor;

	FETCH NEXT
	FROM db_cursor
	INTO @GroupCustomPageId

	WHILE @@FETCH_STATUS = 0
	BEGIN
		EXEC qf.Groupremovecustompage @GroupCustomPageId = @GroupCustomPageId
			,@InvokedBy = N'admin'
			,@HostIP = NULL

		FETCH NEXT
		FROM db_cursor
		INTO @GroupCustomPageId
	END

	CLOSE db_cursor;

	DEALLOCATE db_cursor;

	DELETE qf.custommenu
	WHERE extref = @ExtRef


delete from qf.CustomPageForm where PageId IN (select CustomPageId FROm qf.CustomPage where ExtRef=@ExtRef)
delete from  qf.CustomPage where ExtRef= @ExtRef
delete from qf.CustomPageCSS where ExtRef= @ExtRef