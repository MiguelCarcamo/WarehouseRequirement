from flask import Blueprint, jsonify, request
import json
from pandas import json_normalize
from models.WarehouseSublimatedModel import WarehouseSublimatedModel
from models.RequirementModel import RequirementModel
import asyncio

main=Blueprint('WarehouseSublimated_blueprint', __name__)

@main.route('/All', methods=['GET'])
def get_FindAll():
    try:
        data = WarehouseSublimatedModel.Find_Warehouse_All()
        return jsonify(data)
    except Exception as ex:
        return jsonify({'All - message': str(ex)}), 500   
    
@main.route('/Add', methods=['POST'])
def add_Requirement():
    try:
        jsonPD = request.get_json()
        data1 = jsonPD[0]['data1']
        df1 = json_normalize(data1)
        data = WarehouseSublimatedModel.add_Warehouse(df1.ID_Warehouse[0], df1.ID_Locations[0], df1.ID_Requirements[0], df1.UserWarehouseIN[0], df1.DateIN[0], df1.TurnoIN[0], df1.UserWarehouseOut[0], df1.DateOut[0], df1.TurnoOut[0], df1.StatusWarehouse[0], df1.Comments[0], df1.PONumberPPM[0], df1.StyleNumberPPM[0], df1.MOPPM[0], df1.OrderQtyPPM[0], df1.SportPPM[0], df1.TypePPM[0])
        if(data == 1):
            if (df1.ID_Requirements[0] is not None):
                RequirementModel.Status_Requirement(df1.ID_Requirements[0], 3, df1.UserWarehouseIN[0])
            return dict(msj='Action Performed Correctly')
        else:
            return dict(msj='Action could not be completed.')
    except Exception as ex:
        print(ex)
        return jsonify({'Add - message': str(ex)}), 500

@main.route('/Find', methods=['POST'])
def get_Find():
    try:
        jsonPD = request.get_json()
        df = json_normalize(jsonPD)
        data = WarehouseSublimatedModel.Find_Warehouse(df.PONumber[0], df.StyleNumber[0])
        return jsonify(data)
    except Exception as ex:
        return jsonify({'Find - message': str(ex)}), 500