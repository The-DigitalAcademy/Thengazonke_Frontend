import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/auth-layout/services/auth.service';
import { Users } from 'src/app/shared/models/Users';
import { LivestockService } from 'src/app/shared/services/livestock.service';
import { TransactionService } from 'src/app/shared/services/transaction.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

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
  // dtOptions: DataTables.Settings = {};
  // dtTrigger: Subject<any> = new Subject<any>();

  constructor( private transactionService : TransactionService,private livestockService: LivestockService,
               private authservice: AuthService, private router: Router , private notificationService :NotificationService) { 
    this.getUser();
  }

  cancelOrder()
  {
    let id = this.transaction[0].transactionID
    console.log(this.transaction.transactionID)
    let status = {status:"cancelled"};

    this.transactionService.updateTransaction(id, status).subscribe(async (res:any) => {
      this.closeModal()
    }, (err:any) => {

      if(Number(err.status) === Number(0)){
        let msg = `There's been an error please try again`;
        this.errorToast(msg)
      }
      else if(err.status === 200){
         this.successfullToast();
        this.closeModal()
      }
      else if(err.status === 201){

        this.successfullToast();
        this.closeModal()
        }
      else{
        this.errorToast("Something went wrong, please try again")
      }
  });

  }



  ngOnInit(): void {

    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 10,
    //   lengthMenu : [5, 10, 25],
    //   processing: true,
    //   paging: false,
    //   searching: false,
    //   deferRender: true,
    //   destroy: true,
    //  };
   
  }

  async getUser()
  {
    this.authservice.GetAllUsers().subscribe(async(res:any) => {
      let result = res;
      this.users = await result.filter((res:any) => String(res.email) === String(sessionStorage.getItem('loggedEmail')))
      this.getTransaction();
       
    })
  }

  getTransaction()
  {
    this.transactionService.GetAllTransaction().subscribe((res:any) => {
      this.result2 = res;
      let transTemp = this.result2.filter((res:any) => Number(res.buyerID) === Number(this.users[0].Userid));
      this.trans = transTemp.filter((ress:any) => String(ress.status) != String('archived'));
      console.log(this.trans)
      // this.dtTrigger.next(this.trans)
    }); 
    
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

  getPriceCurrency(price:any){
    return price.slice(1,price.length);
  }


  closeModal() {
    let modalCheckbox:any = document.getElementById('my-modal')
    modalCheckbox.checked = false
  }


  successfullToast(){
    this.notificationService.success('Order Cancelled!');
  }

  warningToast(){
    this.notificationService.warning('Boo!')
  }

  errorToast(message:any){
    this.notificationService.danger(message)
  }

  DeleteTransaction()
  {
    console.log('deleted') 
    console.log(this.deleteID)
    let status = "archieved"
    this.transactionService.DeleteTransaction(this.deleteID, status).subscribe(async res => {
      // this.decoded = jwt_decode(res.token);
    })

  }


  // deleteTrans(Transactionid:any)
  // {
  //   this.deleteID = Transactionid;
  // }

}
