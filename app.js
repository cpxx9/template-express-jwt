require('dotenv/config');
require('./config/passport');
const path = require('node:path');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const { indexRouter } = require('./routes/indexRouter');
const { notFound } = require('./utils/auth');
const { errorController } = require('./errors/errorController');

const assetsPath = path.join(__dirname, 'views');
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: false }));

// Routes Here
app.use('/api', indexRouter);
app.use('*', notFound);
app.use(errorController);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
