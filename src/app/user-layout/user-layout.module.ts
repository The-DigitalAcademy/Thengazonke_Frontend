import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLayoutRoutingModule } from './user-layout-routing.module';
import { UserLayoutComponent } from './user-layout.component';
import { HomePageComponent } from '../seller-layout/components/home-page/home-page.component';
import { SearchComponent } from '../shared/search/search.component';
import { AvailableLivestockComponent } from '../shared/available-livestock/available-livestock.component';
import { MyLivestockComponent } from '../seller-layout/components/my-livestock/my-livestock.component';
import { CreateLivestockComponent } from '../seller-layout/components/create-livestock/create-livestock.component';
import { HeaderComponent } from '../shared/header/header.component';
import { RateComponent } from '../buyer-layout/components/rate/rate.component';
import { OrderHistoryComponent } from '../buyer-layout/components/order-history/order-history.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FooterComponent } from '../shared/footer/footer.component';
import { LandingComponent } from '../shared/landing/landing.component';
import { ContactUsComponent } from '../shared/contact-us/contact-us.component';
import { ProfileComponent } from '../shared/profile/profile.component';
import { OrderRequestComponent } from '../seller-layout/components/order-request/order-request.component';
import { HomeComponent } from '../buyer-layout/components/home/home.component';
import { ReviewComponent } from '../seller-layout/components/review/review.component';
import { NgxSpinnerModule } from "ngx-spinner";
  
import { CartComponent } from '../shared/cart/cart.component';


@NgModule({
  declarations: [
    UserLayoutComponent,
    HomePageComponent,
    HomeComponent,
    SearchComponent,
    AvailableLivestockComponent,
    MyLivestockComponent,
    CreateLivestockComponent,
    HeaderComponent,
    OrderHistoryComponent,
    RateComponent,
    FooterComponent,
    LandingComponent,
    ContactUsComponent,
    ProfileComponent,
    OrderRequestComponent,
    ReviewComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    UserLayoutRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,NgxSpinnerModule
  ],

    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserLayoutModule { }
