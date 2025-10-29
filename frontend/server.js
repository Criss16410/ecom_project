const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'public')));

// proxy shortcut for simple local development
app.use('/api', (req, res) => {
  const request = require('node:http').request;
  const http = require('http');
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: req.originalUrl.replace('/api', ''),
    method: req.method,
    headers: req.headers
  };
  const proxy = http.request(options, function (pres) {
    res.writeHead(pres.statusCode, pres.headers);
    pres.pipe(res, {end:true});
  });
  req.pipe(proxy, {end:true});
  proxy.on('error', (e)=> res.status(502).send('bad gateway'));
});

const port = process.env.PORT || 5000;
app.listen(port, ()=> console.log(`Frontend serving on ${port}`));
