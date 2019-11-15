const http = require('http');
const serverHandle = require('./serverHandle');
const server = http.createServer(serverHandle);
const port = process.env.PORT || 3000;

server.listen(port, () => console.log(`Server @ Running ${port}`));
