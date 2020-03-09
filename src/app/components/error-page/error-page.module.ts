import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorPageComponent } from './error-page.component';
import {RouterModule} from '@angular/router';

const routes = [
  { path: '', component: ErrorPageComponent}
];

@NgModule({
  declarations: [ErrorPageComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class ErrorPageModule { }
