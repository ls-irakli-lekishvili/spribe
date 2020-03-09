import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlinkoComponent } from './plinko.component';
import {RouterModule} from '@angular/router';

const routes = [
  { path: '', component: PlinkoComponent }
];

@NgModule({
  declarations: [PlinkoComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class PlinkoModule { }
