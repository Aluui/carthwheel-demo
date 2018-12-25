--DROP DATABASE if exists "cartwheel_db";
CREATE DATABASE "cartwheel_db";
\c "cartwheel_db";

CREATE USER "cartwheel_aluui" WITH PASSWORD 'cartwheel_t3st_p4ssw0rd';

GRANT ALL PRIVILEGES ON DATABASE "cartwheel_db" TO "cartwheel_aluui";

DROP TABLE if exists users;

Create table users(
	"Id" serial PRIMARY KEY,
	"Email" VARCHAR (355) UNIQUE NOT NULL,
	"FirstName" VARCHAR (50) NULL,
	"LastName" VARCHAR (50) NULL,
	"Password" VARCHAR (50) NULL,
	"CompanyName" VARCHAR (255) NULL,
	"DateCreated" TIMESTAMP NOT NULL,
	"LastLogin" TIMESTAMP
);

ALTER TABLE public.users
    OWNER to cartwheel_aluui;

DROP TABLE if exists IsAuthenticated;

CREATE TABLE IsAuthenticated (
	"Id" serial PRIMARY KEY,
	"UserId" integer references users("Id") NOT NULL,
	"LoginTime" TIMESTAMP NOT NULL,
	"AuthToken" varchar(100) NOT NULL,
	"AuthTokenExpiryDate" TIMESTAMP NOT NULL
);

ALTER TABLE public.IsAuthenticated 
    OWNER to cartwheel_aluui;

insert into users values 
(1, 'test@test.com', 'Test', 'User', 'password', 'Cartwheel demo', 
now(), null);

--insert into IsAuthenticated  values (1, '493 Queen', 'A lovely first home', '678 sqft', 2.5, 3);