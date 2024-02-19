from flask import Flask
from flask_cors import CORS
from routes import General, FindPPM, Requirement, WarehouseSublimated, SendImage, CodeError
import logging

def create_app():
    app = Flask(__name__)
    CORS(app, headers='Content-Type')

    @app.route('/')
    def index():
        return "<h1>Welcome to our server!</h1>"
    
    app.register_blueprint(General.main, url_prefix='/api/General')
    app.register_blueprint(FindPPM.main, url_prefix='/api/PPMData')
    app.register_blueprint(Requirement.main, url_prefix='/api/Requirement')
    app.register_blueprint(WarehouseSublimated.main, url_prefix='/api/WarehouseSublimated')
    app.register_blueprint(SendImage.main, url_prefix='/api/SendImage')
    app.register_blueprint(CodeError.main, url_prefix='/api/CodeError')

    # Deshabilitar mensajes de logging de los métodos GET, POST, PUT, etc.
    log = logging.getLogger('werkzeug')
    log.setLevel(logging.ERROR)

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', debug=False, port=5010, ssl_context=('certificado.crt', 'clave_privada.key'))