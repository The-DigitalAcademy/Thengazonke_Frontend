import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { OrderRequestComponent } from './components/order-request/order-request.component';
import { UserLayoutComponent } from './user-layout/user-layout.component';

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
  {path: 'order-request', component:OrderRequestComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
