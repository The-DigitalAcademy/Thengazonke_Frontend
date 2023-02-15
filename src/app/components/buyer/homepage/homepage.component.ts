import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/services/auth.service';
// import { AuthService } from 'src/app/services/auth.service';
import { LivestockService } from 'src/app/services/livestock.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {


  

  lid!:any;
  livestok!:any;
  results!:any;
  users!:any;

  addItem(newItem: string) {
   
    this.lid = newItem;

    

    this.livestoc.GetAllPostedLivestock().subscribe((messages) => {
      this.results = messages
      // console.log('i am livestock',this.livestocks)

      this.livestok = this.results.filter((res:any) => Number(res.livestockID) === Number(this.lid))
      console.log('One livestock',this.livestok)
    })

    let modalCheckbox:any = document.getElementById('my-modal')
      modalCheckbox.checked = event

    
    
  }

  

  filterTerm!: string;


  constructor(private livestoc:LivestockService, private router: Router, private transactionService: TransactionService, private authservice: AuthService, private toast :HotToastService) { }

  ngOnInit(): void {

    this.authservice.GetAllUsers().subscribe((res:any) => {
      let result = res;
      this.users = result.filter((res:any) => String(res.email) === String(sessionStorage.getItem('loggedEmail')))
      console.log(this.users);
    })

  }

  btnBuy(): void {

      let transationDetails = {
        livestockID: this.lid,
        userID: this.livestok[0].UserID,
        status: "pending",
        buyerID: this.users[0].Userid
      }

      this.transactionService.CreateTranstaction(transationDetails).subscribe((next:any) => {
        this.router.navigate(['/order-history']);
      }, (err) => {
        if(err.status === 201)
        {
          this.successfullToast();
          this.router.navigate(['/order-history']);
        }
        else if(err.status === 400)
        {
          this.errorToast("Something went wrong, please try again!");
        }
        else{
          this.errorToast("Something went wrong, please try again!");
        }
    });
   
  }

  closeModal() {
    let modalCheckbox:any = document.getElementById('my-modal')
    modalCheckbox.checked = false
  }


successfullToast(){
  this.toast.success('Transaction was added successfully!',{duration:6000 , style: {
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
  this.toast.warning('Boo!',{duration:6000 , style: {
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
  getPriceCurrency(price:any) { 
    return price.slice(1,price.length);
  }


}
