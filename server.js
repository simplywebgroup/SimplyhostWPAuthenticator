const { createServer } = require('http');
const next = require('next');

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const host = '127.0.0.1';

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    handle(req, res);
  })
    .once('error', (err) => {
      console.error('Server error', err);
      process.exit(1);
    })
    .listen(port, host, () => {
      console.log(`Ready on http://${host}:${port}`);
    });
});
