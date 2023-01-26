import { Component, OnInit } from '@angular/core';
import { UserLayoutComponent } from 'src/app/user-layout/user-layout.component';
import { UserLayoutModule } from 'src/app/user-layout/user-layout.module';

@Component({
  selector: 'app-order-request',
  templateUrl: './order-request.component.html',
  styleUrls: ['./order-request.component.scss']
})
export class OrderRequestComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
