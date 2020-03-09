import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlackjackComponent } from './blackjack.component';
import {RouterModule} from '@angular/router';

const routes = [
  { path: '', component: BlackjackComponent },
  ];

@NgModule({
  declarations: [BlackjackComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class BlackjackModule { }
