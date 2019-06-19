DROP TABLE IF EXISTS chat_messages;

CREATE TABLE chat_messages(
    id SERIAL PRIMARY KEY,
    message TEXT,
    user_id INTEGER REFERENCES users(id) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
