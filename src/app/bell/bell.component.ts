import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { Notification } from '../model/notification';

@Component({
  selector: 'app-bell',
  templateUrl: './bell.component.html',
  styleUrls: ['./bell.component.scss']
})
export class BellComponent implements OnInit {

  constructor(private notservice:NotificationService) { }

  ngOnInit(): void {
    this.notservice.getAllNotification().subscribe((data: Notification) => {
      console.log(data);
    })
  }

}
