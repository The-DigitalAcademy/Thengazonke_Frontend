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
  tr!:any;
  live!:any;
  // transaction!:any;
  // users: Users[] = [];
  result!:any;
  // result2!:any;

  constructor(private transactionService: TransactionService, private authservice: AuthService) { }

  users:any[] = [];

  ngOnInit(): void {


  }

  async getUser()
  {
    this.authservice.GetAllUsers().subscribe(async(res:any) => {
      let result = res;
      this.users = await result.filter((res:any) => String(res.email) === String(sessionStorage.getItem('loggedEmail')))
       console.log(this.users)

       this.getTransaction();
    })
  }

  getTransaction()
  {
    this.transactionService.getFullTransaction().subscribe((res:any) => {
      this.transaction = res;
      
      console.log(this.transaction)
      console.log(this.users[0].Userid)

      let transTemp = this.transaction.filter((res:any) => Number(res.userID) === Number(this.users[0].Userid));
      this.tr = transTemp.filter((ress:any) => String(ress.status) != String('archieved'));
      console.log(this.tr);

    }); 
  }
}

//   getTransaction(){

//     this.transactionService.getFullTransaction().subscribe(async(res:any) => {
//       this.transaction = res;
//       console.log(this.transaction);
//     });
    
//   }

// }
