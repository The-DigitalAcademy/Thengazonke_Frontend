import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth-layout/services/auth.service';
import { CurrentRouteService } from '../services/current-route.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  
  isLoggedIn : boolean = false;
  ref : any;
  accountType : string =''
  dashboardRoute: string ='';
  logEmail!:any;
  users!:any;
  myCurrentRoute: any;
  notis:number = 0;
  fetchAnimal: any;

  constructor(private router : Router,  
    private authService: AuthService, private currentRoute: CurrentRouteService) { }

  ngOnInit(): void {
    this.myCurrentRoute  = this.currentRoute.currentRoute();

    if('loggedEmail' in sessionStorage)
    {
        this.isLoggedIn = true;

        this.logEmail = sessionStorage.getItem('loggedEmail');
        //get users list
        this.authService.GetAllUsers().subscribe((res:any) => {
          let result = res;   
          this.users = result.filter((res:any) => String(res.email) === String(this.logEmail))
          // console.log(this.users)
       });

       
      //  this.checkAccount();
    }
    else
    {
      // this.router.navigate(['/auth/login']);
    }
    const storageVal = localStorage.getItem('cartIds');
    const val = storageVal ? JSON.parse(storageVal) : []
    this.fetchAnimal = val

    

    for (let index = 0; index < this.fetchAnimal.length; index++) {
      this.notis++
      console.log(this.notis)
    }
   
  }

  LogOut()
  {
    sessionStorage.clear();
    this.router.navigate(['/auth/login']);
  } 


    logout()
    {
      sessionStorage.clear();
      this.isLoggedIn = false;
      clearInterval(this.ref);
      sessionStorage.setItem('isLoggedIn','no');
      this.router.navigateByUrl('/home');
    }
    
  }

