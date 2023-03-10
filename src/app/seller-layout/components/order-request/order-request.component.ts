import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth-layout/services/auth.service';
import { Livestock } from 'src/app/shared/models/livestock';
import { LivestockService } from 'src/app/shared/services/livestock.service';
import { TransactionService } from 'src/app/shared/services/transaction.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

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
  p: number = 1;
  total: number = 0;
  filterTerm: string='';
  filterSearch!:string;
  filterSearch1!:string;
  
  isButtonVisible = true;

data = {
  transactionID: '',
}

  constructor(private transactionService: TransactionService, private authservice: AuthService,
   private livestockService: LivestockService, private notificationService : NotificationService) { 
    this.getUser();
  }

  users:any[] = [];

  ngOnInit(): void {

  }

  addItem(event:any)
  {
    this.filterSearch = event[0];
    this.filterSearch1 = event[1];
  }


  async getUser()
  {
    this.authservice.GetAllUsers().subscribe(async(res:any) => {
      let result = res;
      console.log(res)
      this.users = await result.filter((res:any) => String(res.email) === String(sessionStorage.getItem('loggedEmail')))
       
       this.getTransaction();
    })
  }

  getTransaction()
  {
    this.transactionService.getFullTransaction().subscribe((res:Livestock) => {

      this.transaction = res;
      let transTemp = this.transaction.filter((res:Livestock) => Number(res.Userid) === Number(this.users[0].Userid));
      this.tr = transTemp.filter((ress:any) => String(ress.status) != String('archived'));

    }); 
  }
  // onCategoryChange(e:any){
  //   this.filterTerm=e.target.value

  //   if(e.target.value=='All'){
  //     this.filterTerm='';
  //     this.getTransaction();
      
  //   }

  //   else if((e.target.value).toUpperCase()== ('Pending'.toUpperCase())){

  //     this.transactionService.getFullTransaction().subscribe((res:any) => {
  //       this.transaction = res;
  //       let transTemp = this.transaction.filter((res:any) => Number(res.Userid) === Number(this.users[0].Userid));
  //       let trs = transTemp.filter((transTemp:any) => String(transTemp.status) != String('archieved'));
  //       this.tr = transTemp.filter((trs:any) => String(trs.status.toUpperCase()) == String('pending'.toUpperCase()));
  //       console.log(this.tr);
  //     }); 
  //   }
  //   else if((e.target.value).toUpperCase() == ('In-Progress'.toUpperCase())){

  //     this.transactionService.getFullTransaction().subscribe((res:any) => {
  //       this.transaction = res;
  //       let transTemp = this.transaction.filter((res:any) => Number(res.Userid) === Number(this.users[0].Userid));
  //       let trs = transTemp.filter((transTemp:any) => String(transTemp.status) != String('archieved'));
  //       this.tr = transTemp.filter((trs:any) => String(trs.status.toUpperCase()) == String('In-Progress'.toUpperCase()));
  //       console.log(this.tr);
  //     }); 
  //   }
  //   else if((e.target.value).toUpperCase()== ('Cancelled'.toUpperCase())){

  //     this.transactionService.getFullTransaction().subscribe((res:any) => {
  //       this.transaction = res;
  //       let transTemp = this.transaction.filter((res:any) => Number(res.Userid) === Number(this.users[0].Userid));
  //       let trs = transTemp.filter((transTemp:any) => String(transTemp.status) != String('archieved'));
  //       this.tr = transTemp.filter((trs:any) => String(trs.status.toUpperCase()) == String('Cancelled'.toUpperCase()));
  //       console.log(this.tr);
  //     }); 
  //   }
  //   else if((e.target.value).toUpperCase()== ('Completed'.toUpperCase())){

  //     this.transactionService.getFullTransaction().subscribe((res:any) => {
  //       this.transaction = res;
  //       let transTemp = this.transaction.filter((res:any) => Number(res.Userid) === Number(this.users[0].Userid));
  //       let trs = transTemp.filter((transTemp:any) => String(transTemp.status) != String('archieved'));
  //       this.tr = transTemp.filter((trs:any) => String(trs.status.toUpperCase()) == String('Completed'.toUpperCase()));
  //       console.log(this.tr);
  //     }); 
  //   }
  // }

  onCategoryChange2(catItem:any){
    
    this.filterSearch = catItem;
  }

  onCategoryChange3(){
    this.filterSearch=''
  }
  approve( x:any)
  {

    let id  = x

    let editTrans = {
      status: 'in-progress',
    }
        this.transactionService.updateTransaction(id,editTrans).subscribe((next:any) => {
          console.log('Edited succefully');
          window.location.reload();
        }, (ERROR:any) => {
          if(ERROR.status === 200)
          {
            let message = "Order Approved"
             this.notificationService.success(message);
            window.location.reload();
          }
          else if(ERROR.status === 201)
          {
            let message = "Order Approved"
             this.notificationService.success(message);
            window.location.reload();
          }
          else if(ERROR.status === 400)
          {
             this.notificationService.danger("Something went wrong, please try again!");
          }
          else{
            this.notificationService.danger("Something went wrong, please try again!");
          }
        }) 
  }

  declineOrder(x:any)
  {

    let id  = x

    let editTrans = {
      status: 'cancelled',
    }
        this.transactionService.updateTransaction(id,editTrans).subscribe((next:any) => {
          console.log('Edited succefully');
          window.location.reload();
        }, (ERROR:any) => {
          if(ERROR.status === 200)
          {
            let message = "Order Declined"
            this.notificationService.success(message);
            window.location.reload();
          }
          else if(ERROR.status === 201)
          {
            let message = "Order Declined"
             this.notificationService.success(message);
            window.location.reload();
          }
          else if(ERROR.status === 400)
          {
            this.notificationService.danger("Something went wrong, please try again!");
          }
          else{
            this.notificationService.danger("Something went wrong, please try again!");
          }
        })
  }

  completeOrder(x:any)
  {

    let id  = x

    let editTrans = {
      status: 'complete',
    }
    this.transactionService.updateTransaction(id,editTrans).subscribe((next:any) => {
      console.log('Edited succefully');
      window.location.reload();
    }, (ERROR:any) => {
      if(ERROR.status === 200)
      {
        let message = "Order Completed"
        this.notificationService.success(message);
        window.location.reload();
      }
      else if(ERROR.status === 201)
      {
        let message = "Order Completed"
         this.notificationService.success(message);
        window.location.reload();
      }
      else if(ERROR.status === 400)
      {
         this.notificationService.danger("Something went wrong, please try again!");
      }
      else{
         this.notificationService.danger("Something went wrong, please try again!");
      }
    })
  }

  closeModal() {
    let modalCheckbox:any = document.getElementById('my-modal')
    modalCheckbox.checked = false
  }

  getPriceCurrency(price:any){
    return price.slice(1,price.length);
  }


  pageChangeEvent(event: number){
    this.p = event;
    this.getUser();
  }

}

