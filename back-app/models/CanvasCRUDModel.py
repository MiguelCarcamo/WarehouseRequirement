import os
import json

class CanvasCRUDModel():
    @classmethod
    def Save_Json(self, id, data):
        try:
            carpeta_path = f"Doc/json/{id}"
            if not os.path.exists(carpeta_path):
                os.makedirs(carpeta_path)
                version = 1
            else:
                archivos = os.listdir(carpeta_path)
                version = len(archivos) + 1
            archivo_path = f"{carpeta_path}/data_V{version}.json"
            with open(archivo_path, 'w') as archivo:
                json.dump(data, archivo)
            return f"JSON guardado exitosamente como data_V{version}.json."
        except Exception as ex:
            return 0
    
    @classmethod
    def Get_Last_Json(self, id):
        try:
            carpeta_path = f"Doc/json/{id}"
            if not os.path.exists(carpeta_path):
                return None  # Si no hay archivos guardados, devuelve None

            archivos = os.listdir(carpeta_path)
            archivos.sort()  # Ordenar archivos por nombre para obtener el último
            ultimo_archivo = archivos[-1]
            archivo_path = f"{carpeta_path}/{ultimo_archivo}"
            with open(archivo_path, 'r') as archivo:
                return json.load(archivo)
        except Exception as ex:
            return None  # Si ocurre algún error, devuelve None
    