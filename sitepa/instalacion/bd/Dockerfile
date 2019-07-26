FROM ubuntu:18.04
ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update 
RUN apt-get -y install apt-utils iputils-ping
RUN rm -rf /etc/localtime
RUN ln -s /usr/share/zoneinfo/America/New_York /etc/localtime
RUN apt-get -y install tzdata
RUN apt-get -y install wget vim
RUN apt-get -y install mysql-server

RUN usermod -d /var/lib/mysql/ mysql
RUN sed -i s/bind-address/#bind-address/ /etc/mysql/mysql.conf.d/mysqld.cnf

COPY run.sh /opt/
RUN chmod 777 /opt/run.sh

EXPOSE 3306

CMD /opt/run.sh
