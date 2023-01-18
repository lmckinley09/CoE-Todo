CREATE TABLE app_user (
    id serial PRIMARY KEY,
    email varchar NOT NULL,
    first_name varchar NOT NULL,
    last_name varchar NOT NULL,
    password varchar NOT NULL,
    profile_picture varchar NOT NULL,
    created timestamp DEFAULT CURRENT_TIMESTAMP,
    last_modified timestamp DEFAULT CURRENT_TIMESTAMP
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

CREATE TABLE user_board_access (
    id serial PRIMARY KEY,
    user_id integer NOT NULL,
    board_id integer NOT NULL,
    type_id integer NOT NULL,
     CONSTRAINT fk_user FOREIGN KEY (user_id)
        REFERENCES app_user(id) ON DELETE CASCADE,
    CONSTRAINT fk_board FOREIGN KEY (board_id)
        REFERENCES board(id) ON DELETE CASCADE,
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
        REFERENCES board(id) ON DELETE CASCADE
);

CREATE TABLE tick (
    id serial PRIMARY KEY,
    job_id integer,
    CONSTRAINT fk_job FOREIGN KEY (job_id)
        REFERENCES job(id) ON DELETE CASCADE
);

CREATE TABLE task (
    id serial PRIMARY KEY,
    job_id integer,
    CONSTRAINT fk_job FOREIGN KEY (job_id)
        REFERENCES job(id) ON DELETE CASCADE
);

CREATE TABLE project (
    id serial PRIMARY KEY,
    job_id integer,
    CONSTRAINT fk_job FOREIGN KEY (job_id)
        REFERENCES job(id) ON DELETE CASCADE
);

CREATE TABLE project_task (
    id serial PRIMARY KEY,
    project_id integer NOT NULL,
    task_id integer NOT NULL,
    CONSTRAINT fk_project FOREIGN KEY (project_id)
        REFERENCES project(id) ON DELETE CASCADE,
    CONSTRAINT fk_task FOREIGN KEY (task_id)
        REFERENCES task(id) ON DELETE CASCADE,
            UNIQUE (project_id, task_id)
);
