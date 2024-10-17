import { createServer } from 'node:http';
import dotenv from 'dotenv';

import { RESPONSE_CODES } from './constants/response-codes.constant';
import { printMagentaText } from './utils/get-color-coded-text';
import { sendError } from './components/util/send-error';
import { handleRequest } from './components/request-handler';
import { INTERNAL_SERVER_ERROR } from './utils/get-error-message';


dotenv.config();

const DEFAULT_SERVER_PORT = 4000;
const SERVER_PORT = Number(process.env.SERVER_PORT) || DEFAULT_SERVER_PORT;
const HOSTNAME = 'localhost';

const server = createServer((req, res) => {
  try {
    handleRequest(req);
  } catch {
    sendError(res, RESPONSE_CODES.INTERNAL_SERVER_ERROR, INTERNAL_SERVER_ERROR);
  }
});
  
server.listen(
  SERVER_PORT,
  HOSTNAME,
  () => console.log(printMagentaText(`The server is listening on http://${HOSTNAME}:${SERVER_PORT}\n\n`))
);
