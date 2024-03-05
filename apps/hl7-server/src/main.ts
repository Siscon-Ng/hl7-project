/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

// import express from 'express';
// import * as path from 'path';


// const app = express();

// app.use('/assets', express.static(path.join(__dirname, 'assets')));

// app.get('/api', (req, res) => {
//   res.send({ message: 'Welcome to hl7-server!' });
// });

// const port = process.env.PORT || 3333;
// const server = app.listen(port, () => {
//   console.log(`Listening at http://localhost:${port}/api`);
// });
// server.on('error', console.error);
import { Server } from 'node-hl7-server'

const server = new Server({ bindAddress: '192.168.49.1' })

const inbound = server.createInbound({ port: 3000 }, async (req, res) => {
  await res.sendResponse('AA')
})

inbound.on('client.close', () => {
  console.log('Client Disconnected')
})

inbound.on('client.connect', () => {
  console.log('Client Connected')
})

inbound.on('data.raw', (data) => {
  console.log('Raw Data:', data)
})

inbound.on('listen', () => {
  console.log('Ready to Listen for Messages')
})
