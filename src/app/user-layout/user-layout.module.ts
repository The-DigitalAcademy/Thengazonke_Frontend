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


@NgModule({
  declarations: [
    UserLayoutComponent,
    FooterComponent,
    HeaderComponent,
    LandingComponent,
  ContactUsComponent
  ],
  imports: [

  CommonModule,
    UserLayoutRoutingModule
    // RouterModule.forChild(LayoutRoutes),
  ]
})
export class UserLayoutModule { }
