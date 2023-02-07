import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { Users } from 'src/app/model/users';
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
  users: Users[] = [];
  result!:any;
  result2!:any;
  transact!:any;
  toggleModalButton :any;
  deleteID!:any;

  cancelOrder()
  {
    let id = this.transaction[0].transactionID
    console.log(this.transaction.transactionID)
    let status = {status:"cancelled"};
    this.transactionService.updateTransaction(id, status).subscribe(async (res) => {
  transs!:any;

  }

  constructor( private transactionService : TransactionService, private livestockService: LivestockService, private authservice: AuthService ) { 
    this.getUser();
  }

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
    this.transactionService.GetAllTransaction().subscribe((res:any) => {
      this.result2 = res;
      
      console.log(this.result2)
      console.log(this.users[0].Userid)

      let transTemp = this.result2.filter((res:any) => Number(res.buyerID) === Number(this.users[0].Userid));
      this.trans = transTemp.filter((ress:any) => String(ress.status) != String('archieved'));
      console.log(this.trans);

    }); 
    console.log(this.trans)
  }


checkSelected(event:any, transID:any)
{
  console.log(event, transID);

  this.livestockService.GetAllPostedLivestock().subscribe(async(res:any) => {
    this.result = await res;
    this.live = this.result.filter((res:any) => Number(res.livestockID) === Number(event));
  }); 

  this.transactionService.GetAllTransaction().subscribe(async(res:any) => {
    this.result2 = await res;
    this.transaction = this.result2.filter((res:any) => Number(res.transactionID) === Number(transID));
    console.log(this.transaction);
  }); 

}


  getStatus(id:any){
    this.toggleModalButton = this.result2[id].status;

    console.log(id)

    // this.getSpecificTransaction(id)
    return console.log(this.toggleModalButton)
  }

  getSpecificTransaction(id:any){
    this.transactionService.GetAllTransaction().subscribe(async(res:any) => {
      this.result2 = await res;
      this.transaction = this.result2.filter((res:any) => Number(res.transactionID) === Number(id));
      console.log(this.transaction);
    });
  }

  closeModal() {
    let modalCheckbox:any = document.getElementById('my-modal')
    modalCheckbox.checked = false
  }

  // DeleteTransaction()
  // {
  //   console.log('deleted') 
  //   console.log(this.deleteID)
  //   let status = "archieved"
  //   this.transactionService.DeleteTransaction(this.deleteID, status).subscribe(async res => {
  //     // this.decoded = jwt_decode(res.token);
  //   })

  // }


  // deleteTrans(Transactionid:any)
  // {
  //   this.deleteID = Transactionid;
  // }

}
