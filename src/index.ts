import { createServer } from 'node:http';
import dotenv from 'dotenv';
import cluster from 'node:cluster';
import { availableParallelism } from 'node:os';
import process from 'node:process';

import { RESPONSE_CODES } from './constants/response-codes.constant';
import { printBlueText, printGreenText, printMagentaText } from './utils/get-color-coded-text';

import { handleRequest } from './request-handler/request-handler';
import { INTERNAL_SERVER_ERROR } from './utils/get-message';
import { sendError } from './utils/send-error';


dotenv.config();

const DEFAULT_SERVER_PORT = 4000;
const SERVER_PORT = Number(process.env.SERVER_PORT) || DEFAULT_SERVER_PORT;
const HOSTNAME = 'localhost';

const CPUS_NUMBER = availableParallelism();
const CLUSTER_ARGV = '--cluster';
const CLUSTER_ARGV_INDEX = 2;

if (cluster.isPrimary && process.argv[CLUSTER_ARGV_INDEX] === CLUSTER_ARGV) {
  printGreenText(`Primary server ${process.pid} is running`);

  for (let i = 0; i < CPUS_NUMBER; i++) {
    cluster.fork();
  }

} else {
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
  
  if (process.argv[CLUSTER_ARGV_INDEX] === CLUSTER_ARGV) {
    printGreenText(`Worker ${process.pid} started`);
  }
  
  process.on("SIGINT", () => {
    setImmediate(() => {
      printBlueText(`The server has stopped listening on http://${HOSTNAME}:${SERVER_PORT}\n\n`)
      process.exit(0)
    });
  });
}