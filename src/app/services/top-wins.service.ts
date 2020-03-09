import { Injectable } from '@angular/core';
import { TopWins } from '../interfaces/top-wins';

@Injectable({
  providedIn: 'root'
})
export class TopWinsService {
  topWins: TopWins[] = [
    this.generateDummyData(),
    this.generateDummyData(),
    this.generateDummyData(),
    this.generateDummyData(),
    this.generateDummyData(),
    this.generateDummyData(),
    this.generateDummyData(),
    this.generateDummyData(),
    this.generateDummyData(),
  ];

  // this will be sent from server and bellow functions are unnecessary

  private generateDummyData(): any {
  let games = ["PLINKO", "MINES", "GOAL", "HILO", "DICE", "ROULETTE", "KENO", "BLACKJACK"];
  let data = {};
  data['game'] = games[Math.random() * 8  << 0];
  data['player'] = this.playerName();
  data['bet'] = this.bet();
  data['result'] = this.multiplier();
  data['win'] = this.win(data);
  data['avatar'] = 'assets/images/av-2.png';
  return data;
}

private playerName(): string {
  let id: number = 1000 + Math.random() * 9000 << 0;
  return 'demo' + id;
}

private bet(): string {
  let rand = Math.random() * 300;
  return rand > 0.1 ? rand.toFixed(2): '0.10';
}

private multiplier(): string {
  return (1.1 + Math.random() * 4).toFixed(2);
}

private win (a:any): string {
  return ((+ a.bet) * (+ a.result)).toFixed(2);
}
}
