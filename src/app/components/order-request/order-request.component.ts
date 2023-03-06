import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LivestockService } from 'src/app/services/livestock.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { UserLayoutComponent } from 'src/app/user-layout/user-layout.component';
import { UserLayoutModule } from 'src/app/user-layout/user-layout.module';
import { NotificationService } from 'src/app/services/notification.service';

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

  constructor(private transactionService: TransactionService, private authservice: AuthService, private livestockService: LivestockService,
    private notificationService: NotificationService) { 
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
      let transTemp = this.transaction.filter((res:any) => Number(res.Userid) === Number(this.users[0].Userid));
      this.tr = transTemp.filter((ress:any) => String(ress.status) != String('archieved'));
      console.log(this.tr)

    }); 
  }
  onCategoryChange(e:any){
    this.filterTerm=e.target.value

    if(e.target.value=='All'){
      this.filterTerm='';
      this.getTransaction();
      
    }

    else if((e.target.value).toUpperCase()== ('Pending'.toUpperCase())){

      this.transactionService.getFullTransaction().subscribe((res:any) => {
        this.transaction = res;
        let transTemp = this.transaction.filter((res:any) => Number(res.Userid) === Number(this.users[0].Userid));
        let trs = transTemp.filter((transTemp:any) => String(transTemp.status) != String('archieved'));
        this.tr = transTemp.filter((trs:any) => String(trs.status.toUpperCase()) == String('pending'.toUpperCase()));
        console.log(this.tr);
      }); 
    }
    else if((e.target.value).toUpperCase() == ('In-Progress'.toUpperCase())){

      this.transactionService.getFullTransaction().subscribe((res:any) => {
        this.transaction = res;
        let transTemp = this.transaction.filter((res:any) => Number(res.Userid) === Number(this.users[0].Userid));
        let trs = transTemp.filter((transTemp:any) => String(transTemp.status) != String('archieved'));
        this.tr = transTemp.filter((trs:any) => String(trs.status.toUpperCase()) == String('In-Progress'.toUpperCase()));
        console.log(this.tr);
      }); 
    }
    else if((e.target.value).toUpperCase()== ('Cancelled'.toUpperCase())){

      this.transactionService.getFullTransaction().subscribe((res:any) => {
        this.transaction = res;
        let transTemp = this.transaction.filter((res:any) => Number(res.Userid) === Number(this.users[0].Userid));
        let trs = transTemp.filter((transTemp:any) => String(transTemp.status) != String('archieved'));
        this.tr = transTemp.filter((trs:any) => String(trs.status.toUpperCase()) == String('Cancelled'.toUpperCase()));
        console.log(this.tr);
      }); 
    }
    else if((e.target.value).toUpperCase()== ('Completed'.toUpperCase())){

      this.transactionService.getFullTransaction().subscribe((res:any) => {
        this.transaction = res;
        let transTemp = this.transaction.filter((res:any) => Number(res.Userid) === Number(this.users[0].Userid));
        let trs = transTemp.filter((transTemp:any) => String(transTemp.status) != String('archieved'));
        this.tr = transTemp.filter((trs:any) => String(trs.status.toUpperCase()) == String('Completed'.toUpperCase()));
        console.log(this.tr);
      }); 
    }
  }

  onCategoryChange2(catItem:any){
    
    this.filterSearch = catItem;
  }

  onCategoryChange3(){
    this.filterSearch=''
  }
  approve(x:any)
  {

    let id  = x

    let editTrans = {
      status: 'in-progress',
    }
        this.transactionService.updateTransaction(id,editTrans).subscribe((next:any) => {
          console.log('Edited succefully');
        }, (ERROR) => {
          if(ERROR.status === 200)
          {
            let message = "Order Approved"
            this.notificationService.success(message);
          }
          else if(ERROR.status === 201)
          {
            let message = "Order Approved"
            this.notificationService.success(message);
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
        }, (ERROR) => {
          if(ERROR.status === 200)
          {
            let message = "Order Declined"
            this.notificationService.success(message);
          }
          else if(ERROR.status === 201)
          {
            let message = "Order Declined"
            this.notificationService.success(message);
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
    }, (ERROR) => {
      if(ERROR.status === 200)
      {
        let message = "Order Completed"
        this.notificationService.success(message);
      }
      else if(ERROR.status === 201)
      {
        let message = "Order Completed"
        this.notificationService.success(message);
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

  pageChangeEvent(event: number){
    this.p = event;
    this.getUser();
  }

}

