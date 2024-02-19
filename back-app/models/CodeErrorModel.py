from db.db import conn
import asyncio

class CodeErrorModel():
    _loop2 = asyncio.get_event_loop()
    @classmethod
    def get_General_Error(self):
        try:
            textSQL = f"""
                    SELECT [Id] as id
                        ,[ID_Area]
                        ,[Codigo]
                        ,[Problema]
                        ,[Reason]
                    FROM [dbo].[General_Error]
            """
            df = self._loop2.run_until_complete(conn.runServer(textSQL))
            if(len(df) > 0):
                return(df)
            else:
                return([])
        except Exception as ex:
            raise Exception(ex)