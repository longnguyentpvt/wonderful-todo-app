import dayjs from "dayjs";
import http from "http";

import { config as dbConfig } from "@app/db";

import { configuration } from "@app/data/configuration";

import app from "./app";

const { port: listeningPort } = configuration;

dbConfig();
const server = http.createServer(app);
server.listen(listeningPort, () => {
  console.info(`App listening on port ${ listeningPort } at ${ dayjs().tz().format() }`);
});
