import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminLayoutRoutingModule } from './admin-layout-routing.module';
import { AdminLayoutComponent } from './admin-layout.component';
import { SideBarComponent } from '../components/side-bar/side-bar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminHeaderComponent } from '../components/admin-header/admin-header.component';
import { UserModalComponent } from '../components/user/user-modal/user-modal.component';
import { ListUserComponent } from '../components/user/list-user/list-user.component';
import { LivestockComponent } from '../components/create-livestock/livestock/livestock.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminOrderHistoryComponent } from '../components/order-history/admin-order-history/admin-order-history.component';
import { OrderHistoryModalComponent } from '../components/order-history/order-history-modal/order-history-modal.component';
import { AdminRateAndReviewComponent } from '../components/rate/admin-rate-and-review/admin-rate-and-review.component';
import { UserReviewComponent } from '../components/rate/user-review/user-review.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { UsersComponent } from './dashboard/users/users.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CategoryComponent } from './dashboard/category/category.component';
import { RateAndReviewComponent } from './dashboard/rate-and-review/rate-and-review.component';
import { BreedComponent } from './dashboard/breed/breed.component';
import { TransactionComponent } from './dashboard/transaction/transaction.component';
import { LivestocksComponent } from './dashboard/livestock/livestocks.component';
import { DataTablesModule } from 'angular-datatables';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CategoriesComponent } from '../components/categories/categories.component';
import { BreedModalComponent } from '../components/breed/breed-modal/breed-modal.component';
import { CategoryModalComponent } from '../components/categories/category-modal/category-modal.component';


@NgModule({
  declarations: [
    AdminLayoutComponent,
    SideBarComponent,
    AdminHeaderComponent,
    DashboardComponent,
    UserModalComponent,
    ListUserComponent,
    LivestockComponent,
    AdminOrderHistoryComponent,
    OrderHistoryModalComponent,
    AdminRateAndReviewComponent,
    UserReviewComponent,
    UsersComponent,
    LivestocksComponent,
    CategoryComponent,
    RateAndReviewComponent,
    BreedComponent,
    TransactionComponent,
    CategoryComponent,
    CategoryModalComponent,
    BreedComponent,
    BreedModalComponent,
    CategoriesComponent,
    CategoryModalComponent
  ],
  imports: [
    CommonModule,
    AdminLayoutRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgApexchartsModule,
    DataTablesModule,
    NgxSpinnerModule
  ]
})
export class AdminLayoutModule { }
