import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HiloComponent } from './hilo.component';
import {RouterModule} from '@angular/router';

const routes = [
  { path: '', component: HiloComponent }
];

@NgModule({
  declarations: [HiloComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class HiloModule { }
