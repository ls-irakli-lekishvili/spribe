import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoalComponent } from './goal.component';
import {RouterModule} from '@angular/router';
import { GameComponent } from './components/game/game.component';
import { BetComponent } from './components/bet/bet.component';

const routes = [
  { path: '', component: GoalComponent }
];

@NgModule({
  declarations: [GoalComponent, GameComponent, BetComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class GoalModule { }
