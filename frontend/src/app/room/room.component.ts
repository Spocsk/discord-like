import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat/chat.service';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, switchMap } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

interface Room {
  name: string;
  _id: string;
}

@Component({
  selector: 'app-rooms',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
})
export class RoomsComponent implements OnInit {
  rooms: BehaviorSubject<Room[]> = new BehaviorSubject<Room[]>([]);
  rooms$ = this.rooms.asObservable();
  newRoomName = new FormControl<string>('', { nonNullable: true });

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.getRooms$().subscribe(rooms => {
      this.rooms.next(rooms);
    });
  }

  createRoom() {
    this.chatService
      .createRoom$(this.newRoomName.value)
      .pipe(switchMap(() => this.chatService.getRooms$()))
      .subscribe(rooms => {
        this.rooms.next(rooms);
      });
  }

  selectRoom(roomId: string) {
    if (this.chatService.getRoomId() !== '') {
      this.chatService.leaveRoom(this.chatService.getRoomId());
    }
    this.chatService.setRoomId(roomId);
    this.chatService.joinRoom(roomId);
    this.chatService.getMessagesFromRoomId$(roomId).subscribe(messages => {
      this.chatService.messages$.next(messages);
    });
  }
}
