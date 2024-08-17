CREATE DATABASE IF NOT EXISTS my_database;
CREATE USER 'admin'@'%' IDENTIFIED BY 'ttpassword1';
GRANT ALL PRIVILEGES ON my_database.* TO 'admin'@'%';
FLUSH PRIVILEGES;