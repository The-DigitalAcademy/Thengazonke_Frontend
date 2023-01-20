import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RateComponent } from './components/rate/rate.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { OrderRequestComponent } from './components/order-request/order-request.component';
import { AccountComponent } from './components/account/account.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { SellerComponent } from './components/seller/seller.component';

@NgModule({
  declarations: [
    AppComponent,
    RateComponent,
    OrderHistoryComponent,
    OrderRequestComponent,
    AccountComponent,
    NotificationsComponent,
    SellerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
