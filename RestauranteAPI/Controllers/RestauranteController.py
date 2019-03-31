from flask import request
from flask import jsonify
from flask_restful import Resource
from flask_pymongo import PyMongo
from mongoengine import errors
from Utilidades.Config import app, connect
from bson.objectid import ObjectId
from Documents.Models import Restaurante
from Utilidades.Excepciones import InvalidUsage

mongo = PyMongo(app)

@app.errorhandler(InvalidUsage)
def handle_invalid_usage(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response

class RestauranteGet(Resource):
    def get(self):
        output = []
        for rest in Restaurante.objects:
            output.append({
                "id": str(rest.id),
                'nombre': rest.nombre,
                'telefono': rest.telefono,
                'email': rest.email,
                'horario': rest.horario,
                'logo': rest.logo,
                'creado': rest.creado,
                'estado': rest.estado
            })
        return jsonify({'resultado': output})

class RestaurantePorId(Resource):
    def get(self, id):
        if id is None or id is "":
            raise InvalidUsage("Se debe ingresar un id del RestauranteAPI.", status_code=400)
        output = []
        try:
            for rest in Restaurante.objects(id=id):
                output.append({
                    "id": str(rest.id),
                    'nombre': rest.nombre,
                    'telefono': rest.telefono,
                    'email': rest.email,
                    'horario': rest.horario,
                    'logo': rest.logo,
                    'creado': rest.creado,
                    'estado': rest.estado
                })
            return jsonify({'resultado': output})
        except errors.ValidationError:
            return jsonify({"resultado":"No se existe."+id})


class CrearRestaurante(Resource):
    def post(self):
        _nombre = request.json['nombre']
        _telefono = request.json['telefono']
        _email = request.json['email']
        _horario = request.json['horario']
        _logo = request.json['logo']
        if _nombre is None or _nombre is "":
            raise InvalidUsage('Se debe ingresar un nombre', status_code=400)
        if _telefono is None or _telefono is "":
            raise InvalidUsage('Se debe ingresar un numero de telefono', status_code=400)
        if _email is None or _email is "":
            raise InvalidUsage("Se debe ingresar un email", status_code=400)
        if _horario is None or _horario is "":
            raise InvalidUsage("Se debe ingresar un horario", status_code=400)

        restaurante = Restaurante(nombre=_nombre,
                                  telefono=_telefono,
                                  email=_email,
                                  horario=_horario,
                                  logo=_logo)
        try:
            restaurante.save()
        except errors.NotUniqueError:
            return jsonify({'error': "Restaurante duplicado, "+ _nombre })
        return jsonify({'resultado': "Ok"})

class ActualizarRestaurante(Resource):
    def put(self):
        _id = request.json['id']
        _nombre = request.json['nombre']
        _telefono = request.json['telefono']
        _email = request.json['email']
        _horario = request.json['horario']
        _logo = request.json['logo']
        _estado = request.json['estado']
        if _nombre is None or _nombre is "":
            raise InvalidUsage('Se debe ingresar un nombre', status_code=400)
        if _telefono is None or _telefono is "":
            raise InvalidUsage("Se debe ingresar un numero de telefono", status_code=400)
        if _email is None or _email is "":
            raise InvalidUsage("Se debe ingresar un email", status_code=400)
        if _horario is None or _horario is "":
            raise InvalidUsage("Se debe ingresar un horario", status_code=400)
        if _id is None or _id is "":
            raise InvalidUsage("Se debe ingresar un id del RestauranteAPI.", status_code=400)
        if _estado != '1' and _estado !='0':
            raise InvalidUsage("Solo se puede ingresar 1 o 0.", status_code=400)
        restaurante = Restaurante.objects(id=_id)
        try:
            restaurante.update(nombre=_nombre)
            restaurante.update(telefono=_telefono)
            restaurante.update(email=_email)
            restaurante.update(horario=_horario)
            restaurante.update(logo=_logo)
            restaurante.update(estado=_estado)
        except errors.NotUniqueError:
            return jsonify({'error': "Producto duplicado, "+ _nombre })
        return jsonify({'resultado': "Ok"})