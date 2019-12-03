import datetime
from mongoengine import *

ESTADO = (('1', 'Activo'),
          ('0', 'Inactivo'))

PLAN = (('2', 'Moroso'),
        ('1', 'Activo'),
        ('0', 'Inactivo'))

CALIFICACION = (
    (1, 'Muy Bueno'),
    (2, 'Bueno'),
    (3, 'Normal'),
    (4, 'Malo'),
    (5, 'Muy Malo'))


ROLES = (('1', 'SuperAdmin'),
         ('2', 'Admin'),
         ('3', 'Soporte'),
         ('4', 'Turista'),
         ('5', 'Guia'),
         ('6', 'Socios'))

GRUPOSANGUINEO = (('', ''),
                  )


def _not_empty(val):
    if not val:
        raise ValidationError('El valor no puede estar vacio.')


class Perfil(Document):
    nombre = StringField(required=True, unique=True, validation=_not_empty)
    telefono = StringField()
    email = EmailField(required=True, unique=True)
    creado = DateTimeField(default=datetime.datetime.now())
    nacimiento = DateField()
    domicilio = StringField()
    clave = StringField(required=True, min_length=8, validation=_not_empty)
    foto = StringField()
    estado = StringField(choices=ESTADO, default='1')


class Turista(Document):
    perfil = ReferenceField(Perfil)
    grupo_sanguineo = StringField(choices=GRUPOSANGUINEO)
    nombre_contacto_emergencia = StringField()
    numero_contacto_emergencia = StringField()
    alergias_reacciones = StringField
    nota_medicas = StringField()


class Guia(Document):
    guia = ReferenceField(Perfil)
    grupo_sanguineo = StringField(choices=GRUPOSANGUINEO)
    nombre_contacto_emergencia = StringField()
    numero_contacto_emergencia = StringField()
    alergias_reacciones = StringField
    nota_medicas = StringField()
    calificaciones = StringField()
    # cantidad de visitas


class PostDelGuia(Document):
    guia = ReferenceField(Guia)
    fecha = DateTimeField()
    finaliza = DateTimeField()
    publicado = DateTimeField()
    ubicacion = StringField()
    costo = DecimalField()
    estado = StringField(choices=ESTADO, default='1')
    detalle = StringField()
    # hashtag = StringField()  # Pensar un poco mejor esto, debe ser busquedas globlales
    # cantidad de visitas


class Socio(Document):
    socio = ReferenceField(Perfil)
    estado = StringField(choices=PLAN, default='0')
    # cantidad de visitas


class Eventos(Document):
    socio = ReferenceField(Socio)
    fecha = DateTimeField()
    publicado = DateTimeField()
    finaliza = DateTimeField()
    geoubicacio = GeoPointField()
    estado = StringField(choices=ESTADO, default='1')
    # cantidad de visitas


class Admin(Document):
    admin = ReferenceField(Perfil)


class ItemSuscripcion(Document):
    clase = StringField()
    referencia = StringField()


# class Suscripciones(Document):
#    Suscripciones = MapField(EmbeddedDocumentField(ItemSuscripcion))
#    turista = ReferenceField(Turista)
