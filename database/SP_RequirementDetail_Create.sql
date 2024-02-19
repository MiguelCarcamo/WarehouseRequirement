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
-- Create date: <Create Date, 1/17/2024>
-- Description:	<Description,>
-- =============================================
ALTER PROCEDURE SP_RequirementDetail_Create
	-- Add the parameters for the stored procedure here
     @ID_Requirement int
    ,@ID_Error int
    ,@GarmentSizePPM varchar(50)
    ,@NumbersRequest varchar(350)
    ,@OrderQtyPPM int
    ,@CantRequirement int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	DECLARE @ID_RequirementDetail int
	BEGIN TRY
		SELECT @ID_RequirementDetail = ISNULL(MAX(ID_RequirementDetail),0) + 1 FROM [RequirementDetail]
		INSERT INTO [dbo].[RequirementDetail]
			   ([ID_RequirementDetail]
			   ,[ID_Requirement]
			   ,[ID_Error]
			   ,[GarmentSizePPM]
			   ,[NumbersRequest]
			   ,[OrderQtyPPM]
			   ,[CantRequirement])
		 VALUES
			   ( @ID_RequirementDetail
				,@ID_Requirement
				,@ID_Error
				,@GarmentSizePPM
				,@NumbersRequest
				,@OrderQtyPPM
				,@CantRequirement)
	END TRY
	BEGIN CATCH
		-- Handle the error. You can log the error, raise it again, or take appropriate action.
		-- For now, we'll just print the error message.
		PRINT ERROR_MESSAGE()
		-- Optionally, you may choose to re-throw the error
		-- THROW;
	END CATCH
END
GO
