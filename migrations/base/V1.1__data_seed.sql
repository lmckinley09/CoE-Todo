INSERT INTO app_user
(email_address, first_name, last_name, password, date_of_birth, created, last_modified)
VALUES('lorna@lorna.com', 'Lorna', 'Mckinley', 'password', '1996-09-26', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO app_user
(email_address, first_name, last_name, password, date_of_birth, created, last_modified)
VALUES('jane@jane.com', 'Jane', 'Mckinley', 'password', '1986-011-26', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO board
("name", created, last_modified)
VALUES('Lorna''s Board', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO board
("name", created, last_modified)
VALUES('Jane''s Board', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO type
(description)
VALUES('owner');
INSERT INTO type
(description)
VALUES('viewer');
INSERT INTO type
(description)
VALUES('editer');

INSERT INTO user_board
(user_id, board_id)
VALUES(
  (select id from app_user where email_address = 'lorna@lorna.com'),
  (select id from board where name = 'Lorna''s Board')
 );

 --  INSERT INTO user_board_type
 -- (user_board_id, type_id)
 -- VALUES(
 -- (select id from user_board where ), //not sure how to get
 -- (select id from type where description = 'owner')
 -- );


 INSERT INTO job
(board_id, title, description, status, completion_date, created, last_modified)
VALUES(
  (select id from board where name = 'Lorna''s Board'),
 'Lorna''s First Task', '', 'Not Started',CURRENT_DATE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

 INSERT INTO task
 (job_id)
 VALUES(
   (select id from job where title = 'Lorna''s First Task')
 );
