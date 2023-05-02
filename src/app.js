const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const routes = require('./routes');
const connection = require('./utils/databases/connection');

const app = express();

app.use(cors({
  origin: '*',
  methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
  allowedHeaders: '*',
  AccessControlAllowOrigin: '*',
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(fileUpload({
  limits: { fileSize: 10 * 1024 * 1024 }
}));

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: false }));

// routes 
app.use('/', routes);

// connection 

try {
  connection.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

module.exports = app;