from flask import request
from flask import jsonify
from flask_restful import Resource
from flask_pymongo import PyMongo
from mongoengine import errors
from Utilidades.Config import app, connect
from bson.objectid import ObjectId
from Documents.Models import Encargado

mongo = PyMongo(app)

class EncargadoseGet(Resource):
    def get(self):
        output = []
        for e in Encargado.objects:
            output.append({
                "id": str(e.id),
                'restaurante': e.restaurante,
                'usuario': e.usuario,
                'role': e.role
            })
        return jsonify({'resultado': output})

class EncargadoPorId(Resource):
    def get(self, id):
        output = []
        for e in Encargado.objects(id=id):
            output.append({
                "id": str(e.id),
                'restaurante': e.restaurante,
                'usuario': e.usuario,
                'role': e.role
            })
        return jsonify({'resultado': output})

class CrearEncargado(Resource):
    def post(self):
        _restaurante = request.json['restaurante']
        _usuario = request.json['usuario']
        _role = request.json['role']
        if _restaurante is None or _restaurante is "":
            raise ValueError("Se debe ingresar un nombre")
        if _usuario is None or _usuario is "":
            raise ValueError("Se debe ingresar un numero de telefono")
        if _role is None or _role is "":
            raise ValueError("Se debe ingresar un email")

        encargado = Encargado(restaurante=_restaurante,
                                  usuario=_usuario,
                                  role=_role)
        try:
            encargado.save()
        except errors.NotUniqueError:
            return jsonify({'error': "Usuario duplicado, "+ _usuario })
        return jsonify({'resultado': "Ok"})

class ActualizarEncargado(Resource):
    def put(self):
        _id = request.json['id']
        _nombre = request.json['nombre']
        _telefono = request.json['telefono']
        _email = request.json['email']
        _horario = request.json['horario']
        _logo = request.json['logo']
        if _nombre is None or _nombre is "":
            raise ValueError("Se debe ingresar un nombre")
        if _telefono is None or _telefono is "":
            raise ValueError("Se debe ingresar un numero de telefono")
        if _email is None or _email is "":
            raise ValueError("Se debe ingresar un email")
        if _horario is None or _horario is "":
            raise ValueError("Se debe ingresar un horario")
        if _id is None or _id is "":
            raise ValueError("Se debe ingresar un detalle del producto.")
        restaurante = Encargado.objects(id=_id)
        try:
            restaurante.update(nombre=_nombre)
            restaurante.update(telefono=_telefono)
            restaurante.update(email=_email)
            restaurante.update(horario=_horario)
            restaurante.update(logo=_logo)
        except errors.NotUniqueError:
            return jsonify({'error': "Producto duplicado, "+ _nombre })
        return jsonify({'resultado': "Ok"})