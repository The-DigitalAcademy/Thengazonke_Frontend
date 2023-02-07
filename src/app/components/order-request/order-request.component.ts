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
  tr!:any;
  live!:any;
  result!:any;
  trans!:any;
  result2!:any;
  transact!:any;
  toggleModalButton :any;
  deleteID!:any;
 

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
      // full trans
      console.log(this.transaction)
    // trans id
      console.log(this.users[0].Userid)
  
      let transTemp = this.transaction.filter((res:any) => Number(res.Userid) === Number(this.users[0].Userid));
      this.tr = transTemp.filter((ress:any) => String(ress.status) != String('archieved'));
     console.log(this.tr);

    }); 
  }

//   checkSelected(event:any, transID:any)
// {
//   // console.log(event, transID);

//   this.livestockService.GetAllPostedLivestock().subscribe(async(res:any) => {
//     this.result = await res;
//     this.live = this.result.filter((res:any) => Number(res.livestockID) === Number(event));
//   }); 

//   this.transactionService.GetAllTransaction().subscribe(async(res:any) => {
//     this.result2 = await res;
//     this.transaction = this.result2.filter((res:any) => Number(res.transactionID) === Number(transID));
//     // console.log(this.transaction);
//   }); 

// }
  // getStatus(id:any){
  //   this.toggleModalButton = this.result2[id].status;

  //   console.log(id)
  //   // this.getSpecificTransaction(id)
  //   return console.log(this.toggleModalButton)
  // }

  // getSpecificTransaction(id:any){
  //   this.transactionService.GetAllTransaction().subscribe(async(res:any) => {
  //     this.result2 = await res;
  //     this.transaction = this.result2.filter((res:any) => Number(res.transactionID) === Number(id));
  //     // console.log(this.transaction);
  //   });
  // }

  closeModal() {
    let modalCheckbox:any = document.getElementById('my-modal')
    modalCheckbox.checked = false
  }
}

//   getTransaction(){

//     this.transactionService.getFullTransaction().subscribe(async(res:any) => {
//       this.transaction = res;
//       console.log(this.transaction);
//     });
    
//   }

// }
