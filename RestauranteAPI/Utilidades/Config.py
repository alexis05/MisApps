
from flask import Flask
from mongoengine import *
# 192.168.99.100:32777
connect('rest_ab', host='localhost', port=27017)

app = Flask(__name__)
#app.config['CONNECT'] = connect('rest_ab', host='localhost', port=32768)
app.config['TESTING'] = True
app.config['MONGO_DBNAME'] = 'rest_ab'
app.config["MONGO_URI"] = "mongodb://localhost:27017/rest_ab"
#app.config['JSON_AS_ASCII'] = True
