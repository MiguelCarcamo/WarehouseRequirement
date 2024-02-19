from db.db import conn
import asyncio

class FindPPMModel():
    _loop2 = asyncio.get_event_loop()
    @classmethod
    def get_FindPPM(self, PONumber, StyleNumber):
        try:
            textSQL = f"""
                SELECT  MO.ManufactureID, MO.ManufactureNumber,
                        ISNULL( MO.CutNumber, '001') AS CutNumber,
                        OD.PONumber, ST.StyleNumber,
                        OI.QuantityRequested Qty,
                        OD.Comments3, OD.Comments14,
                        ODS.Description, ODS.GarmentSize, ODS.RequestCount,
                        OI.ItemDescription6,
                        SCS.StyleColorName, SCS.StyleColorDescription,
                        SC.StyleCategoryName, DV.DivisionName
                FROM ManufactureOrders MO WITH ( NOLOCK )
                LEFT OUTER JOIN Orders OD WITH ( NOLOCK ) ON MO.OrderID = OD.OrderID
                LEFT OUTER JOIN OrderItems OI WITH ( NOLOCK ) ON MO.FirstOrderItemID = OI.OrderItemID
                LEFT OUTER JOIN Styles ST WITH ( NOLOCK ) ON OI.StyleID = ST.StyleID
                LEFT OUTER JOIN StyleCategories SC WITH ( NOLOCK ) ON ST.StyleCategoryID = SC.StyleCategoryID
                LEFT OUTER JOIN Divisions DV WITH ( NOLOCK ) ON ST.DivisionID = DV.DivisionID
                LEFT OUTER JOIN StyleColors SCS with (NOLOCK) ON OI.StyleColorID = SCS.StyleColorID
                LEFT OUTER JOIN OrderDetails ODS with (NOLOCK) ON OI.OrderItemID = ODS.OrderItemID
                WHERE (OD.PONumber = '{PONumber}' AND ST.StyleNumber = '{StyleNumber}') AND MO.StatusID NOT IN (95,20)
            """
            df = self._loop2.run_until_complete(conn.runServer3(textSQL))
            if(len(df) > 0):
                return(df)
            else:
                return([])
        except Exception as ex:
            raise Exception(ex)
        
    @classmethod
    def get_FindPPMPartNumber(self, ManufactureID):
        try:
            textSQL = f"""
                SELECT CC.CategoryName, UN.UnitName, RM.PartNumber, BP.BodyPart, ROUND(RM.QuantityOnHand, 2) AS QuantityOnHand,
                        ROUND(RM.QuantityAllocated, 2) AS QuantityAllocated, ROUND(RT.QuantityRequired, 2) AS QuantityRequired
                FROM RawAllocations RT
                LEFT OUTER JOIN RawMaterials RM ON RT.RawMaterialID = RM.RawMaterialID
                LEFT OUTER JOIN ComponentLibrary CL ON RM.ComponentID = CL.ComponentID
                LEFT OUTER JOIN ComponentCategories CC ON CL.ComponentCategoryID = CC.ComponentCategoryID
                LEFT OUTER JOIN UnitNames UN ON CL.DatabaseUnitID = UN.UnitNameID
                LEFT OUTER JOIN BodyParts BP ON RT.BodyPartID = BP.BodyPartID
                where RT.ManufactureID = {ManufactureID}
            """
            df = self._loop2.run_until_complete(conn.runServer3(textSQL))
            if(len(df) > 0):
                return(df)
            else:
                return([])
        except Exception as ex:
            raise Exception(ex)