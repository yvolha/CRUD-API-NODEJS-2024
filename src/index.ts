import { createServer } from 'node:http';
import dotenv from 'dotenv';

import { printMagentaText } from './utils/get-color-coded-text';


dotenv.config();

const DEFAULT_SERVER_PORT = 4000;
const SERVER_PORT = process.env.SERVER_PORT || DEFAULT_SERVER_PORT;

const server = createServer((req, res) => {
  console.log(req.method, req.url, req.headers);


    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      data: 'Hello World!',
    }));
  });
  
 console.log(SERVER_PORT) 
server.listen(SERVER_PORT, () => console.log(printMagentaText(`The server is listening on http://localhost:${SERVER_PORT}\n\n`)));

// console.log('The Index is here!');