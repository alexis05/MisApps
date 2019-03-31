import datetime
from mongoengine import *

ESTADO = (('1', 'Activo'),
        ('0', 'Inactivo'))

class Restaurante(Document):
    nombre = StringField(required=True, unique=True)
    telefono = StringField()
    email = StringField(required=True,unique=True)
    horario = StringField(required=True)
    logo = StringField()
    creado = DateTimeField(default=datetime.datetime.now())
    estado = StringField(choices=ESTADO, default='1')

class Usuario(Document):
    nombre = StringField(required=True, max_length=200)
    email = StringField(required=True, unique=True)
    telefono = StringField(required=False, max_length=50)
    direccion = StringField(required=False)
    creado = DateTimeField(default=datetime.datetime.now())
    clave = StringField(required=True, min_length=8)
    foto = StringField()
    estado = StringField(choices=ESTADO, default='1')

ROLES = (('1', 'SuperAdmin'),
        ('2', 'Admin'),
        ('3', 'Asistente'),
        ('4', 'Soporte'))

class Encargado(Document):
    restaurante = ReferenceField(Restaurante)
    usuario = ReferenceField(Usuario, unique=True)
    role = StringField(choices=ROLES)
    estado = StringField(choices=ESTADO, default='1')

class Producto(Document):
    nombre = StringField(required=True, max_length=300, unique=True)
    precio = FloatField(required=True)
    detalle = StringField(required=False)
    creado = DateTimeField(default=datetime.datetime.now())
    fotos = StringField()
    registrado_por = ReferenceField(Encargado)
    estado = StringField(choices=ESTADO, default='1')