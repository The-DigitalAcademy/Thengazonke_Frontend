import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth-layout/services/auth.service';
import { CurrentRouteService } from '../services/current-route.service';
import { LivestockService } from '../services/livestock.service';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
   livestock:string[] = [];
   livestockAll: any;
   livestockCart: any;
   fetchAnimal:any;
   livestocksInfo:any[]=[];
   

  constructor(private livestockService:LivestockService, private transactionService: TransactionService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.livestockService.GetAllPostedLivestock()
    .subscribe((res:any) => {
      let result = res;   
      this.livestockAll = result.filter((res:any) => String(res.status) != String("archived"));
      
      this.getReserved(this.livestockAll)
      // this.myReserves(this.livestockAll)
    });
   
  }


  async getReserved(livest:any){

    const storageVal = localStorage.getItem('cartIds');
    const val = storageVal ? JSON.parse(storageVal) : []
    this.fetchAnimal = val

    for (let index = 0; index < val.length; index++) {
      let liveValue = await livest.filter((res:any) => String(res.livestockID) === String(val[index]));
      this.livestocksInfo.push(liveValue[0])
      console.log('problem',this.livestocksInfo)
    }
    
  }
checkout(){

  if('loggedEmail' in sessionStorage){
    
    for (let index1 = 0; index1 < this.fetchAnimal.length; index1++) {
    let transationDetails = {
      livestockID: this.livestocksInfo[index1].livestockID,
      userID: this.livestocksInfo[index1].UserID,
      status: "pending",
      buyerID: String(sessionStorage.getItem('loggedID'))
    }

  
    
    this.transactionService.CreateTranstaction(transationDetails).subscribe((next:any) => {
      console.log('iran',transationDetails)
      
  
      //this.router.navigate(['/orders']);
  }, (err) => {
    console.log(err)
       if(err.status === 201)
       {
        for (let index = 0; index < this.fetchAnimal.length; index++) {
          //console.log('first',this.fetchAnimal[index],'second',transationDetails.livestockID)

          if(String(this.fetchAnimal[index]) == String(transationDetails.livestockID)){
            const storageVal = localStorage.getItem('cartIds');
            const val = storageVal ? JSON.parse(storageVal) : []
            console.log('first',val)
            val.splice(index, 1);
            console.log('after',val)
            localStorage.setItem("cartIds", JSON.stringify(val));
          }
      }
     
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
}else
{
     this.router.navigate(['/auth/login']);
}

  

  // for (let index1 = 0; index1 < this.fetchAnimal.length; index1++) {

  //   // let transationDetails = {
  //   //   livestockID: this.livestocksInfo[index1].livestockID,
  //   //   userID: this.livestocksInfo[index1].UserID,
  //   //   status: "pending",
  //   //   buyerID: String(sessionStorage.getItem('loggedID'))
  //   // }
  //   // this.transactionService.CreateTranstaction(transationDetails).subscribe((next:any) => {
  //     // for (let index = 0; index < this.fetchAnimal.length; index++) {
  //     //   console.log('first',this.fetchAnimal[index],'second',transationDetails.livestockID)

  //     //   if(this.fetchAnimal[index] == transationDetails.livestockID){

  //     //     const storageVal = localStorage.getItem('cartIds');
  //     //     const val = storageVal ? JSON.parse(storageVal) : []
  //     //     val.splice(index, 1);
  //     //     // localStorage.setItem("cartIds", JSON.stringify(val));
  //     //   }
        
  //     // }
  //       //this.router.navigate(['/orders']);

  //   }, (err) => {
  //        if(err.status === 201)
  //        {
  //         for (let index = 0; index < this.fetchAnimal.length; index++) {
  //           console.log('first',this.fetchAnimal[index],'second',transationDetails.livestockID)
  
  //           if(String(this.fetchAnimal[index]) == String(transationDetails.livestockID)){
  //             const storageVal = localStorage.getItem('cartIds');
  //             const val = storageVal ? JSON.parse(storageVal) : []
  //             console.log('first',val)
  //             val.splice(index, 1);
  //             console.log('after',val)
  //             localStorage.setItem("cartIds", JSON.stringify(val));
  //           }
  //       }
  //       console.log('fi')
  //       localStorage.removeItem('cartIds');
  //       window.location.reload()
  //          // this.successfullToast();
  //          //this.router.navigate(['/orders']);
  //        }
  //        else if(err.status === 400)
  //        {
  //          // this.errorToast("Something went wrong, please try again!");
  //        }
  //        else{
  //          // this.errorToast("Something went wrong, please try again!");
  //        }
  //  });
  // }

  // window.location.reload()
    
  }
reserve(item:any){

  if('loggedEmail' in sessionStorage){
    

      let transationDetails = {
        livestockID: item.livestockID,
        userID: item.UserID,
        status: "pending",
        buyerID: String(sessionStorage.getItem('loggedID'))
      }
      
      this.transactionService.CreateTranstaction(transationDetails).subscribe((next:any) => {
        console.log('iran',transationDetails)
        
    
        //this.router.navigate(['/orders']);
    }, (err) => {
      console.log(err)
         if(err.status === 201)
         {
          for (let index = 0; index < this.fetchAnimal.length; index++) {
            console.log('first',this.fetchAnimal[index],'second',transationDetails.livestockID)
  
            if(String(this.fetchAnimal[index]) == String(transationDetails.livestockID)){
              const storageVal = localStorage.getItem('cartIds');
              const val = storageVal ? JSON.parse(storageVal) : []
              console.log('first',val)
              val.splice(index, 1);
              console.log('after',val)
              localStorage.setItem("cartIds", JSON.stringify(val));
            }
        }
        //window.location.reload()
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
  }else
  {
       this.router.navigate(['/auth/login']);
  }

}

  getPriceCurrency(price:any){
    return price.slice(1,price.length);
  }

}
