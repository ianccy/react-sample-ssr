import express from 'express';
import path from 'path';
import Loadable from 'react-loadable';

import render from './render';

const app = express();
const PORT = process.env.PORT || 4000;


app.use(express.Router().get('/', render));
app.use(express.static(path.resolve(__dirname, '../build')));
app.use(render);

// Loadable listener to make sure that all of your loadable components are already loaded
// https://github.com/jamiebuilds/react-loadable#preloading-all-your-loadable-components-on-the-server
Loadable.preloadAll().then(() => {
  app.listen(PORT, console.log(`App listening on port ${PORT}!`));
});
