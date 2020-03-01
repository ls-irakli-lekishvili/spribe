import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinesComponent } from './mines.component';
import {RouterModule} from '@angular/router';

const routes = [
  { path: '', component: MinesComponent }
];

@NgModule({
  declarations: [MinesComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class MinesModule { }
