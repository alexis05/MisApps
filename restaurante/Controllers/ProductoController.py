from flask import request
from flask import jsonify
from flask_restful import Resource
from flask_pymongo import PyMongo
from mongoengine import errors
from Utilidades.Config import app, connect
from bson.objectid import ObjectId
from Documents.Models import Producto
from Utilidades.Excepciones import InvalidUsage

mongo = PyMongo(app)

@app.errorhandler(InvalidUsage)
def handle_invalid_usage(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response


class ProductosGet(Resource):
    def get(self):
        output = []
        for prod in Producto.objects:
            output.append({
                "id": str(prod.id),
                'nombre': prod.nombre,
                'precio': prod.precio,
                'detalle': prod.detalle,
                'creado': prod.creado,
                'fotos': prod.fotos,
                'registrado_por': prod.registrado_por,
                'estado': prod.estado
            })
        return jsonify({'resultado': output})

class ProductoPorId(Resource):
    def get(self, id):
        output = []
        try:
            for prod in Producto.objects(id=id):
                output.append({
                    "id": str(prod.id),
                    'nombre': prod.nombre,
                    'precio': prod.precio,
                    'detalle': prod.detalle,
                    'creado': prod.creado,
                    'fotos': prod.fotos,
                    'registrado_por': prod.registrado_por,
                    'estado': prod.estado
                })
            return jsonify({'resultado': output})
        except errors.ValidationError:
            return jsonify({'resultado': "No se existe."})

class CrearProducto(Resource):
    def post(self):
        _nombre = request.json['nombre']
        _precio = request.json['precio']
        _detalle = request.json['detalle']
        _registrado_por = request.json['registrado_por']
        _fotos = request.json['fotos']
        if _nombre is None or _nombre is "":
            raise InvalidUsage("Se debe ingresar un nombre", status_code=400)
        if _precio is None or _precio is "":
            raise InvalidUsage("Se debe ingresar un precio", status_code=400)
        if _detalle is None or _detalle is "":
            raise InvalidUsage("Se debe ingresar un detalle del producto.", status_code=400)
        if _registrado_por is None or _registrado_por is "":
            raise InvalidUsage("Se debe ingresar un usuario como creador del producto.", status_code=400)
        producto = Producto(nombre=_nombre,
                            precio=_precio,
                            detalle=_detalle,
                            fotos= _fotos,
                            registrado_por=_registrado_por)
        try:
            producto.save()
        except errors.NotUniqueError as exc:
            return jsonify({'error': "Producto duplicado, "+ _nombre })
        return jsonify({'resultado': "Ok"})

class ActualizarProducto(Resource):
    def put(self):
        _nombre = request.json['nombre']
        _precio = request.json['precio']
        _detalle = request.json['detalle']
        _id = request.json['id']
        _fotos = request.json['fotos']
        _estado = request.json['estado']
        if _nombre is None or _nombre is "":
            raise InvalidUsage("Se debe ingresar un nombre", status_code=400)
        if _precio is None or _precio is "":
            raise InvalidUsage("Se debe ingresar un precio", status_code=400)
        if _detalle is None or _detalle is "":
            raise InvalidUsage("Se debe ingresar un detalle del producto.", status_code=400)
        if _id is None or _id is "":
            raise InvalidUsage("Se debe ingresar un detalle del producto.", status_code=400)
        if _estado is None or _estado is "":
            raise InvalidUsage("Se debe ingresar un estado.", status_code=400)
        if _estado != '1' and _estado !='0':
            raise InvalidUsage("Solo se puede ingresar 1 o 0.", status_code=400)
        producto = Producto.objects(id=_id)
        try:
            producto.update(nombre=_nombre)
            producto.update(precio=_precio)
            producto.update(detalle=_detalle)
            producto.update(fotos=_fotos)
            producto.update(estado=_estado)
        except errors.NotUniqueError as exc:
            return jsonify({'error': "Producto duplicado, "+ _nombre })
        return jsonify({'resultado': "Ok"})