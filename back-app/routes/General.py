from flask import Blueprint, jsonify, request
from models.GeneralModel import GeneralModel

main=Blueprint('Proces_blueprint', __name__)

@main.route('/Area')
def get_Area():
    try:
        data = GeneralModel.get_General_Area()
        if(len(data) > 0):
            return jsonify(data)
        else:
            return jsonify({'message': str(ex)}), 500
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500
    
@main.route('/Locations')
def get_Locations():
    try:
        data = GeneralModel.get_General_Locations() 
        if(len(data) > 0):
            return jsonify(data)
        else:
            return jsonify({'message': str(ex)}), 500
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500

@main.route('/Turno')
def get_Turno():
    try:
        data = GeneralModel.get_General_Turno()
        if(len(data) > 0):
            return jsonify(data)
        else:
            return jsonify({'message': str(ex)}), 500
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500