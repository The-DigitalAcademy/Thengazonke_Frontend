import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
// import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { HomepageComponent } from './components/buyer/homepage/homepage.component';
//import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    // HomepageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
