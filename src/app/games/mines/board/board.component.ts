import {Component, OnInit} from '@angular/core';
import {Square} from '../../../interfaces/square';
import {MoneyService} from '../../../services/money.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  squares: any[] = new Array(25).fill(null);
  starAmount: number;
  allStars: number;
  squaresLeft: number = 25;
  moneyInput: string = '0.10';
  lastPressedButton = {1: false, 2: false, 5: false, 10: false};
  bombInput: string = '3';
  mines: number;
  betClicked: boolean = false;
  notOpened: boolean = true;
  starsOpened: number = 0;
  firstMove: boolean = false;
  // money
  balance: number;
  currentWin: number;
  nextWin: number;
  // timeIntervals
  timeout;
  interval;

  constructor(public money: MoneyService) {
  }

  ngOnInit(): void {
    this.balance = this.money.balance.value;
    this.setUp();
  }

  // Game
  setUp(): void {
    this.squares = this.squares.map<Square>(element => element = {
      pressed: false,
      handPressed: 0,
      image: 'assets/images/dots.svg'
    });
    this.starsOpened = 0;
  }

  clickHandler(index: number): void {
    if (this.betClicked) {
      this.squaresLeft--;
      this.firstMove = false;
      if (this.squares[index].pressed !== true) {
        this.squares[index].pressed = true;
        this.squares[index].handPressed = 2;
        if (this.gameLogic()) {
          this.squares[index].image = 'assets/images/explode.svg';
          this.squares[index].handPressed = 1;
          this.mines--;
          this.betClicked = false;
          // checks for enough money
          if (Number(this.moneyInput) > this.balance) {
            this.firstMove = true;
          }
          this.finish();
        } else {
          this.squares[index].image = 'assets/images/star.svg';
          this.starAmount--;
          this.starsOpened++;
          this.currentWin = this.nextWin;
          this.nextWinCalc();
        }
      }
    }
  }

  gameLogic(): boolean {
    let rand = Math.floor(Math.random() * this.starAmount);
    return rand < this.mines;
  }

  finish() {
    this.squares.forEach(element => {
      if (!element.pressed) {
        element.pressed = true;
        if (this.gameLogic()) {
          element.image = 'assets/images/bomb.svg';
          this.mines--;
        } else {
          element.image = 'assets/images/star.svg';
          this.starAmount--;
        }
      }
    });
  }

  // Options > money

  valueHandler(val: string) {
    if (Number(val) >= 0.1 && Number(val) <= 300.0) {
      this.moneyInput = (+val).toFixed(2);
    } else {
      this.moneyInput = Number(val) > 300 ? '300.00' : '0.10';
    }
    if (Number(this.moneyInput) > this.balance) {
      this.moneyInput = this.balance.toFixed(2);
    }
    this.firstMove = false;
  }

  mpButton(sign: string, call: boolean) {
    if (call) {
      this.incDecValue(sign);
      this.timeout = setTimeout(() => this.interval = setInterval(() => this.incDecValue(sign), 50), 500);
    } else {
      this.incDecBomb(sign);
      this.timeout = setTimeout(() => this.interval = setInterval(() => this.incDecBomb(sign), 50), 500);
    }
  }

  stopIncrease() {
    clearTimeout(this.timeout);
    clearInterval(this.interval);
  }

  incDecValue(sign: string) {
    if (!this.betClicked) {
      if (sign === '+') {
        this.moneyInput = ((+this.moneyInput) + 0.1).toString();
      } else {
        this.moneyInput = ((+this.moneyInput) - 0.1).toString();
      }
      this.valueHandler(this.moneyInput);
    }
  }

  fastAddMoney(num: number) {
    if (!this.lastPressedButton[num]) {
      this.moneyInput = num.toString();
      // marks pressed button
      for (let key in this.lastPressedButton) {
        this.lastPressedButton[key] = key === num.toString();
      }
    } else {
      this.moneyInput = (+this.moneyInput + num).toString();
    }
    this.valueHandler(this.moneyInput);
  }

  // Options > mines

  bombHandler(val: string) {
    if (Number(val) >= 1 && Number(val) <= 20) {
      this.bombInput = val;
    } else {
      this.bombInput = Number(val) > 20 ? '20' : '1';
    }
  }

  incDecBomb(sign: string) {
    if (!this.betClicked) {
      if (sign === '+') {
        this.bombInput = (+this.bombInput + 1).toString();
      } else {
        this.bombInput = (+this.bombInput - 1).toString();
      }
      this.bombHandler(this.bombInput);
    }
  }

  setBomb(num: number) {
    this.bombInput = num.toString();
  }

  gameOn() {
    this.betClicked = !this.betClicked;
    if (this.betClicked) {
      this.balance -= Number(this.moneyInput);
      this.currentWin = Number(this.moneyInput);
      this.mines = Number(this.bombInput);
      this.starAmount = 25 - this.mines;
      this.firstMove = true;
      this.squaresLeft = 25;
      this.allStars = this.starAmount;
      this.nextWinCalc();
      this.setUp();
    } else {
      this.balance += this.currentWin;
      this.finish();
    }
    this.money.balance.next(this.balance);
  }

  openRandomly() {
    while (true) {
      let rand = 25 * Math.random() << 0;
      if (!this.squares[rand].pressed) {
        this.clickHandler(rand);
        break;
      }
    }
  }

// money calculation
  nextWinCalc() {
    this.nextWin = this.currentWin + (this.currentWin * (this.mines / this.squaresLeft));
  }
}
