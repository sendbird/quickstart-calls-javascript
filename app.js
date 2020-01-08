const express = require('express');
const app = new express();
const port = 9000;

app.use(express.static('dist'));
app.use(express.static('./'));

app.get('/', (req, res) => {
  res.sendfile('index.html');
});

app.listen(port, () => {
  console.log(`SAMPLE SERVER LISTENING ON 127.0.0.1:${port}`);
});
