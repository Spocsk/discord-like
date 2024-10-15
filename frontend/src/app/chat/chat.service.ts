import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  messages$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  token: string = localStorage.getItem('access_token') || '';
  private socket = io('http://localhost:3001', {
    extraHeaders: {
      Authorization: `Bearer ${this.token}`,
    },
  });

  constructor(private http: HttpClient) {
    this.socket.on('receiveMessage', (message: any) => {
      this.messages$.next([...this.messages$.getValue(), { sender: message.sender, content: message.content }]);
    });
  }

  getRooms(): Observable<any> {
    return this.http.get('http://localhost:3001/rooms');
  }

  createRoom(name: string): Observable<any> {
    return this.http.post('http://localhost:3001/rooms', { name });
  }

  joinRoom(roomId: string) {
    this.socket.emit('joinRoom', roomId);
  }

  sendMessage(message: string, sender: string) {
    console.log('sendMessage', message, sender);
    this.socket.emit('sendMessage', { content: message, sender });
  }

  getMessagesWS$(): Observable<any> {
    return this.messages$.asObservable();
  }

  getAllMessages$(): Observable<any> {
    return this.http.get('http://localhost:3001/messages/all', {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }
}
