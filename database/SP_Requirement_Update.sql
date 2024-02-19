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
-- Author:		<Author, Miguel De Jesus Carcamo>
-- Create date: <Create Date, 12/28/2023>
-- Description:	<Description, Actualizar requisas>
-- =============================================
alter PROCEDURE SP_Requirement_Update
	-- Add the parameters for the stored procedure here
	 @ID_Requirement int
	,@ID_Area int
    ,@RequirementType int
    ,@ID_AreaRequirement int
    ,@CantRequirement int
	,@PartRequirement varchar(150)
	,@SizeRequirement varchar(150)
    ,@UserRequirement varchar(150)
    ,@StatusRequirement int
    ,@PONumberPPM varchar(150)
    ,@StyleNumberPPM varchar(150)
    ,@MOPPM varchar(150)
    ,@OrderQtyPPM int
    ,@SportPPM varchar(150)
    ,@TypePPM varchar(150)
    ,@Color1PPM varchar(150)
    ,@Color2PPM varchar(150)
	,@Comments varchar(350)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	BEGIN TRY

    -- Insert statements for procedure here
		UPDATE [dbo].[Requirement]
		   SET [ID_Area] = @ID_Area
			  ,[RequirementType] = @RequirementType
			  ,[ID_AreaRequirement] = @ID_AreaRequirement
			  ,[CantRequirement] = @CantRequirement
			  ,PartRequirement = @PartRequirement
			  ,SizeRequirement = @SizeRequirement
			  ,[UserRequirement] = @UserRequirement
			  ,[StatusRequirement] = @StatusRequirement
			  ,[Comments] = @Comments
		 WHERE [ID_Requirement] = @ID_Requirement
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
