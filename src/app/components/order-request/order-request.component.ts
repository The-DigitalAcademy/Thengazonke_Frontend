import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
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

  constructor(private transactionService: TransactionService, private authservice: AuthService) { }

  users:any[] = [];

  ngOnInit(): void {


  }

  getUser()
  {
    this.authservice.GetAllUsers().subscribe((res:any) => {
      let result = res;
      this.users = result.filter((res:any) => String(res.email) === String(sessionStorage.getItem('loggedEmail')))
       console.log(this.users)

       this.getTransaction();
    })
  }

  getTransaction(){

    this.transactionService.getFullTransaction().subscribe(async(res:any) => {
      this.transaction = res;
      console.log(this.transaction);
    });
    
  }

}
