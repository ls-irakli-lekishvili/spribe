import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ProfilePopUpComponent } from './components/profile-pop-up/profile-pop-up.component';
import { BetStatsComponent } from './components/bet-stats/bet-stats.component';
import { UserComponent } from './components/bet-stats/user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProfilePopUpComponent,
    BetStatsComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatTabsModule
  ],
  exports: [
    MatDialogModule,
    ProfilePopUpComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
