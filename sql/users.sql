-- //the table is like users but add 2 more rows:
-- bio and imageUrl.
--
-- the pictures we need to store with S3 like in imageboard
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first VARCHAR(255) NOT NULL,
    last VARCHAR(255) NOT NULL,
    email TEXT NOT NULL UNIQUE,
    bio VARCHAR(255),
    url VARCHAR(300),
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
