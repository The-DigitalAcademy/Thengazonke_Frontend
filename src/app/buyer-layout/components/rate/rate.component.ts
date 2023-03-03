import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Livestock } from 'src/app/shared/models/livestock';
import { TransactionService } from 'src/app/shared/services/transaction.service';
import { AuthService } from 'src/app/auth-layout/services/auth.service';
import { LivestockService } from 'src/app/shared/services/livestock.service';
import { RateService } from '../../services/rate.service';
import { Users } from 'src/app/shared/models/Users';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss']

})

export class RateComponent implements OnInit {

  numRates! : any 
  result:any [] = [];
  rate! :any;
  users! :any;
  ratedUsers! :any;
  result2: any [] = [];
  trans! : any;
  livestock: Livestock [] = [];
  transaction! :any;
  review! : any;
  sub!:any;
  tid!:any;
  lid!:any;

  constructor(private rateservice : RateService , private transervice : TransactionService, private authservice : AuthService, private router: Router , private transactionService: TransactionService, private route: ActivatedRoute, private livestockService: LivestockService) { }
  ngOnInit(): void {

    this.sub = this.route.params.subscribe(params => {
      return this.tid = params['id'];
    });

    this.sub = this.route.params.subscribe(params => {
      return this.lid = params['lid'];
    });

    console.log(this.tid, this.lid);


    this.getRaterUser();
    this.getRatedUser();

    this.transervice.GetAllTransaction().subscribe((data:any)=>{
      this.result2  = data;
      this.transaction = this.result2.filter((res:any) => Number(res.transactionID) === Number(this.tid))
      })

    this.livestockService.GetAllLivestock().subscribe((data:any)=>{
      let livestk = data;
      this.livestock = livestk.filter((res:any) => Number(res.livestockID) === Number(this.lid))
    })

     
  }
  getRaterUser()
  {
    this.authservice.GetAllUsers().subscribe((res:any) => {
      let ress = res;
      this.users = ress.filter((res:any) => String(res.email) === String(sessionStorage.getItem('loggedEmail')))

    })
  }

  getRatedUser()
  {
    this.authservice.GetAllUsers().subscribe((res:any) => {
      let ress = res;
      this.ratedUsers = ress.filter((res:any) => Number(res.Userid) === Number(this.transaction[0].userID))
    })
  }

  selectStar(event:any)
  {

    this.rate = event.target.value;
    console.log(this.rate)
  }
  createRate(event:any){
    if(this.rate == undefined){
        this.rate = 1;
    }

    let rateDetails = {
      rate: this.rate,
      review:this.review,
      transactionID: this.transaction[0].transactionID,
      userRateID: this.ratedUsers[0].Userid,
      userRaterID: this.users[0].Userid
      
    }
    console.log(rateDetails)
    return this.rateservice.createRate(rateDetails).subscribe((data:any)=>{
      this.router.navigate(['/orders']); 
    }, (err:any) => {

      if(Number(err.status) === Number(0)){
        let msg = `There's been an error please try again`;
        // this.errorToast(msg)
      }
      else if(err.status === 200){
        // this.successfullToast();
        // this.closeModal()
        this.router.navigate(['/orders']); 
      }
      else if(err.status === 201){
        this.router.navigate(['/orders']); 
        // this.successfullToast();
        // this.closeModal()
        }
      else{
        // this.errorToast("Something went wrong, please try again")
      }
  });

  }
}