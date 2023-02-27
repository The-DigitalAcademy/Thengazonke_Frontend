import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LivestockService } from 'src/app/services/livestock.service';

@Component({
  selector: 'app-livestock',
  templateUrl: './livestock.component.html',
  styleUrls: ['./livestock.component.scss']
})
export class LivestockComponent implements OnInit {

  constructor(private livestockService:LivestockService, private authService: AuthService) { }

  livestock!:any;
  users!:any;
  p: number = 1;
  total: number = 0;

  ngOnInit(): void {
   this.getLivestock()
  }

  getLivestock()
  {
    this.livestockService.GetLivestockByUser().subscribe((res:any) => {
      this.livestock = res;
    });
  }

  getPriceCurrency(price:any) { 
    return price.slice(1,price.length);
  }

  pageChangeEvent(event: number){
    this.p = event;
    this.getLivestock();
  }


}
