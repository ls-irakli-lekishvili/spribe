import { Injectable } from '@angular/core';
import { Game } from '../interfaces/game';
@Injectable({
  providedIn: 'root'
})
export class HeaderGameDataService {
  games: Game[] = [
    { image: 'plinko.svg', name: 'PLINKO', color: '#13B893', url: '/plinko'},
    { image: 'mines.svg', name: 'MINES', color: '#0056AF', url: '/mines'},
    { image: 'goal.svg', name: 'GOAL', color: '#26A52B', url: '/goal'},
    { image: 'hilo.svg', name: 'HILO',  color: '#D27E1B', url: '/hilo'},
    { image: 'dice.svg', name: 'DICE',  color: '#6A2DB3', url: '/dice'},
    { image: 'roulette.svg', name: 'ROULETTE',  color: '#0B5B2D', url: '/roulette'},
    { image: 'keno.svg', name: 'KENO',  color: '#C6084A', url: '/keno'},
    { image: 'blackjack.svg', name: 'BLACKJACK',  color: '#065FCA', url: '/blackjack'}
  ];
}
