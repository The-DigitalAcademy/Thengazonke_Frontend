import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Notification } from '../model/notification';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  myNotification$!:Observable<Notification>;

  constructor(private notservice:NotificationService) { }

  ngOnInit(): void {
      this.myNotification$ = this.notservice.getAllNotification().pipe();
  }



}
