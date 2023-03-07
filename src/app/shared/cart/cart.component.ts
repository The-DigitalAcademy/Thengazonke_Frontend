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

  constructor(private livestockService:LivestockService, private transactionService: TransactionService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.livestockService.GetAllPostedLivestock()
    .subscribe((res:any) => {
      let result = res;   
      this.livestockAll = result.filter((res:any) => String(res.status) != String("archived"));
    });
  }

  addToCart(){
    this.livestock.push(JSON.stringify(Date.now()));
    localStorage.setItem("ad", JSON.stringify(this.livestock));

    const storageVal = localStorage.getItem('ad');
    console.log(storageVal)

    const val = storageVal ? JSON.parse(storageVal) : []
    val.push(JSON.stringify(Date.now()))

    localStorage.setItem("ad", JSON.stringify(val));
  }

}
