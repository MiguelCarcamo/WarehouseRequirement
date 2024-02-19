from db.db import conn
import asyncio

class GeneralModel():
    _loop2 = asyncio.get_event_loop()
    @classmethod
    def get_General_Area(self):
        try:
            textSQL = f"""
                SELECT [ID_Area] as id
                    ,[Area]
                    ,[AreaStatus]
                    ,[Comments]
                FROM [dbo].[General_Area]
            """
            df = self._loop2.run_until_complete(conn.runServer(textSQL))
            if(len(df) > 0):
                return(df)
            else:
                return([])
        except Exception as ex:
            raise Exception(ex)
    
    @classmethod
    def get_General_Locations(self):
        try:
            textSQL = f"""
                SELECT [ID_Locations] as id
                    ,[ID_Area]
                    ,[Locations]
                    ,[LocationsStatus]
                    ,[Comments]
                FROM [dbo].[General_Locations]
            """
            df = self._loop2.run_until_complete(conn.runServer(textSQL))
            if(len(df) > 0):
                return(df)
            else:
                return([])
        except Exception as ex:
            raise Exception(ex)
    
    @classmethod
    def get_General_Turno(self):
        try:
            textSQL = f"""
                SELECT [ID_Turno] as id
                    ,[ID_Area]
                    ,[Turno]
                    ,[LocationsTurno]
                    ,[Comments]
                FROM [dbo].[General_Turno]
            """
            df = self._loop2.run_until_complete(conn.runServer(textSQL))
            if(len(df) > 0):
                return(df)
            else:
                return([])
        except Exception as ex:
            raise Exception(ex)