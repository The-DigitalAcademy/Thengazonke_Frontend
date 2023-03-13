import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuyerLayoutRoutingModule } from './buyer-layout-routing.module';
import { BuyerLayoutComponent } from './buyer-layout.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { RateComponent } from './components/rate/rate.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SellerLayoutRoutingModule } from '../seller-layout/seller-layout-routing.module';
import { HeaderComponent } from '../shared/header/header.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [
    BuyerLayoutComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,DataTablesModule,
    ReactiveFormsModule,MatSnackBarModule,
    RouterModule.forChild(BuyerLayoutRoutingModule),
  ]
})
export class BuyerLayoutModule { }
