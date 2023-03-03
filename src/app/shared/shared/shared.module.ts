import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutModule } from 'src/app/admin-layout/admin-layout.module';
import { BuyerLayoutComponent } from 'src/app/buyer-layout/buyer-layout.component';
import { BuyerLayoutModule } from 'src/app/buyer-layout/buyer-layout.module';
import { SellerLayoutModule } from 'src/app/seller-layout/seller-layout.module';
import { HeaderComponent } from '../header/header.component';




@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    
  ]
  ,exports: [
    HeaderComponent
  ],
  providers: 
  [
    HeaderComponent
  ]
})
export class SharedModule { }



