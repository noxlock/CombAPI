create table role
(
    role_id   INTEGER not null,
    role_name VARCHAR not null,
    admin     INTEGER not null,
    moderator INTEGER not null,
    primary key (role_id)
);

create table user
(
    user_id  INTEGER     not null,
    username VARCHAR     not null,
    password VARCHAR(64) not null,
    role     INTEGER     not null,
    primary key (user_id),
    foreign key (role) references role
);

create table emoji
(
    emoji_id       INTEGER not null,
    name           VARCHAR not null,
    roles          INTEGER,
    users          INTEGER,
    require_colons INTEGER not null,
    managed        INTEGER not null,
    animated       INTEGER not null,
    primary key (emoji_id),
    foreign key (roles) references role,
    foreign key (users) references user
);

create unique index emoji_emoji_id_uindex
    on emoji (emoji_id);

create table message
(
    message_id       INTEGER not null,
    message_contents TEXT    not null,
    author           INTEGER not null,
    primary key (message_id),
    foreign key (author) references user
        on delete cascade
);

create table server
(
    server_id   INTEGER not null,
    server_name TEXT    not null,
    user        INTEGER not null,
    foreign key (user) references user
        on delete cascade
);

create unique index user_username_uindex
    on user (username);


