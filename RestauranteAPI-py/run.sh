#!/bin/sh
cd ..
cd ..
source ambiente/bin/activate
cd MisApps/RestauranteAPI
pip3 install -r r.txt
#export FLASK_DEBUG=1
#export FLASK_ENV=development
FLASK_APP=main.py flask run