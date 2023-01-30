import { Component, OnInit } from '@angular/core';
import { RateService } from 'src/app/services/rate.service';
import { FormGroup, FormControl } from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss']

})

export class RateComponent implements OnInit {

  numRates! : any 
  result! :any
  rate! :any

  constructor(private rateservice : RateService , private transervice : TransactionService) { }

  ngOnInit(): void {
    this.rateservice.getRates().subscribe((data:any)=>{

      console.log(data)
    })
  }

  selectStar(event:any)
  {
    console.log(event.target.value)
  }


  createRate(event:any){
  
    let rateDetails = {


      rate: 1,
      rateID: 8,
      review:"shitty cows",
      transactionID: 4,
      userRateID: 11,
      userRaterID: 7


      
    }
    return this.rateservice.createRate(rateDetails).subscribe((data:any)=>{
      console.log(data);
    })
       
  }



}
