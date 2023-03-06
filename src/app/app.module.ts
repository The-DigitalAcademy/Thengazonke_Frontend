import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LandingComponent } from './shared/landing/landing.component';
import { ContactUsComponent } from './shared/contact-us/contact-us.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Ng2SearchPipeModule } from 'node_modules/ng2-search-filter';
import { ProfileComponent } from './shared/profile/profile.component';
import { OrderRequestComponent } from './seller-layout/components/order-request/order-request.component';
import { BuyerLayoutModule } from './buyer-layout/buyer-layout.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    Ng2SearchPipeModule,
   
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
