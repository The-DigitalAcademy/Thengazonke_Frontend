import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  LogOut()
  {
    // this.logEmail = sessionStorage.removeItem('loggedEmail'); 
    this.router.navigate(['/auth/login']);
    // this.islogin = false;
    // this.toast.success({detail:'Success',summary:'Successfully Logout!', sticky:false,position:'tr', duration:6000})
  } 

}
