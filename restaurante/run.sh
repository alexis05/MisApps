#!/bin/sh
cd ..
source venv/bin/activate
cd restaurante
pip3 install -r r.txt
FLASK_APP=main.py flask run