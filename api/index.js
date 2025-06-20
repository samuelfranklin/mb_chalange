const express = require('express');
const Datastore = require('nedb-promises');

const app = express();

app.use(express.json());

const db = Datastore.create({ filename: './database/users.db'})