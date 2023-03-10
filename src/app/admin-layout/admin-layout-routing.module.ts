import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLandingComponent } from './components/admin-landing/admin-landing.component';
import { BreedModalComponent } from './components/breed/breed-modal/breed-modal.component';
import { BreedComponent } from './components/breed/breed.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoryModalComponent } from './components/categories/category-modal/category-modal.component';
import { LivestockComponent } from './components/livestock/livestock.component';
import { ListUserComponent } from './components/user/list-user/list-user.component';
import { UserModalComponent } from './components/user/list-user/user-modal/user-modal.component';

export const AdminLayoutRoutingModule: Routes = [
  { path: '', component: AdminLandingComponent },
  { path: 'users', component: ListUserComponent },
  { path: 'users/:id', component: UserModalComponent },
  { path: 'livestock', component:LivestockComponent },
  { path: 'category', component:CategoriesComponent },
  { path: 'editCategory/:id', component:CategoryModalComponent },
  { path: 'addcategory', component:CategoryModalComponent },
  { path: 'breed', component:BreedComponent },
  { path: 'addBreed', component:BreedModalComponent },
  { path: 'editBreed/:id', component:BreedModalComponent },
];
