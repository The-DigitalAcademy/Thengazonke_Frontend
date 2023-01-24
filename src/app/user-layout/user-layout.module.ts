import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { UserLayoutRoutingModule } from './user-layout-routing.module';
import { UserLayoutComponent } from './user-layout.component';
import { FooterComponent } from '../components/footer/footer.component';
import { HeaderComponent } from '../components/header/header.component';
import { LandingComponent } from '../components/landing/landing.component';
import { RouterModule } from '@angular/router';
import { UserLayoutRoutingModule } from './user-layout-routing.module';
import { SearchComponent } from '../components/search/search.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import { HomepageComponent } from '../components/buyer/homepage/homepage.component';


@NgModule({
  declarations: [
    UserLayoutComponent,
    FooterComponent,
    HeaderComponent,
    LandingComponent,
    SearchComponent,
    HomepageComponent

  ],
  imports: [
    CommonModule,
    UserLayoutRoutingModule, FormsModule, Ng2SearchPipeModule
    // RouterModule.forChild(LayoutRoutes),
  ]
})
export class UserLayoutModule { }
