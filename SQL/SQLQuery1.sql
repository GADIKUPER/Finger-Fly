USE [site06]
GO

--DROP TABLE TBUsers
CREATE TABLE TBUsers(
	[UserID] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[FirstName] [nvarchar](30) NULL,
	[LastName] [nvarchar](30) NULL,
	[Email] [nvarchar](50) NOT NULL,
	[PasswordHash] [binary](64) NOT NULL,
	[Salt] [uniqueidentifier] NULL,
	[PictureUri] [nvarchar](max) NULL,
	[Score] [int] NOT NULL DEFAULT 0)
GO

--DROP TABLE TBAdministrator
CREATE TABLE TBAdministrator(
	[AdminID] [int] IDENTITY(1,1) NOT NULL,
	[IdentityID] [nvarchar](9) NOT NULL,
	[Email] [nvarchar](50) NOT NULL,
	[Name] [nvarchar](30) NOT NULL,
	[PasswordHash] [binary](64) NOT NULL,
	[Salt] [uniqueidentifier] NULL,
	[PictureUri] [nvarchar](max) NOT NULL)
GO

--DROP TABLE TBResetPasswordRequests
CREATE TABLE TBResetPasswordRequests(
	[ID] uniqueidentifier PRIMARY KEY,
	[UserID] [int] FOREIGN KEY REFERENCES TBUsers([UserID]),
	[ResetRequesteDateTime] [datetime] NULL)
GO
DECLARE @salt UNIQUEIDENTIFIER=NEWID()
INSERT INTO TBUsers(FirstName,LastName,Email,PasswordHash,Salt)
values ('gadi','kupersmit','gadikuper@gmail.com',111111,@salt)
go
--------------------- GetUsers ------------------------------------------
--drop proc [dbo].[GetUsers]
Create PROC GetUsers
AS
SELECT * FROM TBUser
go
EXEC GetUsers
GO
--------------------- LOGIN ------------------------------------------
Create PROC Login (
	@Email nvarchar(50),
	@Password nvarchar(50)
	)
AS
	BEGIN
	DECLARE @UserID int
	IF EXISTS (SELECT TOP 1 UserID FROM TBUser WHERE Email = @Email)
		BEGIN
		SET @UserID = (SELECT UserID FROM TBUser WHERE Email = @Email AND PasswordHash =HASHBYTES('SHA2_512',@Password+CAST(Salt AS NVARCHAR(36))))
		IF(@UserID IS NULL)
			SELECT 0 AS UserID
		ELSE
			SELECT UserID,Email FROM TBUser WHERE UserID = @UserID
		END
	ELSE
		SELECT -1 AS UserID
	END
GO
--------------------- REGISTER ------------------------------------------
--DROP PROC regisrerNewAccount
Alter proc regisrerNewAccount
    @FirstName nvarchar(50),
	@LastName nvarchar(50),
	@Email nvarchar(50),
	@Password nvarchar(50),
	@PictureUri nvarchar(max),
	@UserId int output
As
	DECLARE @salt UNIQUEIDENTIFIER=NEWID() -- יצירת ID אוטומטי --
	IF not exists(SELECT Email FROM TBUsers WHERE Email = @Email) -- תנאי כאשר הוא ריק הוא יצור חדש--
		BEGIN
			-- הנתונים ושמירה  --
			INSERT INTO TBUsers(FirstName,LastName,Email,PasswordHash,Salt,PictureUri)
			-- שמירת הנתונים והצגתם + הסתרת הסיסמה בעזרת HASHBYTES --
			VALUES(@FirstName,@LastName,@Email,HASHBYTES('SHA2_512',@Password+CAST(@salt AS NVARCHAR(36))),@salt,@PictureUri)
	  	    set @UserId = @@IDENTITY
		End
	Else
		Begin
			set @UserId = -1
		End
Go

Declare @id int
Exec regisrerNewAccount 'tal','griman','tal@gmail.com',11010000,null,@id out
Select @id as id
Go

--------------------- [ResetPassword] ------------------------------------------

Create PROC ResetPassword (
	@uid uniqueidentifier,
	@NewPassword nvarchar(50)
	)
AS
	BEGIN 
		DECLARE @UserID int
		DECLARE @salt UNIQUEIDENTIFIER=NEWID()
		
		SELECT @UserID = UserID
		FROM TBResetPasswordRequests
		WHERE @uid = ID

		IF(@UserID IS NOT NULL)
			BEGIN
				--if uid is exists
				UPDATE TBUsers
				SET PasswordHash = HASHBYTES('SHA2_512',@NewPassword+CAST(@salt AS NVARCHAR(36))),Salt = @salt
				WHERE UserID = @UserID

				DELETE FROM TBResetPasswordRequests
				WHERE ID = @uid

				SELECT 1 AS ReturnCode
			END
		ELSE
			--if uid is not exists
			SELECT 0 AS ReturnCode
	END
GO
--------------------- [ResetPasswordRequest] ------------------------------------------

CREATE PROC ResetPasswordRequest (
	@Email nvarchar(50)
	)
AS
	BEGIN
		DECLARE @UserID int

		SELECT @UserID = UserID FROM TBUsers WHERE @Email = Email
		
		IF(@UserID IS NOT NULL) -- עם המתשמש קיים היכנס --
			BEGIN 
				-- שמירת סיסמה חדשה --
				DECLARE @GUID uniqueidentifier
				SET @GUID = NEWID()

				-- ביצוע שינוי סיסמה ושמירה בטבלה --
				INSERT INTO TBResetPasswordRequests(ID, UserID,ResetRequesteDateTime)
				VALUES(@GUID,@UserID,GETDATE())
				-- הצגת המשתמש על ידי Email --
				SELECT 1 AS ReturnCode , @GUID as UniqueID , @Email as Email
			END
		ELSE -- אם לא קיים --
			BEGIN
				-- יחזיר 0 ולא יהיה ניתן לשנות --
				SELECT 0 AS ReturnCode , NULL as UniqueID , NULL as Email
			END
	END

GO

---------------------------------- Edit Profile ---------------------------
CREATE proc EditProfile
    @FirstName nvarchar(50),
	@LastName nvarchar(50),
	@PictureUri nvarchar(max)
	AS
			-- הנתונים ושמירה  --
			Update [site06].[TBUsers] 
		set FirstName = @FirstName,LastName=@LastName,PictureUri=@PictureUri WHERE UserID = @UserID
Go
------------------------- Score --------------------------------------------
Create Proc UpdateScore
@UserID int,
@Score int

as
	Update [site06].[TBUsers] 
		set Score = @Score WHERE UserID = @UserID
 go
