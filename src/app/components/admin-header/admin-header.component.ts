import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {

  logEmail!:any;
  users!:any;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {

    if('loggedEmail' in sessionStorage)
    {
        this.logEmail = sessionStorage.getItem('loggedEmail');
        //get users list
        this.authService.GetAllUsers().subscribe((res:any) => {
          let result = res;   
          this.users = result.filter((res:any) => String(res.email) === String(this.logEmail))
       });
    }
    else
    {
      this.router.navigate(['/auth/login']);
    }
  }

  LogOut()
  {
    this.logEmail = sessionStorage.removeItem('loggedEmail'); 
    this.logEmail = sessionStorage.removeItem('loggedInToken'); 
    this.router.navigate(['/auth/login']);
    // this.islogin = false;
    // this.toast.success({detail:'Success',summary:'Successfully Logout!', sticky:false,position:'tr', duration:6000})
  } 

}
