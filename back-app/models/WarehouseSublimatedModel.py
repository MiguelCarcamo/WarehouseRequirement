from db.db import conn
import asyncio

class WarehouseSublimatedModel():
    _loop2 = asyncio.get_event_loop()

    @classmethod
    def Find_Warehouse_All(self):
        try:
            textSQL = f"""
                        SELECT WS.ID_Warehouse as id
                            ,WS.ID_Requirements
                            ,WS.ID_Locations
                            ,GL.Locations
                            ,WS.UserWarehouseIN
                            ,WS.DateIN
                            ,GT.Turno AS TurnoIN
                            ,WS.UserWarehouseOut
                            ,WS.DateOut
                            ,WS.TurnoOut
                            ,case WS.StatusWarehouse when 1 then 'Input' when 2 then 'Process RH' else 'Output' end as StatusWarehouse
                            ,WS.Comments
                            ,WS.PONumberPPM
                            ,WS.StyleNumberPPM
                            ,WS.MOPPM
                            ,WS.OrderQtyPPM
                            ,WS.SportPPM
                            ,WS.TypePPM
                        FROM [dbo].[WarehouseSublimated] WS
                        LEFT OUTER JOIN [General_Locations] GL ON WS.ID_Locations = GL.ID_Locations
                        LEFT OUTER JOIN [General_Turno] GT ON WS.TurnoIN = GT.ID_Turno
                    """
            df = self._loop2.run_until_complete(conn.runServer(textSQL))
            if(len(df) > 0):
                return(df)
            else:
                return([])
        except Exception as ex:
            raise Exception(ex)
    
    @classmethod
    def add_Warehouse(self,ID_Warehouse, ID_Locations, ID_Requirements, UserWarehouseIN, DateIN, TurnoIN, UserWarehouseOut, DateOut, TurnoOut, StatusWarehouse, Comments, PONumberPPM, StyleNumberPPM, MOPPM, OrderQtyPPM, SportPPM, TypePPM):
        try:
            textSQL = f"""
                        EXECUTE [dbo].[SP_WarehouseSublimated_Action] 
                              {ID_Warehouse}
                            , {ID_Locations}
                            , {'Null' if ID_Requirements == None else f"'{ID_Requirements}'"}
                            ,'{UserWarehouseIN}'
                            ,'{DateIN}'
                            ,'{TurnoIN}'
                            , {'Null' if UserWarehouseOut == None else f"'{UserWarehouseOut}'"}
                            , {'Null' if DateOut == None else f"'{DateOut}'"}
                            , {'Null' if TurnoOut == None else f"'{TurnoOut}'"}
                            , {StatusWarehouse}
                            ,'{Comments}'
                            ,'{PONumberPPM}'
                            ,'{StyleNumberPPM}'
                            ,'{MOPPM}'
                            , {OrderQtyPPM}
                            ,'{SportPPM}'
                            ,'{TypePPM}'
                    """
            df = self._loop2.run_until_complete(conn.runServer2(textSQL))
            return(1)
            return(df)
        except Exception as ex:
            raise Exception(ex)
    
    @classmethod
    def Find_Warehouse(self, PONumberPPM, StyleNumberPPM):
        try:
            textSQL = f"""
                        SELECT WS.ID_Warehouse as id
                            ,WS.ID_Requirements
                            ,WS.ID_Locations
                            ,GL.Locations
                            ,WS.UserWarehouseIN
                            ,WS.DateIN
                            ,GT.Turno AS TurnoIN
                            ,WS.UserWarehouseOut
                            ,WS.DateOut
                            ,WS.TurnoOut
                            ,case WS.StatusWarehouse when 1 then 'Input' when 2 then 'Process RH' else 'Output' end as StatusWarehouse
                            ,WS.Comments
                            ,WS.PONumberPPM
                            ,WS.StyleNumberPPM
                            ,WS.MOPPM
                            ,WS.OrderQtyPPM
                            ,WS.SportPPM
                            ,WS.TypePPM
                        FROM [dbo].[WarehouseSublimated] WS
                        LEFT OUTER JOIN [General_Locations] GL ON WS.ID_Locations = GL.ID_Locations
                        LEFT OUTER JOIN [General_Turno] GT ON WS.TurnoIN = GT.ID_Turno
                        WHERE PONumberPPM = '{PONumberPPM}' AND StyleNumberPPM = '{StyleNumberPPM}' AND WS.DateOut IS NULL
                    """
            df = self._loop2.run_until_complete(conn.runServer(textSQL))
            if(len(df) > 0):
                return(df)
            else:
                return([])
        except Exception as ex:
            raise Exception(ex)