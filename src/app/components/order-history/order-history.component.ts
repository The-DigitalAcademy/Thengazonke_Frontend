import { Component, OnInit } from '@angular/core';
import { LivestockService } from 'src/app/services/livestock.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {

  trans!:any;
  live!:any;
  transaction!:any;

  result!:any;
  result2!:any;

  constructor( private transactionService : TransactionService, private livestockService: LivestockService ) { }

  ngOnInit(): void {
  

  this.transactionService.GetAllTransaction().subscribe((res:any) => {
    this.trans = res;
  }); 

}

checkSelected(event:any, transID:any)
{
  console.log(event, transID);

  this.livestockService.GetAllPostedLivestock().subscribe((res:any) => {
    this.result = res;
    this.live = this.result.filter((res:any) => Number(res.livestockID) === Number(event));
  }); 

  this.transactionService.GetAllTransaction().subscribe((res:any) => {
    this.result2 = res;
    this.transaction = this.result2.filter((res:any) => Number(res.transactionID) === Number(transID));
    console.log(this.transaction);
  }); 

}


}
