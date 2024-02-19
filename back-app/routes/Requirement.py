from flask import Blueprint, jsonify, request
import json
from pandas import json_normalize
from models.RequirementModel import RequirementModel
from models.CanvasCRUDModel import CanvasCRUDModel
import asyncio

main=Blueprint('Requirement_blueprint', __name__)

@main.route('/Add', methods=['POST'])
def add_Requirement():
    try:
        jsonPD = request.get_json()
        data1 = jsonPD[0]['data1']
        data2 = jsonPD[0]['data2']
        data3 = jsonPD[0]['data3']
        df1 = json_normalize(data1)
        df2 = json_normalize(data2)
        
        data = RequirementModel.add_Requirement(df1.ID_Requirement[0], df1.ID_Area[0],df1.RequirementType[0],df1.ID_AreaRequirement[0],
                                                df1.CantRequirement[0],df1.PartRequirement[0],df1.SizeRequirement[0],
                                                df1.UserRequirement[0],df1.StatusRequirement[0],df1.PONumberPPM[0],
                                                df1.StyleNumberPPM[0],df1.MOPPM[0],df1.OrderQtyPPM[0],df1.SportPPM[0],
                                                df1.TypePPM[0],df1.Color1PPM[0],df1.Color2PPM[0],df1.Comments[0])
        if(data == 1):
            dataFind = json_normalize(RequirementModel.Find_Requirement(df1.PONumberPPM[0], df1.StyleNumberPPM[0]))
            RequirementModel.Delete_RequirementDetails(dataFind.id[0])
            CanvasCRUDModel.Save_Json(dataFind.id[0], data3)
            for index, row in df2.iterrows():
                RequirementModel.add_RequirementDetails(dataFind.id[0], row['ID_Error'], row['GarmentSize'], row['NumbersRequest'], row['RequestCount'], row['Qty'])
            return dict(msj='Action Performed Correctly')
        else:
            return dict(msj='Action could not be completed.')
    except Exception as ex:
        print(ex)
        return jsonify({'message': str(ex)}), 500
    
@main.route('/Find', methods=['POST'])
def get_Find():
    try:
        jsonPD = request.get_json()
        df = json_normalize(jsonPD)
        data = RequirementModel.Find_Requirement(df.PONumber[0], df.StyleNumber[0])
        return jsonify(data)
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500

@main.route('/All', methods=['GET'])
def get_FindAll():
    try:
        data = RequirementModel.Find_Requirement_All()
        return jsonify(data)
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500   