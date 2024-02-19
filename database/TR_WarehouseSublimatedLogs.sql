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
-- Author:		<Author,Miguel De Jesus Carcamo>
-- Create date: <Create Date, 12/29/2023>
-- Description:	<Description,>
-- =============================================
CREATE TRIGGER [dbo].[TR_WarehouseSublimatedLogs]
   ON  [dbo].[WarehouseSublimated] AFTER INSERT, UPDATE
AS 
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	DECLARE @ID_Warehouse int
    DECLARE @ID_Locations int
    DECLARE @UserWarehouseIN varchar(150)
    DECLARE @DateIN date
    DECLARE @TurnoIN varchar(25)
    DECLARE @UserWarehouseOut varchar(150)
    DECLARE @DateOut date
    DECLARE @TurnoOut varchar(25)
    DECLARE @StatusWarehouse int
    DECLARE @Comments varchar(350)

    SET @ID_Warehouse = (SELECT ID_Warehouse FROM inserted)
    SET @ID_Locations = (SELECT ID_Locations FROM inserted)
    SET @UserWarehouseIN = (SELECT UserWarehouseIN FROM inserted)
    SET @DateIN = (SELECT DateIN FROM inserted)
    SET @TurnoIN = (SELECT TurnoIN FROM inserted)
    SET @UserWarehouseOut = (SELECT UserWarehouseOut FROM inserted)
    SET @DateOut = (SELECT DateOut FROM inserted)
    SET @TurnoOut = (SELECT TurnoOut FROM inserted)
    SET @StatusWarehouse = (SELECT StatusWarehouse FROM inserted)
    SET @Comments = (SELECT Comments FROM inserted)

		INSERT INTO [dbo].[WarehouseSublimatedLogs]
           ([ID_WarehouseSublimatedLogs]
           ,[ID_Warehouse]
           ,[ID_Locations]
           ,[UserWarehouseIN]
           ,[DateIN]
           ,[TurnoIN]
           ,[UserWarehouseOut]
           ,[DateOut]
           ,[TurnoOut]
           ,[StatusWarehouse]
           ,[Comments])
     VALUES
           (1
           ,@ID_Warehouse
           ,@ID_Locations
           ,@UserWarehouseIN
           ,@DateIN
           ,@TurnoIN
           ,@UserWarehouseOut
           ,@DateOut
           ,@TurnoOut
           ,@StatusWarehouse
           ,@Comments)



END
GO
