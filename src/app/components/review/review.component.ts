import { Component, OnInit } from '@angular/core';
import { RateService } from 'src/app/services/rate.service';
import { AuthService } from 'src/app/services/auth.service';
import { Users } from 'src/app/model/users';
import { Rate } from 'src/app/model/Rate';
import { filter } from 'rxjs/operators';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  users : Users[] = []
  rate : Rate[] = []
  ratePg1:any;
  ratePg2:any;
  ratePg3:any;
  ratePg4:any;
  ratePg5:any;
  average:any;
  
  constructor(private rateServ : RateService, private authservice : AuthService) { 
    this.getUser()
  }

  ngOnInit(): void {

    this.rateServ.getRates().subscribe((data:any)=>{
      console.log(data)
    })

    this.getRate();

  }

  async getUser()
  {
    this.authservice.GetAllUsers().subscribe(async (res:any) => {
      let ress = res;
      this.users = ress.filter((res:any) => String(res.email) === String(sessionStorage.getItem('loggedEmail')))
      console.log(this.users)
      
    })

  }

  getRate(){
    this.rateServ.getRates().subscribe((res:any)=>{
     let data = res; 

     this.rate = data.filter((res:any)=> Number(res.userRateID) === Number(this.users[0].Userid))



     console.log(this.rate)
     
     let totRatings = this.rate.length;

  

     let result = this.rate;
    
      let ratings1, ratings2, ratings3, ratings4, ratings5;
      ratings1 = result.filter((resss:any) => resss.rate === 1);
      ratings2 = result.filter((resss:any) => resss.rate === 2);
      ratings3 = result.filter((resss:any) => resss.rate === 3);
      ratings4 = result.filter((resss:any) => resss.rate === 4);
      ratings5 = result.filter((resss:any) => String(resss.rate) === String(5));

      

      this.ratePg1 = ((ratings1.length / Number(totRatings)) * 100) + '%';
      this.ratePg2 = ((ratings2.length / Number(totRatings)) * 100) + '%';
      this.ratePg3 = ((ratings3.length / Number(totRatings)) * 100) + '%';
      this.ratePg4 = ((ratings4.length / Number(totRatings)) * 100) + '%';
      this.ratePg5 = ((ratings5.length / Number(totRatings)) * 100) + '%';

      this.average = (totRatings * totRatings )/5

      console.log("average",this.average)
     
    })
  }
  

}
