import { Component, OnInit } from '@angular/core';
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

  constructor(private authService:AuthService , private livestockService:LivestockService, private categoryService: CategoryService,
    private breedService: BreedService, private statsService: StatsService) { 
      this.getTotalUsers();
      this.getTotalLiveStock();
      this.getTotalCategory();
      this.getTotalUsers();
      this.getTotalBreed();
      // this.GetNumPendingOrders();
      // this.GetNumInProgressOrders();
      // this.GetNumCompleteOrders();
      this.GetAllOrders();
    }

  ngOnInit(): void {
    
  }


getTotalUsers()
{
  this.authService.GetAllUsers().subscribe((res:any) => {
    this.users  = res;
 });
}

getTotalLiveStock(){
  this.livestockService.GetLivestockByUser().subscribe((res:any) => {
    this.livestock = res;
  });
}

getTotalCategory(){
  this.categoryService.GetAllCategory().subscribe((res:any) => {
    this.category = res;
  });
}
getTotalBreed(){
  this.breedService.GetAllBreed().subscribe((res:any) => {
    this.breed = res;
  });
}

GetNumCompleteOrders(){
  this.statsService.GetNumCompleteOrders().subscribe((res:any) => {
    this.completeOrder = res;
  });
}

GetAllOrders(){
  this.statsService.GetAllOrders().subscribe((res:any) => {
    this.allOrder = res[0].numberoforders;
  });
}

GetNumPendingOrders(){
  this.statsService.GetNumPendingOrders().subscribe((ress:any) => {
    this.pendingOrder = ress[0].numberofpendingorders;
    console.log(this.pendingOrder);
  });
} 
GetNumInProgressOrders(){
  this.statsService.GetNumInProgressOrders().subscribe((res:any) => {
    this.inprogressOrder = res;
  });
}

GetNumArchieveOrders(){
  this.statsService.GetNumArchieveOrders().subscribe((res:any) => {
    this.breed = res;
  });
}
}
