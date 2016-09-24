import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import routers from '../routers';
import headers from './headers';

export default ({ app, express }) => {
  const staticDir = './app/public';

  app.use(compression()); // enable gzip

  headers(app);

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(cookieParser());

  app.use('/', express.static(staticDir));

  routers({ app });
};
