require('dotenv/config');
require('./config/passport');
const path = require('node:path');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const PgSession = require('connect-pg-simple')(session);
const pgPool = require('./models/pool');
const { indexRouter } = require('./routes/indexRouter');
const { loginRouter } = require('./routes/loginRouter');

const assetsPath = path.join(__dirname, 'views');
const app = express();
const PORT = process.env.PORT || 8000;

app.set('views', assetsPath);
app.set('view engine', 'ejs');
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    store: new PgSession({ pool: pgPool }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.session());

// Routes Here
app.use('/', indexRouter);
app.use('/login', loginRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
