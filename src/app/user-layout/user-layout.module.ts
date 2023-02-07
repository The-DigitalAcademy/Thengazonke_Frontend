import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { UserLayoutRoutingModule } from './user-layout-routing.module';
import { UserLayoutComponent } from './user-layout.component';
import { FooterComponent } from '../components/footer/footer.component';
import { HeaderComponent } from '../components/header/header.component';
import { LandingComponent } from '../components/landing/landing.component';
import { RouterModule } from '@angular/router';
import { UserLayoutRoutingModule } from './user-layout-routing.module';
import { ContactUsComponent } from '../components/contact-us/contact-us.component';
import { SearchComponent } from '../components/search/search.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderRequestComponent } from '../components/order-request/order-request.component';
import { OrderHistoryComponent } from '../components/order-history/order-history.component';
import { CreateLivestockComponent } from '../components/create-livestock/create-livestock.component';
import { NotificationsComponent } from '../notifications/notifications.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { HomepageComponent } from '../components/buyer/homepage/homepage.component';
import { CarouselComponent } from '../components/carousel/carousel.component';
import { AvailablelivestockComponent } from '../components/availablelivestock/availablelivestock.component';
import { MylivestockComponent } from '../components/seller/mylivestock/mylivestock.component';
import { HttpClientModule } from '@angular/common/http';
import { LivestockModalComponent } from '../components/create-livestock/livestock-modal/livestock-modal.component';


@NgModule({
  declarations: [
    UserLayoutComponent,
    FooterComponent,
    HeaderComponent,
    LandingComponent,
    SearchComponent,
    HomepageComponent,
    ContactUsComponent,
    OrderRequestComponent,
    OrderHistoryComponent,
    CreateLivestockComponent,
    NotificationsComponent,
    ProfileComponent,
    CarouselComponent,
    AvailablelivestockComponent,
    MylivestockComponent,
    LivestockModalComponent
   
  ],
  imports: [

  CommonModule,
  UserLayoutRoutingModule, FormsModule,Ng2SearchPipeModule,
  HttpClientModule,
  ReactiveFormsModule
  ]
})
export class UserLayoutModule { }
