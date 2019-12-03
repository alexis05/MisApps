import json
import locale
from flask import jsonify
from bson import ObjectId
from flask import Flask, request
from flask_restful import Resource, Api
from flask_pymongo import PyMongo
from TurismoSettings.Config import app
from flask_cors import CORS

api = Api(app)
CORS(app)

mongo = PyMongo(app)

todos = {}


class Personas(Resource):
    def get(self):
        return {'hello': 'world'}


api.add_resource(Personas, '/')

#api.add_resource(ProductosEnGeneral, '/Productos')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=6060, debug=True)
