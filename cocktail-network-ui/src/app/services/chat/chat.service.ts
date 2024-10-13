import { Injectable } from '@angular/core';
import { Client, Message, Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private stompClient: Client;

  constructor() {
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {

    const socket = new SockJS('http://localhost:8080/ws');

    this.stompClient = new Client({
      webSocketFactory: () => socket,
      debug: (str) => { console.log(str); },
      reconnectDelay: 5000,
    });


    this.stompClient.onConnect = (frame) => {
      console.log('Connected: ' + frame);

      this.stompClient.subscribe('/user/queue/messages', (message: Message) => {
        console.log('Message received: ', message.body);
      });
    };

    this.stompClient.onStompError = (frame) => {
      console.error('Broker error: ', frame.headers['message']);
    };

    this.stompClient.activate();
  }

  sendMessage(chatMessage: { senderId: string; recipientId: string; content: string }) {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.publish({
        destination: '/app/chat',
        body: JSON.stringify(chatMessage)
      });
    } else {
      console.error('Stomp client is not connected.');
    }
  }
  sendUser(user: any) {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.publish({
        destination: '/user.addUser',
        body: JSON.stringify(user)
      });
    } else {
      console.error('Stomp client is not connected.');
    }
  }

  disconnectUser(user: any) {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.publish({
        destination: '/user.disconnectUser',
        body: JSON.stringify(user)
      });
    } else {
      console.error('Stomp client is not connected.');
    }
  }

  disconnect() {
    if (this.stompClient && this.stompClient.active) {
      this.stompClient.deactivate();
    }
    console.log('Disconnected');
  }

}
