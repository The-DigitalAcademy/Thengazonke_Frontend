import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Users } from 'src/app/model/users';
import { AuthService } from 'src/app/services/auth.service';
import { LivestockService } from 'src/app/services/livestock.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { Subject } from 'rxjs';

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
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  cancelOrder()
  {
    let id = this.transaction[0].transactionID
    console.log(this.transaction.transactionID)
    let status = {status:"cancelled"};

    this.transactionService.updateTransaction(id, status).subscribe(async (res) => {
      this.closeModal()
    }, (err) => {

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

  constructor( private transactionService : TransactionService, private livestockService: LivestockService, private authservice: AuthService,private toast :HotToastService, private router: Router) { 
    this.getUser();
  }

  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthMenu : [5, 10, 25],
      processing: true,
      paging: false,
      searching: false,
      deferRender: true,
      destroy: true,
     };
   
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
      this.trans = transTemp.filter((ress:any) => String(ress.status) != String('archieved'));
      this.dtTrigger.next(this.trans)
    }); 
    // console.log(this.trans)
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


  successfullToast(){
    this.toast.success('Order Cancelled!',{duration:4000 , style: {
      padding: '35px',
      width: '48%',
      height: '100px',
      margin: '12px auto',
      background: '#fff',
      border: '2px solid #fff',
    },
    iconTheme: {
      primary: '#4BB543',
      secondary: '#FFFAEE',
    },})
  }

  warningToast(){
    this.toast.warning('Boo!',{duration:4000 , style: {
      padding: '35px',
      width: '48%',
      height: '100px',
      margin: '12px auto',
      background: '#fff',
      border: '2px solid #fff',
    },
    iconTheme: {
      primary: '#FFCC00',
      secondary: '#FFFAEE',
    },})
  }

  errorToast(message:any){
    this.toast.error(message,{duration:2000 , style: {
      padding: '35px',
      width: '48%',
      height: '100px',
      margin: '12px auto',
      background: '#fff',
      border: '2px solid #fff',
    },
    iconTheme: {
      primary: '#DC3545',
      secondary: '#FFFAEE',
    },})
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
