/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

// import express from 'express';
// import * as path from 'path';
import { Client, Message } from 'node-hl7-client';
import { HL7_2_3_1 } from  'node-hl7-client/lib/types/specification/2.3.1';

// const app = express();

// app.use('/assets', express.static(path.join(__dirname, 'assets')));

// app.get('/api', (req, res) => {
//   res.send({ message: 'Welcome to hl7-client!' });
// });
// const port = process.env.PORT || 3333;

// const server = app.listen(port, () => {
//   console.log(`Listening at http://localhost:${port}/api`);
// });
// server.on('error', console.error);

const client = new Client({ host: '192.168.49.1' })

const OB_ADT = client.createConnection({ port: 3000 }, async (res) => {
  const messageRes = res.getMessage()
  const check = messageRes.get('MSA.1').toString() // MSA is a Message Acknoedlgement Segment
  if (check === "AA") {
    console.log('conectado');
  } else {
    console.log('não  conectado')
  }
})
const message = new Message({
  specification: new HL7_2_3_1(), // we are doing spec 2.3
  messageHeader: {
    msh_9_1: 'ADT', // required, there is "set" table of data this can be
    msh_9_2: 'A01', // required, there is "set" table of data this can be
    msh_10: 'Q150084616T145947960', // randomized by the class or set by you.
    msh_11_1: 'P'   // required
  }
})
message.set('MSH.3', 'HNAM_PM')   // not required
message.set('MSH.4', 'HNA500')    // not required
message.set('MSH.5', 'AIG')       // not required
message.set('MSH.7', '20131017140041') // note: this is not required normally as Message sets this automaticlly, but you can override

OB_ADT.sendMessage(message);
