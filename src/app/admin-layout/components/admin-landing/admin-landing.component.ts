import { Component, OnInit } from '@angular/core';
import { forkJoin, switchMap } from 'rxjs';
import { AuthService } from 'src/app/auth-layout/services/auth.service';
import { BreedService } from 'src/app/shared/services/breed.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { LivestockService } from 'src/app/shared/services/livestock.service';
import { StatsService } from 'src/app/shared/services/stats.service';

@Component({
  selector: 'app-admin-landing',
  templateUrl: './admin-landing.component.html',
  styleUrls: ['./admin-landing.component.scss']
})
export class AdminLandingComponent implements OnInit {

  users!:any;
  livestock!:any;
  category!:any;
  breed!:any;
  completeOrder!:any;
  pendingOrder!:any;
  allOrder!:any;
  inprogressOrder!:any;
  load2:boolean = false;
  // load3:boolean = false;

  constructor(private authService:AuthService , private livestockService:LivestockService, private categoryService: CategoryService,
    private breedService: BreedService, private statsService: StatsService) {       
    }

  async ngOnInit() {
    await this.getFork();
    this.load2= true;
    // this.load3= true;
  }


  getFork()
  {
    forkJoin({
      // requestAllOrder: this.statsService.GetAllOrders(),
      // requestPending: this.statsService.GetNumPendingOrders(),
      // requestComplete: this.statsService.GetNumCompleteOrders(),
      requestUsers: this.authService.GetAllUsers(),
      requestCategory: this.categoryService.GetAllCategory(),
      requestBreed: this.breedService.GetAllBreed(),
      requestLivestock: this.livestockService.GetLivestockByUser(),

    }).subscribe(({requestUsers, requestCategory, requestBreed, requestLivestock}) => {
      // this.allOrder = requestAllOrder[0];
      // console.log(this.allOrder);
      // this.pendingOrder = requestPending[0];
      // console.log(this.pendingOrder);
      // this.completeOrder = requestComplete;
      this.users  = requestUsers;
      this.category = requestCategory;
      this.breed = requestBreed;
      this.livestock = requestLivestock;
    });
  }

 
}
