import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth-layout/services/auth.service';
import { Livestock } from '../models/livestock';
import { Users } from '../models/Users';
import { CurrentRouteService } from '../services/current-route.service';
import { LivestockService } from '../services/livestock.service';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-available-livestock',
  templateUrl: './available-livestock.component.html',
  styleUrls: ['./available-livestock.component.scss']
})
export class AvailableLivestockComponent implements OnInit {


  livestock :Array<any> = [];
  filterSearch:any;
  filterSearch1:any;
  livestockData!:Array<Livestock>;
  myCurrentRoute!:any;
  DeleteLivestockID:any;
  users:Array<Users> = [];

  isAvailable:boolean = false;

  livestockC:string[] = [];
  livestockAll: any;
  livestockCart: any;
  fetchAnimal:any;

  constructor(private livestockService:LivestockService, private currentRoute: CurrentRouteService, 
    private transactionService: TransactionService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {

    this.myCurrentRoute  = this.currentRoute.currentRoute();
    this.getAllLivestocks();
    this.getUser();
  }
  getAllLivestocks(): void {
    this.isAvailable = false
   this.livestockService.GetAllPostedLivestock().subscribe((livestock:any) => {
    this.livestock = livestock.filter((res:any) => String(res.status) != String("archived"));
    console.log('check archive',this.livestock)
    })
  }
  
  getMyLivestocks(): void {
      
    this.isAvailable = true

    this.livestockService.GetAllPostedLivestock().subscribe((livestock:any) => {
     let results = livestock;

    let livestocks1 = results.filter((res:any) => String(res.UserID) === String(sessionStorage.getItem('loggedID')))
    this.livestock = livestocks1.filter((res:any) => String(res.status) != String("archived"));
     })
   }
  
  getOneData(items:any)
  {
    this.livestockData =[items]
  }
  getUser()
  {
    this.authService.GetAllUsers().subscribe((res:any) => {
      let result = res;   
      this.users = result.filter((res:any) => String(res.email) === String(sessionStorage.getItem('loggedEmail')))
    });
  }
  btnBuy(item:any)
  {
   console.log(item.livestockID)

    let transationDetails = {
      livestockID: item.livestockID,
      userID: this.livestock[0].UserID,
      status: "pending",
      buyerID: this.users[0].Userid
    }
    console.log(this.users)
    console.log(transationDetails)

    this.transactionService.CreateTranstaction(transationDetails).subscribe((next:any) => {

      this.router.navigate(['/orders']);
    }, (err) => {
      if(err.status === 201)
      {
        // this.successfullToast();
        this.router.navigate(['/orders']);
      }
      else if(err.status === 400)
      {
        // this.errorToast("Something went wrong, please try again!");
      }
      else{
        // this.errorToast("Something went wrong, please try again!");
      }
  });
 
}


  addToCart(livesId:any){
    // this.livestockC.push(JSON.stringify(livesId));
    // localStorage.setItem("cartIds", JSON.stringify(this.livestockC));

    const storageVal = localStorage.getItem('cartIds');
    const val = storageVal ? JSON.parse(storageVal) : []
    // this.fetchAnimal = val;

    val.push(JSON.stringify(livesId))
    localStorage.setItem("cartIds", JSON.stringify(val));
  }

  addItem(event:any)
  {
    this.filterSearch = event[0];
    this.filterSearch1 = event[1];
  }
  getPriceCurrency(price:any){
    return price.slice(1,price.length);
  }

  
  DeleteMyLivestock()
  {
    let st= {
      status: "archived"
    }
    this.livestockService.deleteLivestock(this.DeleteLivestockID, st).subscribe(async res => {
      // await this.getUsers();
    }, (err) => {

      if(Number(err.status) === Number(0)){
        let msg = `There's been an error please try again`;
        // this.errorToast(msg)
      }
      else if(err.status === 200){
        // this.successfullToast();
        this.closeModal()
      }
      else if(err.status === 201){

        // this.successfullToast();
        this.closeModal()
        }
      else{
        // this.errorToast("Something went wrong, please try again")
      }
  });
    this.closeModal();

  }

  deleteMyLivestock(livestockID:any)
  {
    this.DeleteLivestockID = livestockID;
  }

  closeModal() {
    let modalCheckbox:any = document.getElementById('my-modal')
    modalCheckbox.checked = false
  }

}
