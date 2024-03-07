/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import Server from 'node-hl7-server';

async function bootstrap() {
  const port = Number(process.env.PORT) || 3000;
  const app = await NestFactory.create(AppModule);
  const server = new Server({ bindAddress: '192.168.49.1' })
  const inbound = server.createInbound({ port: 3500 }, async (req, res) => {
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
    const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
