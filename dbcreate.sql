-- This is a pair of postgres SQL queries to set up the initial table to test the Full Stack To Do webapp

CREATE TABLE tasks (
id SERIAL PRIMARY KEY,
task VARCHAR(140),
complete BOOLEAN
);

INSERT INTO tasks (task, complete)
VALUES ('sweep the floor', true),
('order pizza', false),
('find the flonase', false),
('Dishes. Always and forever, dishes.', false)