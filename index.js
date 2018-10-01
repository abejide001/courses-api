const express = require('express');
const morgan = require('morgan');
const config = require('config');
const debug = require('debug')('app:debug');
const course = require('./routes/courses');

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(morgan('tiny'));
app.get('env');
debug(config.get('mail.password'));
app.use('/api/course', course);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  debug(`App listening on ${port}`);
});
