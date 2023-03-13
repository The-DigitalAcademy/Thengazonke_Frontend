import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutRoutingModule } from './admin-layout-routing.module';
import { AdminLayoutComponent } from './admin-layout.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { AdminLandingComponent } from './components/admin-landing/admin-landing.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ListUserComponent } from './components/user/list-user/list-user.component';
import { DataTablesModule } from 'angular-datatables';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LivestockComponent } from './components/livestock/livestock.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CategoriesComponent } from './components/categories/categories.component';
import { BreedComponent } from './components/breed/breed.component';
import { CategoryModalComponent } from './components/categories/category-modal/category-modal.component';
import { BreedModalComponent } from './components/breed/breed-modal/breed-modal.component';
import { UserModalComponent } from './components/user/list-user/user-modal/user-modal.component';
import { UsersComponent } from './dashboard/users/users.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { LivestocksComponent } from './dashboard/livestock/livestocks.component';
import { AdminRateAndReviewComponent } from './components/admin-rate-and-review/admin-rate-and-review.component';
import { UserReviewComponent } from './components/admin-rate-and-review/user-review/user-review.component';


@NgModule({
  declarations: [
    AdminLayoutComponent,
    AdminHeaderComponent,
    AdminLandingComponent,
    ListUserComponent,
    UserModalComponent,
    SidebarComponent,
    LivestockComponent,
    CategoriesComponent,
    BreedComponent,
    CategoryModalComponent,
    BreedModalComponent,
    UsersComponent,
    LivestocksComponent,
    AdminRateAndReviewComponent,
    UserReviewComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    DataTablesModule,
    NgxPaginationModule,
    NgApexchartsModule,
    RouterModule.forChild(AdminLayoutRoutingModule),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminLayoutModule { }
