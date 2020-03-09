import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {BoardComponent} from './board/board.component';
import { SquareComponent } from './square/square.component';

const routes = [
  { path: '', component: BoardComponent }
];

@NgModule({
  declarations: [BoardComponent, SquareComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class MinesModule { }
