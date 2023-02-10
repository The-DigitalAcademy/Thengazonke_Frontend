import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-login-sel',
  templateUrl: './login-sel.component.html',
  styleUrls: ['./login-sel.component.scss']
})
export class LoginSelComponent implements OnInit {

  constructor(private toast: HotToastService) { }

  ngOnInit(): void {

    this.toast.show('Hello World!');
  }

}
