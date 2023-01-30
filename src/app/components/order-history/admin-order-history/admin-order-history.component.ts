import { Component, OnInit } from '@angular/core';
import { LivestockService } from 'src/app/services/livestock.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-admin-order-history',
  templateUrl: './admin-order-history.component.html',
  styleUrls: ['./admin-order-history.component.scss']
})
export class AdminOrderHistoryComponent implements OnInit {

  transaction!:any;

  constructor(private transactionService : TransactionService) { }

  ngOnInit(): void {

    this.transactionService.GetAllTransaction().subscribe(async(res:any) => {
      this.transaction = res;
      console.log(this.transaction);
    });
  }

}
