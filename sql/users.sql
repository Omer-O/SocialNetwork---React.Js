-- //the table is like users but add 2 more rows:
-- bio and imageUrl.
--
-- the pictures we need to store with S3 like in imageboard
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first VARCHAR(255) NOT NULL CHECK (first <> ''),
    last VARCHAR(255) NOT NULL CHECK (last <> ''),
    email TEXT NOT NULL UNIQUE CHECK (email <> ''),
    bio VARCHAR(255) NOT NULL,
    url VARCHAR(300) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
