const http = require('http');
const { exec } = require('child_process');
const fs = require('fs');

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/code') {
    let body = '';

    req.on('data', (data) => {
      body += data;
    });

    req.on('end', () => {
      const { code } = JSON.parse(body);

      if (!code) {
        res.statusCode = 400;
        res.end('Code is missing');
        return;
      }

      fs.writeFileSync('code.py', code);

      exec('python3 code.py', (error, out, err) => {
        res.statusCode = 200;
        res.end(JSON.stringify({ error, out, err }));
      });
    });
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(3000, () => {
  console.log('server is running on port 3000');
});
