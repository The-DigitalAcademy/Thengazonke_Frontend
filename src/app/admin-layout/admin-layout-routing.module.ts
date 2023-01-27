import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LivestockComponent } from '../components/create-livestock/livestock/livestock.component';
import { ListUserComponent } from '../components/user/list-user/list-user.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'users', component: ListUserComponent },
  { path: 'livestock', component: LivestockComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule { }
