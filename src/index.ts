import { createServer } from 'node:http';
import dotenv from 'dotenv';

import { printMagentaText } from './utils/get-color-coded-text';


dotenv.config();

const DEFAULT_SERVER_PORT = 4000;
const SERVER_PORT = Number(process.env.SERVER_PORT) || DEFAULT_SERVER_PORT;
const HOSTNAME = 'localhost';

const server = createServer((req, res) => {
  console.log(req.method, req.url, req.headers);

  try {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      data: 'Hello World!',
    }));
    
  } catch {
    res.writeHead(500);
    res.end(JSON.stringify({
      data: 'Hello World!',
    }));
  }

   
  });
  
 console.log(SERVER_PORT) 
server.listen(
  SERVER_PORT,
  HOSTNAME,
  () => console.log(printMagentaText(`The server is listening on http://${HOSTNAME}:${SERVER_PORT}\n\n`))
);

// console.log('The Index is here!');