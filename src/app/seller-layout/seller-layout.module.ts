import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerLayoutRoutingModule } from './seller-layout-routing.module';
import { SellerLayoutComponent } from './seller-layout.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MyLivestockComponent } from './components/my-livestock/my-livestock.component';
import { CreateLivestockComponent } from './components/create-livestock/create-livestock.component';
import { AvailableLivestockComponent } from '../shared/available-livestock/available-livestock.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SearchComponent } from '../shared/search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../shared/header/header.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    SellerLayoutComponent,
  ],
  imports: [
  CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,NgxSpinnerModule,MatSnackBarModule,
    Ng2SearchPipeModule,
    RouterModule.forChild(SellerLayoutRoutingModule),
  ]
})
export class SellerLayoutModule { }
