import { Component, OnInit } from '@angular/core';
import { MessageBoxComponent } from '../shared/components/message-box/message-box.component';
import { RoomsComponent } from '../room/room.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  imports: [MessageBoxComponent, RoomsComponent],
  standalone: true,
})
export class ChatComponent {
  constructor() {}
}
