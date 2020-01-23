CREATE TABLE user(
    user_id INTEGER PRIMARY KEY,
    username VARCHAR NOT NULL,
    'password' VARCHAR NOT NULL,
    'role' INTEGER,
    FOREIGN KEY ('role') REFERENCES 'role'(role_id)

);

CREATE TABLE 'server'(
    server_id INTEGER PRIMARY KEY,
    server_name TEXT NOT NULL,
    user INTEGER,
    FOREIGN KEY (user) REFERENCES user(user_id)
);


CREATE TABLE 'role'(
    role_id INTEGER PRIMARY KEY,
    role_name VARCHAR,
    'admin' INTEGER,
    moderator INTEGER
);

CREATE TABLE 'message'(
    message_id INTEGER PRIMARY KEY,
    message_contents TEXT NOT NULL,
    author INTEGER,
    FOREIGN KEY (author) REFERENCES user(user_id)
);