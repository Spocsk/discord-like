import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ChatService } from '../chat/chat.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit {
  rooms: any[] = [];
  newRoomName: string = '';
  @Output() roomSelected = new EventEmitter<string>();

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.loadRooms();
  }

  loadRooms() {
    this.chatService.getRooms().subscribe((rooms) => {
      this.rooms = rooms;
    });
  }

  createRoom() {
    if (this.newRoomName.trim()) {
      this.chatService.createRoom(this.newRoomName).subscribe(() => {
        this.loadRooms();
        this.newRoomName = '';
      });
    }
  }

  selectRoom(roomId: string) {
    this.roomSelected.emit(roomId);
  }
}
