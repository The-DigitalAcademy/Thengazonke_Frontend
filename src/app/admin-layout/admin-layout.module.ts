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


@NgModule({
  declarations: [
    AdminLayoutComponent,
    SideBarComponent,
    AdminHeaderComponent,
    DashboardComponent,
    UserModalComponent,
    ListUserComponent,
    LivestockComponent
  ],
  imports: [
    CommonModule,
    AdminLayoutRoutingModule
  ]
})
export class AdminLayoutModule { }
