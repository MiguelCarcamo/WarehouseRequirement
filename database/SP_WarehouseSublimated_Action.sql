-- ================================================
-- Template generated from Template Explorer using:
-- Create Procedure (New Menu).SQL
--
-- Use the Specify Values for Template Parameters 
-- command (Ctrl-Shift-M) to fill in the parameter 
-- values below.
--
-- This block of comments will not be included in
-- the definition of the procedure.
-- ================================================
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author, Miguel De Jesus Carcamo Torres>
-- Create date: <Create Date, 12/29/2023>
-- Description:	<Description,,>
-- =============================================
alter PROCEDURE SP_WarehouseSublimated_Action
	-- Add the parameters for the stored procedure here
	 @ID_Warehouse int
    ,@ID_Locations int
	,@ID_Requirements int
    ,@UserWarehouseIN varchar(150)
    ,@DateIN date
    ,@TurnoIN varchar(25)
    ,@UserWarehouseOut varchar(150)
    ,@DateOut date
    ,@TurnoOut varchar(25)
    ,@StatusWarehouse int
    ,@Comments varchar(350)
    ,@PONumberPPM varchar(150)
    ,@StyleNumberPPM varchar(150)
    ,@MOPPM varchar(150)
    ,@OrderQtyPPM int
    ,@SportPPM varchar(150)
    ,@TypePPM varchar(150)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

   IF @ID_Warehouse = 0
   BEGIN
		EXECUTE SP_WarehouseSublimated_Create @ID_Locations ,@ID_Requirements ,@UserWarehouseIN ,@DateIN ,@TurnoIN ,@UserWarehouseOut ,@DateOut ,@TurnoOut ,@StatusWarehouse ,@Comments ,@PONumberPPM ,@StyleNumberPPM ,@MOPPM ,@OrderQtyPPM ,@SportPPM, @TypePPM
   END
   ELSE
   BEGIN
		EXECUTE SP_WarehouseSublimated_Update @ID_Warehouse ,@ID_Locations, @ID_Requirements, @UserWarehouseIN ,@DateIN ,@TurnoIN ,@UserWarehouseOut ,@DateOut ,@TurnoOut ,@StatusWarehouse ,@Comments ,@PONumberPPM ,@StyleNumberPPM ,@MOPPM ,@OrderQtyPPM ,@SportPPM, @TypePPM
   END
END
GO
