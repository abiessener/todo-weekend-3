CREATE TABLE tasks (
id SERIAL PRIMARY KEY,
task VARCHAR(140),
complete BOOLEAN
);

INSERT INTO tasks (task, complete)
VALUES ('sweep the floor', true),
('order pizza', false),
('find the stupid flonase', false),
('Dishes. Always and forever, dishes.', false)