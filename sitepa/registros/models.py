from __future__ import unicode_literals

from django.db.models import Value
from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.db.models.functions import Concat
from datetime import datetime

# Create your models here.
ESTADO_DE_LA_PERSONA = [
    ('0', 'Inactivo'),
    ('1', 'Activo'),
]

SEXO_DE_LA_PERSONA = [
    ('H', 'Hombre'),
    ('M', 'Mujer'),
]
ESTADOS_CIVIL = [
    ('0', 'Soltero/a'),
    ('1', 'Comprometido/a'),
    ('2', 'En Relacion ( mas de 1 Anio de noviazgo)'),
    ('3', 'Casado/a'),
    ('4', 'Union libre'),
    ('5', 'Separado/a'),
    ('6', 'Divorciado/a'),
    ('7', 'Viudo/a'),
    ('8', 'Noviazgo(periodo inferior a 1 anio de relacion amorosa)'),
]
TIPO_DE_IDENTICADORES = [
    ('0', 'Texto'),
    ('1', 'Si/No'),
    ('2', 'Eleccion'),
    ('3', 'Numero'),
]


class JuntaComunal(models.Model):
    nombre = models.CharField(max_length=100)
    ubicacion = models.CharField(max_length=400)
    telefono = models.CharField(max_length=15)
    encargado = models.CharField(max_length=100)

    class Meta:
        verbose_name_plural = 'Junta Comnunales'
        verbose_name = 'Junta comunal'

    def __str__(self):
        return '%s' % (self.nombre)


class Persona(models.Model):
    estado = models.CharField(max_length=1, choices=ESTADO_DE_LA_PERSONA)
    nombre = models.CharField(max_length=80)
    apellido = models.CharField(max_length=80)
    cedula = models.CharField(max_length=15)
    nacimiento = models.DateField()
    telefono_celular = models.CharField(max_length=15)
    telefono_casa = models.CharField(max_length=15)
    domicilio = models.CharField(max_length=400)
    sexo = models.CharField(max_length=1, choices=SEXO_DE_LA_PERSONA)
    estado_civil = models.CharField(max_length=1, choices=ESTADOS_CIVIL)

    @property
    def edad(self):
        return int((datetime.now().date() - self.nacimiento).days / 365.25)

    def full_name(self):
        return self.nombre + ' ' + self.apellido + ' (edad:'+str(self.edad)+')'
    full_name.admin_order_field = Concat('nombre', Value(' '), 'apellido')

    class Meta:
        verbose_name_plural = 'Personas'
        verbose_name = 'Persona'

    def __str__(self):
        # return '%s %s, cedula: %s' % (self.nombre, self.apellido, self.cedula)
        return self.full_name()


class Atributo(models.Model):
    identificador = models.CharField(max_length=300)
    tipo = models.CharField(max_length=1, choices=TIPO_DE_IDENTICADORES)


class AtributoAPersona(models.Model):
    #members = models.ManyToManyField(Persona, through='Membership')
    persona = models.ForeignKey(Persona, on_delete=models.CASCADE)
    atributo = models.ForeignKey(Atributo, on_delete=models.CASCADE)


# class Membership(models.Model):
    #person = models.ForeignKey(Persona, on_delete=models.CASCADE)
    #group = models.ForeignKey(Group, on_delete=models.CASCADE)
    #date_joined = models.DateField()
    #invite_reason = models.CharField(max_length=64)


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(max_length=500, blank=True)
    location = models.CharField(max_length=30, blank=True)
    birth_date = models.DateField(null=True, blank=True)


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
