import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoginSelComponent } from './login-sel/login-sel.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HotToastModule } from '@ngneat/hot-toast';
// 

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    LoginSelComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
   HotToastModule.forRoot()
  ]
})
export class AuthModule { }
