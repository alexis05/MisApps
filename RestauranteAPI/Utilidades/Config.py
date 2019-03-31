
from flask import Flask
from mongoengine import *
#192.168.99.100:32777
connect('rest_ab', host='192.168.99.100', port=32777)

app = Flask(__name__)
#app.config['CONNECT'] = connect('rest_ab', host='localhost', port=32768)
app.config['TESTING'] = True
app.config['MONGO_DBNAME'] = 'rest_ab'
app.config["MONGO_URI"] = "mongodb://192.168.99.100:32777/rest_ab"

