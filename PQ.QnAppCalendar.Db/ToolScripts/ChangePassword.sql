UPDATE qf.Users
		SET [Password] = HashBytes ('MD5', convert(nvarchar(25),'1234')),
			LastPasswordChangedDate = GETDATE (),
			FailedPasswordAttemptCount = 0,
			FailedPasswordAttemptWindowStart = NULL,
			IsLockedOut = 0
		WHERE UserName = 'admin'