require('dotenv/config');

const path = require('node:path');
const express = require('express');

const assetsPath = path.join(__dirname, 'views');
const app = express();
const PORT = process.env.PORT || 8000;

app.set('views', assetsPath);
app.set('view engine', 'ejs');
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

// Routes Here

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

