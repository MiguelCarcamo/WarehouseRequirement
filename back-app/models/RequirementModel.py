from db.db import conn
import asyncio

class RequirementModel():
    _loop2 = asyncio.get_event_loop()

    @classmethod
    def add_Requirement(self,ID_Requirement, ID_Area,RequirementType,ID_AreaRequirement,CantRequirement,PartRequirement,SizeRequirement,UserRequirement,StatusRequirement,PONumberPPM,StyleNumberPPM,MOPPM,OrderQtyPPM,SportPPM,TypePPM,Color1PPM,Color2PPM,Comments):
        try:
            textSQL = f"""
                        EXECUTE [SP_Requirement_Action] 
                         {ID_Requirement}
                        ,{ID_Area}
                        ,{RequirementType}
                        ,{ID_AreaRequirement}
                        ,{CantRequirement}
                        ,{'Null' if PartRequirement == '' else f"'{PartRequirement}'"}
                        ,{'Null' if SizeRequirement == '' else f"'{SizeRequirement}'"}
                        ,'{UserRequirement}'
                        ,{StatusRequirement}
                        ,'{PONumberPPM}'
                        ,'{StyleNumberPPM}'
                        ,'{MOPPM}'
                        ,{OrderQtyPPM}
                        ,'{SportPPM}'
                        ,'{TypePPM}'
                        ,'{Color1PPM}'
                        ,'{Color2PPM}'
                        ,'{Comments}'
                    """
            df = self._loop2.run_until_complete(conn.runServer2(textSQL))
            return(df)
        except Exception as ex:
            raise Exception(ex)
    
    @classmethod
    def add_RequirementDetails(self, ID_Requirement, ID_Error, GarmentSizePPM, NumbersRequest, OrderQtyPPM, CantRequirement):
        try:
            textSQL = f"""
                        EXECUTE [SP_RequirementDetail_Create] 
                         {ID_Requirement}
                        ,{ID_Error}
                        ,'{GarmentSizePPM}'
                        ,{'Null' if NumbersRequest == 'null' else f"'{NumbersRequest}'"}
                        ,{OrderQtyPPM}
                        ,{CantRequirement}
                    """
            df = self._loop2.run_until_complete(conn.runServer2(textSQL))
            return(df)
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def Delete_RequirementDetails(self, ID_Requirement):
        try:
            textSQL = f"""
                        DELETE FROM [dbo].[RequirementDetail] WHERE ID_Requirement = {ID_Requirement}
                    """
            df = self._loop2.run_until_complete(conn.runServer2(textSQL))
            return(df)
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def Find_Requirement(self, PONumberPPM, StyleNumberPPM):
        try:
            textSQL = f"""
                        SELECT [ID_Requirement] as id
                            ,[ID_Area]
                            ,[RequirementType]
                            ,[ID_AreaRequirement]
                            ,[CantRequirement]
                            ,[PartRequirement]
                            ,[SizeRequirement]
                            ,[UserRequirement]
                            ,[StatusRequirement]
                            ,[PONumberPPM]
                            ,[StyleNumberPPM]
                            ,[MOPPM]
                            ,[OrderQtyPPM]
                            ,[SportPPM]
                            ,[TypePPM]
                            ,[Color1PPM]
                            ,[Color2PPM]
                            ,[Comments]
                            ,[CreateDate]
                        FROM [dbo].[Requirement]
                        WHERE [PONumberPPM] = '{PONumberPPM}' AND [StyleNumberPPM] = '{StyleNumberPPM}' AND [StatusRequirement] NOT IN (7,0)
                    """
            df = self._loop2.run_until_complete(conn.runServer(textSQL))
            if(len(df) > 0):
                return(df)
            else:
                return([])
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def Find_Requirement_All(self):
        try:
            textSQL = f"""
                        SELECT [ID_Requirement] as id
                            ,[ID_Area]
                            ,case [RequirementType] when 1 then 'Internal' else 'External' end AS [RequirementType]
                            ,(SELECT Area FROM General_Area WHERE ID_Area = tb1.ID_AreaRequirement) as [AreaRequirement]
                            ,[CantRequirement]
                            ,[PartRequirement]
                            ,[SizeRequirement]
                            ,[UserRequirement]
                            ,case [StatusRequirement] when 1 then 'New' when 2 then 'Inspection' when 3 then 'BodegaIn' when 4 then 'Plotter' when 5 then 'Sublimado' when 6 then 'BodegaOn' when 7 then 'Complete' else 'Deleted' END AS StatusRequirement
                            ,[PONumberPPM]
                            ,[StyleNumberPPM]
                            ,[MOPPM]
                            ,[OrderQtyPPM]
                            ,[SportPPM]
                            ,[TypePPM]
                            ,[Color1PPM]
                            ,[Color2PPM]
                            ,[Comments]
                            ,[CreateDate]
                        FROM [dbo].[Requirement] as tb1
                    """
            df = self._loop2.run_until_complete(conn.runServer(textSQL))
            if(len(df) > 0):
                return(df)
            else:
                return([])
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def Status_Requirement(self, ID_Requirement, Status, User):
        try:
            textSQL = f"""
                        UPDATE [dbo].[Requirement] SET StatusRequirement = {Status}, LastUserChange = '{User}' WHERE ID_Requirement = {ID_Requirement}
                    """
            df = self._loop2.run_until_complete(conn.runServer2(textSQL))
            return(df)
        except Exception as ex:
            raise Exception(ex)
