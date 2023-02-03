import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
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
  users:any[] = [];

  result!:any;
  result2!:any;

  constructor( private transactionService : TransactionService, private livestockService: LivestockService, private authservice: AuthService ) { 
    this.getUser();
  }

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

  getTransaction()
  {
    this.transactionService.GetAllTransaction().subscribe((res:any) => {
      this.result2 = res;
      
      let transTemp = this.result2.filter((res:any) => Number(res.userID) === Number(this.users[0].Userid));
      this.trans = transTemp.filter((ress:any) => String(ress.status) != String('archieved'));
      console.log(this.trans);
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
