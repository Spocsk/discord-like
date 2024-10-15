import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private socket = io('http://localhost:3000');

  constructor(private http: HttpClient) {}

  getRooms(): Observable<any> {
    return this.http.get('http://localhost:3000/rooms');
  }

  createRoom(name: string): Observable<any> {
    return this.http.post('http://localhost:3000/rooms', { name });
  }

  joinRoom(roomId: string) {
    this.socket.emit('joinRoom', roomId);
  }

  sendMessage(roomId: string, message: string) {
    this.socket.emit('sendMessage', { roomId, message });
  }

  getMessages(): Observable<any> {
    let messageSubject = new Subject<any>();
    this.socket.on('newMessage', (message: any) => {
      messageSubject.next(message);
    });
    return messageSubject.asObservable();
  }
}
