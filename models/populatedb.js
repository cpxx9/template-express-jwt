#! /usr/bin/env node
require('dotenv/config');
const { Client } = require('pg');
const { argv } = require('node:process');

const SQL = `
CREATE TABLE IF NOT EXISTS users (
  user_id INTEGER GENERATED ALWAYS AS IDENTITY,
  firstname VARCHAR ( 255 ),
  lastname VARCHAR ( 255 ),
  email VARCHAR ( 255 ) UNIQUE,
  admin BOOLEAN DEFAULT FALSE,
  member BOOLEAN DEFAULT FALSE,
  hash TEXT,
  salt TEXT,
  CONSTRAINT users_pkey PRIMARY KEY (user_id)
);

CREATE TABLE IF NOT EXISTS messages (
  message_id INTEGER GENERATED ALWAYS AS IDENTITY,
  user_id INTEGER NOT NULL,
  title VARCHAR ( 128 ),
  text TEXT,
  created timestamp without time zone NOT NULL DEFAULT now(),
  CONSTRAINT messages_pkey PRIMARY KEY (message_id),
  CONSTRAINT messages_user_fkey FOREIGN KEY(user_id)
    REFERENCES users(user_id) MATCH SIMPLE
      ON UPDATE CASCADE
      ON DELETE RESTRICT
);
`;

const connectionString =
  argv[2] ||
  `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

async function main() {
  console.log('seeding...');
  const client = new Client({
    connectionString,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log('done');
}

main();
