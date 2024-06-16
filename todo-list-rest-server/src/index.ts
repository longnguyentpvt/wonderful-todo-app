import dayjs from "dayjs";
import http from "http";

import { configuration } from "@app/data/configuration";

import app from "./app";

const { port: listeningPort } = configuration;

const server = http.createServer(app);
server.listen(listeningPort, () => {
  console.info(`App listening on port ${ listeningPort } at ${ dayjs().tz().format() }`);
});
