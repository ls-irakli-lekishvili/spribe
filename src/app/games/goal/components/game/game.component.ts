import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {coreService} from '../../../../services/core.service';
import {MoneyService} from '../../../../services/money.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
  export class GameComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(public core: coreService, private money: MoneyService) {}

  @ViewChild('gameContainer', { static: false }) gameContainer: ElementRef;
  private onBet: Subscription;
  private betAmmountSub: Subscription;
  private onCashOutSub: Subscription;
  public activeBoxes = false;
  public multiplier = [];
  public stage = 0;
  public betAmmount = 0;
  private boxesArray: any[] = [];

  public width = []; // row
  public height = []; // column
  public variable = 7;
  public theBall: any;
  public container: any = document.querySelector('.container');

  ngOnInit(): void {
    this.onBet = this.core.onBet.subscribe(() => {
      this.activeBoxes = true;
      this.stage = 1;
      this.removeClassListsFromBoxes();
    });

    this.betAmmountSub = this.core.betAmmount.subscribe((bet: number) => {
      if (this.betAmmount === 0) {
        this.betAmmount = bet;
      }
    });
    this.onCashOutSub = this.core.onCashOut.subscribe(() => {
      new Audio('../../assets/goal/sounds/win.mp3').play();
      this.onWin();
    });
    this.core.currentNumber.subscribe(variable => {
      this.variable = variable;
      this.multiplierGenerator(this.variable);
      if (this.stage === 0) {
        this.changeRowColumn(variable);
      }
      this.removeClassListsFromBoxes();
    });
  }
  ngAfterViewInit() {
    this.theBall = document.querySelector('#ball');
    // console.log(this.theBall = document.querySelector('#ball'));
    const boxesElement: any[] = this.gameContainer.nativeElement.children;
    this.core.currentNumber.subscribe(variable => {
      this.variable = variable;
      this.boxesArray = [];
      setTimeout(() => {
        for (let i = 0; i < this.width.length; i++) {
          for (let j = 0; j < this.height.length; j++) {
            this.boxesArray.push(boxesElement[i].children[j]);
          }
        }
        // console.log(this.boxesArray);
      }, 50); // noWay just need await (((
    });
  }

  multiplierGenerator(variable) {
    let b = 1.29;
    const g = ['1.29'];
    for (let i = 1; i < variable; i++) {
      b *= 1.24;
      g[i] = b.toFixed(2);
    }
    this.multiplier = g.map(x => parseFloat(x));
  }

  changeRowColumn(variable: number) {
    new Audio('../../assets/goal/sounds/button_click.mp3').play();
    this.width = [];
    this.height = [];
    if (variable === 4) {
      for (let i = 1; i < 3; i++) {
        this.height[i] = i;
      }
      for (let i = 1; i < 4; i++) {
        this.width[i] = i;
      }
    } else {
      for (let i = 1; i < variable / 2; i++) {
        this.height[i] = i;
      }
      for (let i = 1; i < variable; i++) {
        this.width[i] = i;
      }
    }
  }

  clearStage() {
    this.stage = 0;
    this.activeBoxes = false;
    this.betAmmount = 0;
    this.theBall.style.transform = 'translate3d(' + 0 + 'px,' + 0 + 'px,0)';
    // this.removeClassListsFromBoxes();
  }

  removeClassListsFromBoxes() {
    this.boxesArray.forEach((box: any) => {
      box.classList.remove('box-win');
      box.firstChild.classList.remove('bomb-detonation');
      box.firstChild.classList.remove('box-win1');
      box.firstChild.classList.remove('box-lose');
      box.classList.remove('box-lose-pink');
    });
  }

  onBoxClick(event: any) {
    // console.log(this.multiplier[this.stage - 1]);
    // console.log(event)
    if (
      this.stage * this.height.length - event.target.id >= 0 &&
      this.stage * this.height.length - event.target.id <
      this.height.length
    ) {
      if (
        this.core.logic(
          this.multiplier[this.stage - 1],
          this.betAmmount
        )
      ) {
        // win
        this.changeBoxesWin(event);
        this.stage++;
        this.core.betAmmount.next(
          this.betAmmount * this.multiplier[this.stage - 2]
        );
        if (this.stage - 1 === this.width.length) {
          this.core.onLost.next();
          this.onWin();
        }
      } else {
        // lost
        this.changeBoxesLost(event);
        this.core.onLost.next();
        // console.log(event.target.id);
      }
    }
  }

  changeBoxesWin(clickedBox) {
    this.money.balance.next(this.core.clientBalance);
    this.boxesArray[clickedBox.target.id - 1].firstChild.classList.add('box-win1');
    if (this.stage === this.width.length) {
      new Audio('../../assets/goal/sounds/win.mp3').play();
    } else {
      new Audio('../../assets/goal/sounds/soft_win.mp3').play();
    }
    let random = Math.floor(Math.random() * this.height.length) + 1;
    while (clickedBox.target.id - 1 === (this.stage - 1) * this.height.length + random - 1) {
      random = Math.floor(Math.random() * this.height.length) + 1;
    }
    // this.boxesArray[(this.stage - 1) * this.height.length + random - 1].classList.add('box-lose');
    this.boxesArray[(this.stage - 1) * this.height.length + random - 1].firstChild.classList.add('box-lose');
    for (let i = 1; i <= this.height.length; i++) {
      this.boxesArray[(this.stage - 1) * this.height.length + i - 1].classList.add('box-win');
    }
    this.ballLogic(clickedBox);
  }
  changeBoxesLost(clickedBox) {
    this.money.balance.next(this.core.clientBalance);
    this.boxesArray[clickedBox.target.id - 1].firstChild.classList.add('bomb-detonation');
    new Audio('../../assets/goal/sounds/bomb_detect.mp3').play();

    let random = Math.floor(Math.random() * this.height.length) + 1;

    for (let i = this.stage; i < this.width.length; i++) {
      this.stage++;
      random = Math.floor(Math.random() * this.height.length) + 1;
      this.boxesArray[(this.stage - 1) * this.height.length + random - 1].firstChild.classList.add('box-lose');
    }
    for (let i = 1; i <= this.width.length * this.height.length; i++) {
      this.boxesArray[i - 1].classList.add('box-lose-pink');
    }
    this.clearStage();
    this.theBall.style.transform = 'translate3d(' + 0 + 'px,' + 0 + 'px,0)';
  }

  onWin() {
    if (this.stage > 1) {
      this.core.clientWin(
        this.betAmmount,
        this.multiplier[this.stage - 2]
      );
      let random = Math.floor(Math.random() * this.height.length) + 1;

      for (let i = this.stage; i <= this.width.length; i++) {
        random = Math.floor(Math.random() * this.height.length) + 1;
        this.boxesArray[
        (this.stage - 1) * this.height.length + random - 1
          ].firstChild.classList.add('box-lose');
        this.stage++;
      }
      this.boxesArray.forEach((box: any) => {
        box.classList.remove('box-win');
      });
      this.theBall.style.visibility = 'visible';
      this.clearStage();
    } else {
      this.core.clientWin(this.betAmmount, 1);
      this.clearStage();
    }
  }
  ballLogic(event) {
    this.theBall = document.querySelector('#ball');
    this.container = document.querySelector('.container');
    this.container.addEventListener(
      'click',
      getClickPosition(event, this.theBall),
      false
    );
    function getClickPosition(event, ball) {
      if (ball) {
        ball.style.transform =
          'translate3d(' +
          (event.target.offsetLeft +
            event.target.offsetWidth / 2 -
            ball.clientWidth / 2) +
          'px,' +
          (event.target.offsetTop +
            event.target.offsetHeight / 2 -
            ball.clientHeight / 2) +
          'px, 0)';
      }
    }
  }
  ngOnDestroy() {
    this.onBet.unsubscribe();
    this.betAmmountSub.unsubscribe();
    this.onCashOutSub.unsubscribe();
  }
}
