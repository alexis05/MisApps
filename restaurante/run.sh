#!/bin/sh
cd ..
cd ..
source ambiente/bin/activate
cd MisApps/restaurante
pip3 install -r r.txt
FLASK_APP=main.py flask run