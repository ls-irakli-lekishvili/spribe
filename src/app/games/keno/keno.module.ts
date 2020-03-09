import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KenoComponent } from './keno.component';
import {RouterModule} from '@angular/router';

const routes = [
  { path: '', component: KenoComponent }
];

@NgModule({
  declarations: [KenoComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class KenoModule { }
