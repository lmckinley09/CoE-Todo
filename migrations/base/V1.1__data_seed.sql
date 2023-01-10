DO $$

DECLARE USER_ID integer;
DECLARE BOARD_ID integer;
DECLARE TASK_JOB_ID integer;
DECLARE PROJECT_JOB_ID integer;
DECLARE PROJECT_ID integer;

BEGIN

INSERT INTO app_user
(email_address, first_name, last_name, password, date_of_birth, created, last_modified)
VALUES('lorna@lorna.com', 'Lorna', 'Mckinley', 'password', '1996-09-26', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO board
("name", created, last_modified)
VALUES('Lorna''s Board', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING id INTO BOARD_ID;

INSERT INTO access_type
(description)
VALUES('owner');
INSERT INTO access_type
(description)
VALUES('viewer');
INSERT INTO access_type
(description)
VALUES('editer');

INSERT INTO user_board_type
(user_id, board_id, type_id)
VALUES( USER_ID, BOARD_ID,(select id from access_type where description = 'owner'));

INSERT INTO job
(board_id, title, description, status, completion_date, created, last_modified)
VALUES(
  BOARD_ID, 'Lorna''s First Task', '', 'Not Started',CURRENT_DATE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
  RETURNING id INTO TASK_JOB_ID;

INSERT INTO job
  (board_id, title, description, status, completion_date, created, last_modified)
  VALUES(
    BOARD_ID, 'Lorna''s First Project', '', 'Not Started',CURRENT_DATE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    RETURNING id INTO PROJECT_JOB_ID;

INSERT INTO task
 (job_id)
 VALUES(TASK_JOB_ID);

 INSERT INTO project
  (job_id)
  VALUES(PROJECT_JOB_ID)
  RETURNING id INTO PROJECT_ID;

  INSERT INTO project_job
   (project_id,job_id)
   VALUES(PROJECT_ID,TASK_JOB_ID);

 END $$;
