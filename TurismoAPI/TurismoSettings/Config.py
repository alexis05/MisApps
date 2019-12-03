
from flask import Flask
from mongoengine import *
# 192.168.99.100:32777
connect('turismo_ab', host='192.168.0.6', port=27017)

app = Flask(__name__)
#app.config['CONNECT'] = connect('turismo_ab', host='localhost', port=32768)
app.config['TESTING'] = True
app.config['MONGO_DBNAME'] = 'turismo_ab'
app.config["MONGO_URI"] = "mongodb://192.168.0.6:27017/turismo_ab"
app.config['JSON_AS_ASCII'] = True
