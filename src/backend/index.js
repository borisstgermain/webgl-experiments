import middleware from './middleware';
import express from 'express';
import * as config from './config';

const app = express();
const port = config.server.port;
const host = config.server.host;

middleware({ app, express });

app.listen(port, host, () => {
  console.log(`Server running at ${host}:${port}`);
});
