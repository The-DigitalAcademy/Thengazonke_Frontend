import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RateComponent } from './components/rate/rate.component';
import { AccountComponent } from './components/account/account.component';
import { SellerComponent } from './components/seller/seller.component';
import { ReviewComponent } from './components/review/review.component';
import { UserLayoutModule } from "./user-layout/user-layout.module";


@NgModule({
    declarations: [
        AppComponent,
        RateComponent,
        AccountComponent,
        SellerComponent,
        ReviewComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        RouterModule,
        UserLayoutModule
    ]
})
export class AppModule { }
