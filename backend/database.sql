CREATE TABLE user (
  id int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  firstname varchar(100) NOT NULL,
  lastname varchar(100) NOT NULL,
  username varchar(100) NOT NULL UNIQUE,
  email varchar(100) NOT NULL UNIQUE,
  hashedPassword varchar(100) NOT NULL,
  tel_number varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO user (firstname, lastname, username, email, hashedPassword, tel_number) VALUES ('Romain', 'Bronquard', 'DarkOviS', 'romain.bronquard@gmail.com', '$argon2id$v=19$m=65536,t=5,p=1$Y/PhXl9Ukq1V0c0GEvPphA$f2Jbmd0ufr8sle2EohUQu3v8BHbj/QoOtKuZ81yNxv0', '0670046610')

CREATE TABLE project (
   id int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
   title varchar(100) NOT NULL,
   description text NOT NULL,
   link varchar(100) NOT NULL,
   start_year int(4) NOT NULL,
   end_year int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO project (title, description, link, start_year, end_year) VALUES ('Origins Digital', 'Notre objectif était de créer un site web
de streaming de vidéos sportives en respectant le cahier des
charges fourni par le client.', 'https://github.com/DarkOviS/2022-09-JS-Reims-project-3-origins-digital', '2022', '2023')

CREATE TABLE skill (
  id int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  type varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
INSERT INTO skill (name, type) VALUES ('React', 'hard')
