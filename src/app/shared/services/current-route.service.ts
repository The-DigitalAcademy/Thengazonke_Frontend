import { Injectable } from '@angular/core';
import { Router,NavigationEnd  } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CurrentRouteService {
  subscribe(arg0: () => void) {
    throw new Error('Method not implemented.');
  }

  name = 'Get Current Url Route Demo';
  currentRout!: string | undefined;

  constructor(private router: Router) { }

 

  currentRoute() {
    return this.router.url
  }
    // this.router.events.pipe(filter(event => event instanceof NavigationEnd).then(
    //   (event:any) => 
    //   {
    //      this.currentRoute = event.url;          
    //      console.log(event);
    //   })
    // )
    
    
    // .subscribe();
    // }
}
