from flask import Blueprint, jsonify, request
from models.FindPPMModel import FindPPMModel
from pandas import json_normalize

main=Blueprint('FindPPM_blueprint', __name__)

@main.route('/FindPPM', methods=['POST'])
def get_FindPPM():
    try:
        jsonPD = request.get_json()
        df = json_normalize(jsonPD)
        # U077791
        # CZ1462
        data = FindPPMModel.get_FindPPM(df.PONumber[0], df.StyleNumber[0])
        # data = FindPPMModel.get_FindPPM('U077791', 'CZ1462')
        return jsonify(data)
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500

@main.route('/FindPPMPartNumber/<ManufactureID>', methods=['GET'])
def get_FindPPMPartNumber(ManufactureID):
    try:
        data = FindPPMModel.get_FindPPMPartNumber(ManufactureID)
        return jsonify(data)
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500