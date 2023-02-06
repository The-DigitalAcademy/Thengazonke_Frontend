import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RateService } from 'src/app/services/rate.service';

@Component({
  selector: 'app-user-review',
  templateUrl: './user-review.component.html',
  styleUrls: ['./user-review.component.scss']
})
export class UserReviewComponent implements OnInit {

  reviews!:any;
  sub!:any;
  uid!:any;
  rates!:any;
  p: number = 1;
  total: number = 0;

  constructor(private rateService: RateService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getReviews();
  }

  getReviews(){

    this.sub = this.route.params.subscribe(params => {
      return this.uid = params['id'];
    });

    this.rateService.getReviewByUser().subscribe((res:any) => {
      let result = res;
      this.reviews = result.filter((res:any) => Number(res.userRateID) === Number(this.uid))
      console.log(this.reviews)
    });
  }

  pageChangeEvent(event: number){
    this.p = event;
    this.getReviews();
  }

}
