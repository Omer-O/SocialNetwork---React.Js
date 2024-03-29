DROP TABLE IF EXISTS friendRequest;

CREATE TABLE friendRequest(
    id SERIAL PRIMARY KEY,
    sender_id INTEGER REFERENCES users(id) NOT NULL,
    reciever_id INTEGER REFERENCES users(id) NOT NULL,
    accepted BOOLEAN DEFAULT FALSE NOT NULL
);
