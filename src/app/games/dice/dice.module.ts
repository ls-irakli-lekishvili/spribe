import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiceComponent } from './dice.component';
import {RouterModule} from '@angular/router';

const routes = [
  { path: '', component: DiceComponent }
];

@NgModule({
  declarations: [DiceComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class DiceModule { }
