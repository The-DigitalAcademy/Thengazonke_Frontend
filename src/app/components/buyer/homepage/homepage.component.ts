import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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


  constructor(private livestoc:LivestockService, private router: Router, private transactionService: TransactionService, private authservice: AuthService) { }

  ngOnInit(): void {

    this.authservice.GetAllUsers().subscribe((res:any) => {
      let result = res;
      this.users = result.filter((res:any) => String(res.email) === String(sessionStorage.getItem('loggedEmail')))
      console.log(this.users);
    })

  }

  btnBuy(): void {

      console.log("buy active")
      console.log(this.lid)

      let transationDetails = {
        livestockID: this.lid,
        userID: this.livestok[0].UserID,
        status: "pending",
        buyerID: this.users[0].Userid
      }

      console.log(transationDetails)

      this.transactionService.CreateTranstaction(transationDetails).subscribe((next:any) => {
        console.log("Transaction successfully created");
      });
   
  }

  

  closeModal() {
    let modalCheckbox:any = document.getElementById('my-modal')
    modalCheckbox.checked = false
  }

  getPriceCurrency(price:any) { 
    return price.slice(1,price.length);
  }


}
