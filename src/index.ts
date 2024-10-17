import { createServer } from 'node:http';
import dotenv from 'dotenv';

import { RESPONSE_CODES } from './constants/response-codes.constant';
import { printMagentaText } from './utils/get-color-coded-text';
import { sendError } from './utils/send-error';
import { handleRequest } from './components/request-handler';
import { INTERNAL_SERVER_ERROR } from './utils/get-error-message';


dotenv.config();

const DEFAULT_SERVER_PORT = 4000;
const SERVER_PORT = Number(process.env.SERVER_PORT) || DEFAULT_SERVER_PORT;
const HOSTNAME = 'localhost';

const server = createServer((req, res) => {
  console.log(req.method, req.url, req.headers);

  try {
    handleRequest(req);
    
  } catch {

    sendError(res, RESPONSE_CODES.INTERNAL_SERVER_ERROR, INTERNAL_SERVER_ERROR);
  }

});
  
 console.log(SERVER_PORT) 
server.listen(
  SERVER_PORT,
  HOSTNAME,
  () => console.log(printMagentaText(`The server is listening on http://${HOSTNAME}:${SERVER_PORT}\n\n`))
);

// console.log('The Index is here!');