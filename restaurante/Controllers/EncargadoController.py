from flask import request
from flask import jsonify
from flask_restful import Resource
from flask_pymongo import PyMongo
from mongoengine import errors
from Utilidades.Config import app, connect
from bson.objectid import ObjectId
from Documents.Models import Encargado
from Utilidades.Excepciones import InvalidUsage

mongo = PyMongo(app)

@app.errorhandler(InvalidUsage)
def handle_invalid_usage(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response


class EncargadoseGet(Resource):
    def get(self):
        output = []
        for e in Encargado.objects:
            print(e.usuario.nombre)
            output.append({
                "id": str(e.id),
                'restaurante': str(e.restaurante.id),
                'usuario': str(e.usuario.id),
                'role': e.role,
                'estado': e.estado
            })
        return jsonify({'resultado': output})

class EncargadoPorId(Resource):
    def get(self, id):
        if id is None or id is "":
            raise InvalidUsage("Se debe ingresar un id del encargado.", status_code=400)
        output = []
        try:
            for e in Encargado.objects(id=id):
                output.append({
                    "id": str(e.id),
                    'restaurante': str(e.restaurante.id),
                    'usuario': str(e.usuario.id),
                    'role': e.role,
                    'estado': e.estado
                })
            return jsonify({'resultado': output})
        except errors.ValidationError:
            return jsonify({'error': "No existe, " + id})

class CrearEncargado(Resource):
    def post(self):
        _restaurante = request.json['restaurante']
        _usuario = request.json['usuario']
        _role = request.json['role']
        if _restaurante is None or _restaurante is "":
            raise InvalidUsage("Se debe ingresar un restaurante", status_code=400)
        if _usuario is None or _usuario is "":
            raise InvalidUsage("Se debe ingresar un usuario", status_code=400)
        if _role is None or _role is "":
            raise InvalidUsage("Se debe ingresar un role", status_code=400)

        encargado = Encargado(restaurante=_restaurante,
                              usuario=_usuario,
                              role=_role,
                              estado='1')
        try:
            encargado.save()
        except errors.NotUniqueError:
            return jsonify({'error': "Encargado duplicado, "+ _usuario })
        return jsonify({'resultado': "Ok"})

class ActualizarEncargado(Resource):
    def put(self):
        _role = request.json['role']
        _estado = request.json['estado']
        _id = request.json['id']
        if _role is None or _role is "":
            raise InvalidUsage("Se debe ingresar un role", status_code=400)
        if _id is None or _id is "":
            raise InvalidUsage("Se debe ingresar un id del encargado.", status_code=400)

        e = Encargado.objects(id=_id)
        try:
            e.update(role=_role)
            e.update(estado=_estado)
        except errors.NotUniqueError:
            return jsonify({'error': "Encargado duplicado, "+ _id })
        return jsonify({'resultado': "Ok"})