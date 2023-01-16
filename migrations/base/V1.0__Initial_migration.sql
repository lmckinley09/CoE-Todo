CREATE TABLE app_user (
    id serial PRIMARY KEY,
    email_address varchar NOT NULL,
    first_name varchar NOT NULL,
    last_name varchar NOT NULL,
    password varchar NOT NULL,
    date_of_birth date,
    created timestamp DEFAULT CURRENT_TIMESTAMP,
    last_modified timestamp DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(email_address)
);

CREATE TABLE access_type (
    id serial PRIMARY KEY,
    description varchar NOT NULL
);

CREATE TABLE board (
    id serial PRIMARY KEY,
    name varchar NOT NULL,
    created timestamp DEFAULT CURRENT_TIMESTAMP,
    last_modified timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_board_type (
    id serial PRIMARY KEY,
    user_id integer,
    board_id integer,
    type_id integer,
    CONSTRAINT fk_user FOREIGN KEY (user_id)
        REFERENCES app_user(id),
    CONSTRAINT fk_board FOREIGN KEY (board_id)
        REFERENCES board(id),
        CONSTRAINT fk_type FOREIGN KEY (type_id)
            REFERENCES access_type(id)
);

CREATE TABLE job (
    id serial PRIMARY KEY,
    board_id integer,
    title varchar NOT NULL,
    description varchar,
    status varchar,
    completion_date date,
    created timestamp DEFAULT CURRENT_TIMESTAMP,
    last_modified timestamp DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_board FOREIGN KEY (board_id)
        REFERENCES board(id)
);

CREATE TABLE tick (
    id serial PRIMARY KEY,
    job_id integer,
    CONSTRAINT fk_job FOREIGN KEY (job_id)
        REFERENCES job(id)
);

CREATE TABLE task (
    id serial PRIMARY KEY,
    job_id integer,
    CONSTRAINT fk_job FOREIGN KEY (job_id)
        REFERENCES job(id)
);

CREATE TABLE project (
    id serial PRIMARY KEY,
    job_id integer,
    CONSTRAINT fk_job FOREIGN KEY (job_id)
        REFERENCES job(id)
);

CREATE TABLE project_job (
    project_job_id serial PRIMARY KEY,
    project_id integer,
    job_id integer,
    CONSTRAINT fk_project FOREIGN KEY (project_id)
        REFERENCES project(id),
    CONSTRAINT fk_job FOREIGN KEY (job_id)
            REFERENCES job(id),
            UNIQUE (project_id, job_id)
);
