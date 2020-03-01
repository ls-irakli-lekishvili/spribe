import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoalComponent } from './goal.component';
import {RouterModule} from '@angular/router';

const routes = [
  { path: '', component: GoalComponent }
];

@NgModule({
  declarations: [GoalComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class GoalModule { }
