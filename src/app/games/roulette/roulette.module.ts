import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouletteComponent } from './roulette.component';
import {RouterModule} from '@angular/router';

const routes = [
  { path: '', component: RouletteComponent }
];

@NgModule({
  declarations: [RouletteComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class RouletteModule { }
