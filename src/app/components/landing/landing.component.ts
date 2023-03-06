import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
//import { AuthService } from 'src/app/services/auth.service';
import { LivestockService } from 'src/app/services/livestock.service';
import { CurrentRouteService } from 'src/app/services/current-route.service';

@Component({  
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  myCurrentRoute!:string;  // Landing componet current route
  lid!:any;
  livestok!:any;
  results!:any;
  filterTerm!: string;

  constructor(private livestoc:LivestockService, private router: Router,private currentRoute:CurrentRouteService) { 
    
  }

  ngOnInit(): void {
     this.myCurrentRoute  = this.currentRoute.currentRoute();
     console.log(this.myCurrentRoute); 
   
  }

  addItem(newItem: string) {
    this.lid = newItem;
    
    this.livestoc.GetAllPostedLivestock().subscribe((messages) => {
      this.results = messages
      this.livestok = this.results.filter((res:any) => Number(res.livestockID) === Number(this.lid))
      console.log('One livestokokoko',this.livestok)
    })

    let modalCheckbox:any = document.getElementById('my-modal')
      modalCheckbox.checked = Event
  }

  getPriceCurrency(price:any) { 
    return price.slice(1,price.length);
  }
  
  closeModal() {
    let modalCheckbox:any = document.getElementById('my-modal')
    modalCheckbox.checked = false
  }


}