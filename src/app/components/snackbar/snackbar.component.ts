import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';


@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {


message= "fghchfchf"
  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notificationService.success(this.message);
    // this.notificationService.danger("dksyvadkadkv");
    this.notificationService.warning("warning");
  }

}
