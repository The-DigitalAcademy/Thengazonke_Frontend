import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';

import { HomepageComponent } from './components/buyer/homepage/homepage.component';

import { AdminHeaderComponent } from './components/admin-header/admin-header.component';

import { HeaderComponent } from './components/header/header.component';

import { OrderRequestComponent } from './components/order-request/order-request.component';

import { OrderHistoryComponent } from './components/order-history/order-history.component';

import { UserLayoutComponent } from './user-layout/user-layout.component';
import { LandingComponent } from './components/landing/landing.component';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },

  { 
    path: 'admin',
    component: AdminLayoutComponent, 
    children: [
    {
      path: '',
      loadChildren: () => import('./admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
    }]
  },
  { 
    path: '', 
    component: UserLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: () => import('./user-layout/user-layout.module').then(x => x.UserLayoutModule)
    }]
  },
  {path: 'header', component:HeaderComponent},

  {path: 'home', component:HomepageComponent},
  {path: 'land', component:LandingComponent},


  {path: 'order-request', component:OrderRequestComponent},
  {path: 'admin-header', component:AdminHeaderComponent},
  


  {path: 'order-history', component:OrderHistoryComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
