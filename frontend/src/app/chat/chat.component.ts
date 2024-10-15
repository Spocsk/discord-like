import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  selectedRoom: string = '';

  constructor() {}

  selectRoom(roomId: string) {
    this.selectedRoom = roomId;
  }

  ngOnInit(): void {}
}
