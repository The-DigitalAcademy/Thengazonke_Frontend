import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LivestockService } from 'src/app/services/livestock.service';
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
  buyer!:any;
  tr!:any;
  live!:any;
  result!:any;
  trans!:any;
  result2!:any;
  transact!:any;
  toggleModalButton :any;
  deleteID!:any;
 
  // declineOrder()
  // {
  //   let id = this.transaction[0].transactionID

  //   console.log(this.transaction[0].transactionID)

  //   let status = {status:"cancelled"};

  //   console.log(status)
    
  //   this.transactionService.updateTransaction(id, status).subscribe((res) => {})

  // }

  decline(id:any,dataIn:any)
{

  this.transactionService.updateTransaction(id,dataIn).subscribe((data:any) =>{
   
  }
  )}

data = {
  transactionID: '',
}

  constructor(private transactionService: TransactionService, private authservice: AuthService, private livestockService: LivestockService) { 
    this.getUser();
  }

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
  
      let transTemp = this.transaction.filter((res:any) => Number(res.Userid) === Number(this.users[0].Userid));
      this.tr = transTemp.filter((ress:any) => String(ress.status) != String('archieved'));
     console.log(this.tr);

    }); 
  }

  closeModal() {
    let modalCheckbox:any = document.getElementById('my-modal')
    modalCheckbox.checked = false
  }
}

