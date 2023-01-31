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
    OrderHistoryModalComponent
  ],
  imports: [
    CommonModule,
    AdminLayoutRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminLayoutModule { }
