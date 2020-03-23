from mongoengine import *

# TODO: ver si se puede adaptar a turismo
# viajes
# guias

ESTADO = (('1', 'Activo'),
          ('0', 'Inactivo'))

CALIFICACION = (
    (1, 'Excelente'),
    (2, 'Bueno'),
    (3, 'Normal'),
    (4, 'Malo'),
    (5, 'Pesimo'))

ROLES = (('a1', 'SuperAdmin'),
         ('b2', 'Admin'),
         ('c3', 'Asistente'),
         ('d4', 'Soporte'),
         ('e5', 'comprador'))


class Comentarios(Document):
    texto = StringField()


class Restaurante(Document):
    nombre = StringField(required=True, unique=True)
    telefono = StringField()
    email = StringField(required=True, unique=True)
    horario = StringField(required=True)
    logo = StringField()
    creado = DateTimeField()
    estado = StringField(choices=ESTADO, default='1')
    eslogan = StringField()
    #comentarios = ListField(ReferenceField(Comentarios))
    #calificaciones = ListField(IntField())


class Usuario(Document):
    nombre = StringField(required=True, max_length=200)
    email = StringField(required=True, unique=True)
    telefono = StringField(required=False, max_length=50)
    direccion = StringField(required=False)
    creado = DateTimeField()
    clave = StringField(required=True, min_length=8)
    foto = StringField()
    estado = StringField(choices=ESTADO, default='1')
    role = StringField(choices=ROLES)


class Encargado(Document):
    restaurante = ReferenceField(Restaurante)
    usuario = ReferenceField(Usuario, unique=True)
    estado = StringField(choices=ESTADO, default='1')


class Producto(Document):
    nombre = StringField(required=True, max_length=300, unique=True)
    precio = FloatField(required=True)
    detalle = StringField(required=False)
    creado = DateTimeField()
    ultima_actualizacion = DateTimeField()
    fotos = StringField()
    registrado_por = ReferenceField(Encargado)
    estado = StringField(choices=ESTADO, default='1')
    disponible = BooleanField(required=True, default=True)
    comentarios = ListField(ReferenceField(Comentarios))
    restaurante = ReferenceField(Restaurante)


class Carrito(Document):
    productos = ListField(ReferenceField(Producto))
    restaurante = ReferenceField(Restaurante)
    usuario = ReferenceField(Usuario)


class Pedido(Document):
    carrito = ReferenceField(Carrito)
    fecha = DateTimeField()
    monto_pagado = DecimalField(required=True)
    lugar_de_entrega = StringField(required=True)
    observaciones = StringField()
