from flask import Blueprint, jsonify, request, send_file
from os.path import join, dirname

main=Blueprint('SendImage_blueprint', __name__)

@main.route('/<id>', methods=['GET'])
def get_FindAll(id):
    try:
        folder_path = r'S:\El Baron\Public Files\E. Pavon\Formatos de Reposiciones 2018\img'
        image_path = join(folder_path, id)
        # return send_file(image_path, as_attachment=True)
        return send_file(image_path, mimetype='image/jpeg')
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500
