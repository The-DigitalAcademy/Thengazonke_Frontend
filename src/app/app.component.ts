import { Component, OnInit } from '@angular/core';
import { CurrentRouteService } from './shared/services/current-route.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  myCurrentRoute:any;

constructor( private currentRoute: CurrentRouteService ,private route:ActivatedRoute){}

ngOnInit() {
  this.myCurrentRoute  = this.currentRoute.currentRoute();


  console.log(this.route.data);
}

}
