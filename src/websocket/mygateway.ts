import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } }) // Configura CORS según sea necesario
export class MyGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: string): void {
    console.log('Mensaje recibido:', data);
    this.server.emit('message', `Respuesta desde el servidor: ${data}`);
  }
}
