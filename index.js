// require your server and launch it here
const server = require('./api/server');
const port = 3000

server.listen(port, () => {
  console.log(`Server running on port:${port}`)
})