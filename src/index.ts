import { createServer } from 'node:http';
import dotenv from 'dotenv';

import { RESPONSE_CODES } from './constants/response-codes.constant';
import { printBlueText, printMagentaText } from './utils/get-color-coded-text';

import { handleRequest } from './request-handler/request-handler';
import { INTERNAL_SERVER_ERROR } from './utils/get-message';
import { sendError } from './utils/send-error';


dotenv.config();

const DEFAULT_SERVER_PORT = 4000;
const SERVER_PORT = Number(process.env.SERVER_PORT) || DEFAULT_SERVER_PORT;
const HOSTNAME = 'localhost';

const server = createServer((req, res) => {
  try {
    handleRequest(req, res);
  } catch {
    sendError(res, RESPONSE_CODES.INTERNAL_SERVER_ERROR, INTERNAL_SERVER_ERROR);
  }
});
  
server.listen(
  SERVER_PORT,
  HOSTNAME,
  () => printMagentaText(`The server is listening on http://${HOSTNAME}:${SERVER_PORT}\n\n`)
);

process.on("SIGINT", () => {
  setImmediate(() => {
    printBlueText(`The server has stopped listening on http://${HOSTNAME}:${SERVER_PORT}\n\n`)
    process.exit(0)
  });
});