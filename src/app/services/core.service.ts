import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {MoneyService} from './money.service';

@Injectable({
  providedIn: 'root'
})
export class coreService {
  public mainVariable = new BehaviorSubject<number>(7);
  public onBet = new Subject();
  public onCashOut = new Subject();
  public onLost = new Subject();
  public betAmmount = new Subject<number>();
  public gameBalance: number = 100000;
  public clientBalance: number;

  currentNumber = this.mainVariable.asObservable();

  constructor(public money: MoneyService) {
    this.clientBalance = money.balance.value;
  }

  changeMainVariable(variable: number) {
    this.mainVariable.next(variable);
  }

  clientWin(bet: number, multiplier: number) {
    this.clientBalance += +(bet * multiplier).toFixed(2);
    this.gameBalance -= +(bet * multiplier).toFixed(2);
    Number(this.clientBalance).toFixed(2);
    this.money.balance.next(this.clientBalance);
  }

  logic(multiplier: number, bet: number) {
    if (
      multiplier * bet >= this.gameBalance - 10000 ||
      (Math.floor(Math.random() * 10) + 1) % 5 === 0
    ) {
      return false;
    } else {
      return true;
    }

  }

}
