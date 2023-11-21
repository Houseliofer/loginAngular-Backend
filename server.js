const http = require('http');
const app = require('./app');   // Path: app.js

const port = process.env.PORT || 3000;  // Port: 3000

const server = http.createServer(app);  // Create server

server.listen(port);   // Listen port