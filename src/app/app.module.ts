import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RateComponent } from './components/rate/rate.component';
import { AccountComponent } from './components/account/account.component';
import { SellerComponent } from './components/seller/seller.component';
import { ReviewComponent } from './components/review/review.component';
import { UserLayoutModule } from "./user-layout/user-layout.module";
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';


@NgModule({
    declarations: [
        AppComponent,
        RateComponent,
        AccountComponent,
        SellerComponent,
        ReviewComponent,
        SnackbarComponent,
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        RouterModule,
        UserLayoutModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatSnackBarModule,
        MatSidenavModule,


    ],
    exports: [MatSidenavModule],

})
export class AppModule { }
