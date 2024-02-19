-- ================================================
-- Template generated from Template Explorer using:
-- Create Trigger (New Menu).SQL
--
-- Use the Specify Values for Template Parameters 
-- command (Ctrl-Shift-M) to fill in the parameter 
-- values below.
--
-- See additional Create Trigger templates for more
-- examples of different Trigger statements.
--
-- This block of comments will not be included in
-- the definition of the function.
-- ================================================
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,Miguel De Jesus Carcamo Torres>
-- Create date: <Create Date, 12/28/2023>
-- Description:	<Description, Guarda un registro de las transacciones>
-- =============================================
ALTER TRIGGER TR_RequirementLogs
   ON  [dbo].[Requirement] AFTER INSERT, UPDATE
AS 
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	DECLARE @ID_Requirement int
    DECLARE @RequirementType int
    DECLARE @ID_AreaRequirement int
    DECLARE @CantRequirement int
    DECLARE @PartRequirement varchar(150)
    DECLARE @SizeRequirement varchar(150)
    DECLARE @UserRequirement varchar(150)
    DECLARE @StatusRequirement int
	DECLARE @Comments varchar(350)
	DECLARE @LastUserChange varchar(150)
	
	SET @ID_Requirement = (SELECT ID_Requirement FROM inserted)
	SET @RequirementType = (SELECT RequirementType FROM inserted)
	SET @ID_AreaRequirement = (SELECT ID_AreaRequirement FROM inserted)
	SET @CantRequirement = (SELECT CantRequirement FROM inserted)
	SET @PartRequirement = (SELECT PartRequirement FROM inserted)
	SET @SizeRequirement = (SELECT SizeRequirement FROM inserted)
	SET @UserRequirement = (SELECT UserRequirement FROM inserted)
	SET @StatusRequirement = (SELECT StatusRequirement FROM inserted)
	SET @Comments = (SELECT Comments FROM inserted)
	SET @LastUserChange = (SELECT LastUserChange FROM inserted)

	INSERT INTO [dbo].[RequirementLogs]
           ([ID_RequirementLogs]
           ,[ID_Requirement]
           ,[RequirementType]
           ,[ID_AreaRequirement]
           ,[CantRequirement]
		   ,[PartRequirement]
		   ,[SizeRequirement]
           ,[UserRequirement]
           ,[StatusRequirement]
           ,[Comments]
		   ,[LastUserChange])
     VALUES
           ((SELECT ISNULL(MAX([ID_RequirementLogs]),0) + 1 FROM [RequirementLogs])
           ,@ID_Requirement
           ,@RequirementType
           ,@ID_AreaRequirement
           ,@CantRequirement
		   ,@PartRequirement
		   ,@SizeRequirement
           ,@UserRequirement
           ,@StatusRequirement
           ,@Comments
		   ,@LastUserChange)

END
GO
