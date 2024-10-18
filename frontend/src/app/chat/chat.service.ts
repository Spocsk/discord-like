import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private roomId: BehaviorSubject<string> = new BehaviorSubject<string>('');
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

  getRooms$(): Observable<any> {
    return this.http.get('http://localhost:3001/rooms', {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  createRoom$(name: string): Observable<any> {
    console.log(`Creating room: ${name}`);
    return this.http.post(
      'http://localhost:3001/rooms',
      { name },
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  }

  sendMessage(message: string, sender: string, roomId: string) {
    console.log(`Sending message: ${message} from ${sender} to room: ${roomId}`);
    this.socket.emit('message', { content: message, sender, roomId });
  }

  getMessagesFromRoomId$(roomId: string): Observable<any> {
    return this.http.get(`http://localhost:3001/rooms/messages/${roomId}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  listenToMessagesRoom(roomId: string) {
    this.socket.on(roomId, (message: any) => {
      this.messages$.next([...this.messages$.getValue(), { sender: message.sender, content: message.content }]);
    });
  }

  joinRoom(roomId: string) {
    this.socket.emit('joinRoom', roomId).on('message', (data: any) => {
      console.log(data);
    });
  }

  leaveRoom(roomId: string) {
    this.socket.emit('leaveRoom', roomId);
  }

  public setRoomId(roomId: string) {
    this.roomId.next(roomId);
  }

  public getRoomId() {
    return this.roomId.getValue();
  }

  public getRoomId$() {
    return this.roomId.asObservable();
  }
}
