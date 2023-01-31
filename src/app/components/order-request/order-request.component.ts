import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction.service';
import { UserLayoutComponent } from 'src/app/user-layout/user-layout.component';
import { UserLayoutModule } from 'src/app/user-layout/user-layout.module';

@Component({
  selector: 'app-order-request',
  templateUrl: './order-request.component.html',
  styleUrls: ['./order-request.component.scss']
})
export class OrderRequestComponent implements OnInit {

  transaction!:any;

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {

    this.transactionService.getFullTransaction().subscribe(async(res:any) => {
      this.transaction = res;
      console.log(this.transaction);
    });

  }

}
