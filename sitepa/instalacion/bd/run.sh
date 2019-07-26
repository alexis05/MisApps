#!/bin/bash
service mysql stop
service mysql start
if [ ! -f /var/mysql.1 ]; then 
	chown -R mysql:mysql /var/lib/mysql
	chown -R mysql:mysql /var/log/mysql
	chown -R mysql:mysql /var/run/mysql* 
	service mysql stop
	service mysql start
	mysql -u root -e "GRANT ALL PRIVILEGES ON *.* TO 'logwriter'@'%' IDENTIFIED BY 'logwriter' WITH GRANT OPTION;FLUSH PRIVILEGES;"
	touch /var/mysql.1
fi

tail -f /var/log/mysql/error.log
