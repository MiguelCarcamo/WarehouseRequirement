from flask import Blueprint, jsonify, request
import json
from pandas import json_normalize
from models.CodeErrorModel import CodeErrorModel
import asyncio

main=Blueprint('CodeError_blueprint', __name__)

@main.route('/All', methods=['GET'])
def get_FindAll():
    try:
        data = CodeErrorModel.get_General_Error()
        return jsonify(data)
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500   