#import datetime
from datetime import datetime
from flask import request
from flask import jsonify
from flask_restful import Resource
from flask_pymongo import PyMongo
from mongoengine import errors
from Utilidades.Config import app, connect
from bson.objectid import ObjectId
from Documents.Models import Producto, Restaurante
from Utilidades.Excepciones import InvalidUsage

mongo = PyMongo(app)


@app.errorhandler(InvalidUsage)
def handle_invalid_usage(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response


class ProductosEnGeneral(Resource):
    def get(self, limit, skip):
        output = []
        for prod in Producto.objects().skip(skip).limit(limit):
            outputRest = []
            for rest in Restaurante.objects(id=prod.restaurante.id):
                outputRest.append({
                    "id": str(rest.id),
                    'nombre': rest.nombre,
                    'telefono': rest.telefono,
                    'email': rest.email,
                    'horario': rest.horario,
                    'logo': rest.logo,
                    'creado': rest.creado,
                    'estado': rest.estado,
                    'eslogan': rest.eslogan
                })
            output.append({
                "id": str(prod.id),
                'nombre': prod.nombre,
                'precio': prod.precio,
                'detalle': prod.detalle,
                'creado': prod.creado,
                'fotos': prod.fotos,
                # 'registrado_por': str(prod.registrado_por.id),
                'estado': prod.estado,
                'disponible': prod.disponible,
                'restaurante': outputRest
                # 'comentario': prod.
            })
        return jsonify({'resultado': output})


class ProductosGet(Resource):
    def get(self, id):
        output = []
        for prod in Producto.objects(restaurante=id):
            output.append({
                "id": str(prod.id),
                'nombre': prod.nombre,
                'precio': prod.precio,
                'detalle': prod.detalle,
                'creado': prod.creado,
                'fotos': prod.fotos,
                'registrado_por': str(prod.registrado_por.id),
                'estado': prod.estado,
                'disponible': prod.disponible,
                'restaurante': str(prod.restaurante.id)
                # 'comentario': prod.
            })
        return jsonify({'resultado': output})


class ProductoPorId(Resource):
    def get(self, id):
        if id is None or id is "":
            raise InvalidUsage(
                "Se debe ingresar un id del producto.", status_code=400)
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
                    'registrado_por': str(prod.registrado_por.id),
                    'estado': prod.estado,
                    'disponible': prod.disponible,
                    'restaurante': prod.restaurante
                })
            return jsonify({'resultado': output})
        except errors.ValidationError:
            return jsonify({'resultado': "No se existe." + id})


class CrearProducto(Resource):
    def post(self):
        _nombre = request.json['nombre']
        _precio = request.json['precio']
        _detalle = request.json['detalle']
        _registrado_por = request.json['registrado_por']
        _disponible = request.json['disponible']
        _restaurante = request.json['restaurante']
        _fotos = ""
        if request.json['fotos']:
            _fotos = request.json['fotos']
        if _nombre is None or _nombre is "":
            raise InvalidUsage("Se debe ingresar un nombre", status_code=400)
        if _precio is None or _precio is "":
            raise InvalidUsage("Se debe ingresar un precio", status_code=400)
        if _detalle is None or _detalle is "":
            raise InvalidUsage(
                "Se debe ingresar un detalle del producto.", status_code=400)
        if _registrado_por is None or _registrado_por is "":
            raise InvalidUsage(
                "Se debe ingresar un usuario como creador del producto.", status_code=400)
        if _disponible is None or _disponible is "":
            raise InvalidUsage(
                "El producto debe ser marcado como disponible o no.", status_code=400)
        if _restaurante is None or _restaurante is "":
            raise InvalidUsage(
                "Todo producto debe estar asociado a un restaurante.", status_code=400)
        producto = Producto(nombre=_nombre,
                            precio=_precio,
                            detalle=_detalle,
                            fotos=_fotos,
                            creado=datetime.now(),
                            registrado_por=_registrado_por,
                            disponible=_disponible,
                            restaurante=_restaurante,
                            ultima_actualizacion=datetime.now())
        try:
            producto.save()
        except errors.NotUniqueError as exc:
            return jsonify({'error': "Producto duplicado, " + _nombre})
        return jsonify({'resultado': "Ok"})


class MarcarDisponibilidadDelProducto(Resource):
    def post(self):
        _producto = request.json['producto']
        _esta_disponible = request.json['esta_disponible']
        if _producto is None or _producto is "":
            raise InvalidUsage("Se requiere un producto", status_code=400)
        if _esta_disponible is None or _esta_disponible is "":
            raise InvalidUsage(
                "Se debe enviar la disponiblidad", status_code=400)
        producto_a_marcar = Producto.objects(id=_producto)
        try:
            producto_a_marcar.update(disponible=_esta_disponible)
            producto_a_marcar.update(
                ultima_actualizacion=datetime.now()
            )
        except errors.NotUniqueError as exc:
            return jsonify({'error': "Producto duplicado, " + _producto})
        return jsonify({'resultado': "Ok"})


class ActualizarProducto(Resource):
    def put(self):
        _nombre = request.json['nombre']
        _precio = request.json['precio']
        _detalle = request.json['detalle']
        _id = request.json['id']
        _fotos = request.json['fotos']
        _estado = request.json['estado']
        _disponible = request.json['disponible']
        if _nombre is None or _nombre is "":
            raise InvalidUsage("Se debe ingresar un nombre", status_code=400)
        if _precio is None or _precio is "" or _precio == 0:
            raise InvalidUsage("Se debe ingresar un precio", status_code=400)
        if _detalle is None or _detalle is "":
            raise InvalidUsage(
                "Se debe ingresar un detalle del producto.", status_code=400)
        if _id is None or _id is "":
            raise InvalidUsage(
                "Se debe ingresar un id del producto.", status_code=400)
        if _estado is None or _estado is "":
            raise InvalidUsage("Se debe ingresar un estado.", status_code=400)
        if _estado != '1' and _estado != '0':
            raise InvalidUsage(
                "Solo se puede ingresar 1 o 0.", status_code=400)
        if _disponible is None or _disponible is "":
            raise InvalidUsage(
                "El producto debe ser marcado como disponible o no.", status_code=400)

        producto = Producto.objects(id=_id)
        try:
            producto.update(nombre=_nombre)
            producto.update(precio=_precio)
            producto.update(detalle=_detalle)
            producto.update(fotos=_fotos)
            producto.update(estado=_estado)
            producto.update(disponible=_disponible)
            producto.update(ultima_actualizacion=datetime.now())
        except errors.NotUniqueError as exc:
            return jsonify({'error': "Producto duplicado, " + _nombre})
        return jsonify({'resultado': "Ok"})


class BorrarProducto(Resource):
    def delete(self):
        _id = request.json['id']
        if _id is None or _id is "":
            raise InvalidUsage(
                "Se debe ingresar un id del producto.", status_code=400)
        try:
            Producto.objects(id=_id).delete()
        except errors.ValidationError:
            return jsonify({'error': "No se pudo eliminar, " + _id})
        return jsonify({'resultado': "Ok"})


class RestYCantidadDeProductos(Resource):
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
                'estado': rest.estado,
                'cantidadDeProductos': Producto.objects(restaurante=rest.id).count()
            })
        return jsonify({'resultado': output})
