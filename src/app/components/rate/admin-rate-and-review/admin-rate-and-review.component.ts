import { Component, OnInit } from '@angular/core';
import { RateService } from 'src/app/services/rate.service';

@Component({
  selector: 'app-admin-rate-and-review',
  templateUrl: './admin-rate-and-review.component.html',
  styleUrls: ['./admin-rate-and-review.component.scss']
})
export class AdminRateAndReviewComponent implements OnInit {

  rates!:any;
  p: number = 1;
  total: number = 0;

  constructor(private rateService: RateService) { }

  ngOnInit(): void {
    this.getRatings();
  }

  pageChangeEvent(event: number){
    this.p = event;
    this.getRatings();
}
  getRatings(){
    this.rateService.getRatesByUser().subscribe((res:any) => {
      let result = res;
      this.rates = result
      console.log(this.rates)
      // this.users = result.filter((res:any) => String(res.status) != String("archieved"));
      // this.users = result.filter((res:any) => String(res.status) === String("archieved"));
    });
  }

}
