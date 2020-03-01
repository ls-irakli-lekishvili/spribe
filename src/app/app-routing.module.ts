import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'plinko', loadChildren: () => import('./games/plinko/plinko.module').then(e => e.PlinkoModule)},
  { path: 'mines', loadChildren: () => import('./games/mines/mines.module').then(e => e.MinesModule)},
  { path: 'goal', loadChildren: () => import('./games/goal/goal.module').then(e => e.GoalModule)},
  { path: 'hilo', loadChildren: () => import('./games/hilo/hilo.module').then(e => e.HiloModule)},
  { path: 'dice', loadChildren: () => import('./games/dice/dice.module').then(e => e.DiceModule)},
  { path: 'roulette', loadChildren: () => import('./games/roulette/roulette.module').then(e => e.RouletteModule)},
  { path: 'keno', loadChildren: () => import('./games/keno/keno.module').then(e => e.KenoModule)},
  { path: 'blackjack', loadChildren: () => import('./games/blackjack/blackjack.module').then(e => e.BlackjackModule)},
  { path: '',
    redirectTo: '/plinko',
    pathMatch: 'full' },
  { path: '**', loadChildren: () => import('./components/error-page/error-page.module').then(e => e.ErrorPageModule)}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
