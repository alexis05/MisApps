FROM python:3
#MAINTAINER Rajdeep Dua "dua_rajdeep@yahoo.com"

#RUN apt-get update -y
#RUN apt-get install -y python-pip python-dev build-essential
COPY . /RestauranteAPI
WORKDIR /RestauranteAPI
RUN ls -la /RestauranteAPI/*
EXPOSE 5050
RUN pip install -r requirements.txt
CMD [ "python", "/RestauranteAPI/main.py" ]