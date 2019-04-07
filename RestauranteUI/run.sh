#!/bin/sh
cd ..
cd ..
source ambiente/bin/activate
cd MisApps/RestauranteUI/restaurantes
npm run build
cd ..
pip3 install -r r.txt
export FLASK_RUN_PORT=8000
#export FLASK_DEBUG=1
#export FLASK_ENV=development
FLASK_APP=main.py flask run