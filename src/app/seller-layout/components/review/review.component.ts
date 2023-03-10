import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth-layout/services/auth.service';
import { RateService } from 'src/app/buyer-layout/services/rate.service';
import { Rate } from 'src/app/shared/models/Rate';
import { Users } from 'src/app/shared/models/Users';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  users : Users[] = []
  rate : Rate[] = []
  rater :Rate[] = []
  rating :any;
  ratePg1:any;
  ratePg2:any;
  ratePg3:any;
  ratePg4:any;
  ratePg5:any;
  average:any = 0;
  sum1:number = 0
  sum2:number = 0
  sum3:number = 0
  sum4:number = 0
  sum5:number = 0
  
  constructor(private rateServ : RateService, private authservice : AuthService) { 
    this.getUser()
  }

  ngOnInit(): void {

    this.rateServ.getRates().subscribe((data:any)=>{
      
    })

    this.rateServ.getReviewByUser().subscribe((res:any) => {
      let result = res;
      this.rating = result.filter((res:any) => Number(res.userRateID) === Number(this.users[0].Userid))
    
    });

    this.getRate();

  }

  async getUser()
  {
    this.authservice.GetAllUsers().subscribe(async (res:any) => {
      let ress = res;
      this.users = ress.filter((res:any) => String(res.email) === String(sessionStorage.getItem('loggedEmail')))
     
      
    })

  }

  async getRaterUser()
  {
    this.rateServ.getReviewByUser().subscribe(async (res:any) => {
      let ress = res;
      this.rater = ress.filter((res:any)=> Number(res.userRaterID) === Number(this.users[0].UserID))
 
      
    })

  }
  getRate(){
    this.rateServ.getReviewByUser().subscribe((res:any)=>{
     let data = res; 

     this.rate = data.filter((res:any)=> Number(res.userRateID) === Number(this.users[0].Userid))

     
     
     let totRatings = this.rate.length;

    

     let result = this.rate;
    
      let ratings1, ratings2, ratings3, ratings4, ratings5;
      ratings1 = result.filter((resss:any) => Number(resss.rate )=== Number(1));
      ratings2 = result.filter((resss:any) => Number(resss.rate )=== Number(2));
      ratings3 = result.filter((resss:any) => Number(resss.rate )=== Number(3));
      ratings4 = result.filter((resss:any) => Number(resss.rate )=== Number(4));
      ratings5 = result.filter((resss:any) => Number(resss.rate) === Number(5));

      this.ratePg1 = ((ratings1.length / Number(totRatings)) * 100) + '%';
      this.ratePg2 = ((ratings2.length / Number(totRatings)) * 100) + '%';
      this.ratePg3 = ((ratings3.length / Number(totRatings)) * 100) + '%';
      this.ratePg4 = ((ratings4.length / Number(totRatings)) * 100) + '%';
      this.ratePg5 = ((ratings5.length / Number(totRatings)) * 100) + '%';

      
  
      // for (let index = 0; index < ratings1.length; index++) {
      //  if(ratings1[index].rate === 1){
      //   this.sum1 = this.sum1 + Number(ratings1[index].rate);
      //  }
      // }
      

       
      // for (let index = 0; index < ratings2.length; index++) {
      //   if(ratings2[index].rate === 2){
      //     this.sum2 = this.sum2 + Number(ratings2[index].rate);
      //    }
      // }
      

      // for (let index = 0; index < ratings3.length; index++) {
      //    if(ratings3[index].rate === 3){
      //     this.sum3 = this.sum3 + Number(ratings3[index].rate);
      //    }
      // }

     

      // for (let index = 0; index < ratings4.length; index++) {
      //   if(ratings4[index].rate === 4){
      //     this.sum4 = this.sum4 + Number(ratings4[index].rate);
      //    }
      // }
  

      // for (let index = 0; index < ratings5.length; index++) {
      //   if(ratings5[index].rate === 5){
      //     this.sum5 = this.sum5 + Number(ratings5[index].rate);
      //    }
      // }
      let sum = ratings1.length + ratings2.length + ratings3.length + ratings4.length + ratings5.length;

      this.average = ((1*(ratings1.length)+2*(ratings2.length)+3*(ratings3.length)+4*(ratings4.length)+5*(ratings5.length))/(sum)).toFixed(1);

      console.log(this.average);
      console.log(ratings1.length);
      console.log(ratings2.length);
      console.log(ratings3.length);
      console.log(ratings4.length);
      console.log(ratings5.length);

      // let totsum= this.sum1+ this.sum2+this.sum3+this.sum4+this.sum5
      // this.average = totsum/5;
      
    })
  }


  getShortName(fullName:any) { 
    return fullName.slice(0,1);
  }

}