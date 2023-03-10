import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth-layout/auth-layout.module').then(m => m.AuthLayoutModule) },
  { path: '', loadChildren: () => import('./user-layout/user-layout.module').then(m => m.UserLayoutModule) },
  { path: 'admin', loadChildren: () => import('./admin-layout/admin-layout.module').then(m => m.AdminLayoutModule) }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
