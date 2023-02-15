import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CurrentRouteService } from 'src/app/services/current-route.service';

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

  constructor(private router : Router,  private authService: AuthService, private currentRoute: CurrentRouteService) { }

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
  }

  LogOut()
  {
    sessionStorage.clear();
    this.router.navigate(['/auth/login']);
  } 



  // checkAccount(): boolean {
    
  //   if(sessionStorage.getItem('account') == "Seller")
  //   {
  //     this.accountType = 'Seller';
  //     this.dashboardRoute = '/Seller';
  //     return true;
  //   }else
  //   {
  //     this.accountType = 'Buyer'
  //     this.dashboardRoute = '/Buyer';
  //     return false;
  //   }
  // }


    logout()
    {
      sessionStorage.clear();
      this.isLoggedIn = false;
      clearInterval(this.ref);
      sessionStorage.setItem('isLoggedIn','no');
      this.router.navigateByUrl('/home');
    }
    
  }

// }

