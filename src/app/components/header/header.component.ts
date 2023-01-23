import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  checkAccount(): boolean {
    
    if(sessionStorage.getItem('account') == "Seller")
    {
      this.accountType = 'Seller';
      this.dashboardRoute = '/Seller';
      return true;
    }else
    {
      this.accountType = 'Buyer'
      this.dashboardRoute = '/Buyer';
      return false;
    }
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

// }

