import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentRouteService } from 'src/app/services/current-route.service';
//import { AuthService } from 'src/app/services/auth.service';
import { LivestockService } from 'src/app/services/livestock.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  

  lid!:any;
  livestok!:any;
  results!:any;

  addItem(newItem: string) {
   
    this.lid = newItem;

    

    this.livestoc.GetAllPostedLivestock().subscribe((messages) => {
      this.results = messages
      // console.log('i am livestock',this.livestocks)

      this.livestok = this.results.filter((res:any) => Number(res.livestockID) === Number(this.lid))
      console.log('One livestokokoko',this.livestok)
    })

    let modalCheckbox:any = document.getElementById('my-modal')
      modalCheckbox.checked = event

    
    
  }

  

  filterTerm!: string;


  constructor(private livestoc:LivestockService, private router: Router,private currentRoute:CurrentRouteService) { }

  ngOnInit(): void {
    this.currentRoute.currentRoute();
  }


  // openModal(event:any):void {
   
  //   let modalCheckbox:any = document.getElementById('my-modal')
  //  modalCheckbox.checked = event
  // }

  closeModal() {
    let modalCheckbox:any = document.getElementById('my-modal')
    modalCheckbox.checked = false
  }

}
