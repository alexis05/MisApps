import os
import unittest
from flask import Flask
from TurismoDocuments.Models import Turista


class CrearTurista(unittest.TestCase):

    def setUp(self):
        app = Flask(__name__)
        app.config['TESTING'] = True
        app.config['MONGO_DBNAME'] = 'turismo_ab_test'
        app.config["MONGO_URI"] = "mongodb://192.168.0.6:27017/turismo_ab_test"

    def tearDown(self):
        pass

    def crear_turista(self):
        u = Turista(
            nombre='Alexis Batista',
            telefono='68416321',
            email='alexis05batista@gmail.com',
            nacimiento='',
            domicilio='Corregimiento de chiriqui',
            clave='123456',
            foto='')
        u.save()


if __name__ == "__main__":
    unittest.main()
