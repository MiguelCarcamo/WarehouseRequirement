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
-- Create date: <Create Date, 1/15/2024>
-- Description:	<Description,>
-- =============================================
alter PROCEDURE SP_Requirement_Action
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

    -- Insert statements for procedure here
	IF @ID_Requirement = 0 
	BEGIN
		EXECUTE SP_Requirement_Create @RequirementType, @ID_Area ,@ID_AreaRequirement ,@CantRequirement, @PartRequirement, @SizeRequirement, @UserRequirement ,@StatusRequirement ,@PONumberPPM ,@StyleNumberPPM ,@MOPPM ,@OrderQtyPPM ,@SportPPM ,@TypePPM ,@Color1PPM ,@Color2PPM ,@Comments
	END
	ELSE
	BEGIN
		EXECUTE SP_Requirement_Update @ID_Requirement, @ID_Area, @RequirementType ,@ID_AreaRequirement ,@CantRequirement ,  @PartRequirement, @SizeRequirement, @UserRequirement ,@StatusRequirement ,@PONumberPPM ,@StyleNumberPPM ,@MOPPM ,@OrderQtyPPM ,@SportPPM ,@TypePPM ,@Color1PPM ,@Color2PPM ,@Comments
	END
END
GO
