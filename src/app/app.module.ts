import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { ProfilePopUpComponent } from './components/profile-pop-up/profile-pop-up.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProfilePopUpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  exports: [
    MatDialogModule,
    ProfilePopUpComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
