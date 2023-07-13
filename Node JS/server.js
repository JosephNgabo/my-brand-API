const express = require('express');
const PORT = process.env.PORT || 5000;
const app = express();
const { dbConnect } = require('./src/config/db');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
dbConnect();

app.use(express.static('public'));
app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
app.get('/', (req, res) => {
  res.json('Welcome to my brand server').status(200);
});
