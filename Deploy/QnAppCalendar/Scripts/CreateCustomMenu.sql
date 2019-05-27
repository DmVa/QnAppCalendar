-- =============================================
-- Author:     PreciseQ
-- =============================================
DECLARE @CustomPageIdValue NVARCHAR(50)
	,@GroupIdValue NVARCHAR(50)
	,@CustomMenuId INT
	,@GroupCustomPageId INT
	,@CustomMenuAttached INT

DECLARE @ExtRef NVARCHAR(50)
SET @ExtRef = 'PqCorkBoard'


SELECT @CustomPageIdValue = T.c.value('@Value', 'NVARCHAR(50)')
FROM @Parameters.nodes('/Parameters/Parameter') T(c)
WHERE T.c.value('@Name', 'NVARCHAR(250)') = '@CustomPageId'

SELECT @GroupIdValue = T.c.value('@Value', 'NVARCHAR(50)')
FROM @Parameters.nodes('/Parameters/Parameter') T(c)
WHERE T.c.value('@Name', 'NVARCHAR(250)') = '@GroupId'

SELECT @CustomMenuAttached=count(*)
FROM qf.GroupCustomPage gcp
JOIN qf.CustomMenu cm
ON gcp.CustomMenuId =cm.CustomMenuId
WHERE gcp.GroupId= @GroupIdValue and 
cm.ExtRef=@ExtRef

IF @CustomMenuAttached = 0 
BEGIN
-- Create a New Custom Menu
EXEC qf.CustomMenuSave @CustomMenuId = @CustomMenuId OUTPUT
	,@CustomMenuName = N'QappCreator'
	,@Description = NULL
	,@ExtRef = N'QappCreator'
	,@IsActive = 1
	,@Title = N'Cork Board'
	,@Icon = N'custom_menu'
	,@InvokedBy = N'admin'
	,@HostIP = NULL

SET @CustomMenuId = @CustomMenuId

-- Add Custom Page to Group
EXEC qf.GroupSaveCustomPage @GroupCustomPageId = @GroupCustomPageId OUTPUT
	,@GroupId = @GroupIdValue
	,@PageId = @CustomPageIdValue
	,@CustomMenuId = @CustomMenuId
	,@InvokedBy = N'admin'
	,@HostIP = NULL
END