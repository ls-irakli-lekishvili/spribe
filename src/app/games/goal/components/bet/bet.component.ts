import {
    Component,
    ElementRef,
    EventEmitter,
    OnDestroy,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { coreService } from '../../../../services/core.service';
import {MoneyService} from "../../../../services/money.service";

@Component({
    selector: 'app-bet',
    templateUrl: './bet.component.html',
    styleUrls: ['./bet.component.scss'],
})
export class BetComponent implements OnInit, OnDestroy {
    // tslint:disable-next-line:no-output-on-prefix
    @Output() onBet: EventEmitter<any> = new EventEmitter();
    variable: number;
    public betStage = true;
    public betBtnText = 'bet';
    public betAmmount = 0;
    private betAmmountSub: Subscription;
    public warningText: string;
    public betValue: number;
    @ViewChild('betInput') betInput: ElementRef<HTMLInputElement>;

    constructor(private core: coreService, private money: MoneyService) {}

    ngOnInit(): void {
        this.core.currentNumber.subscribe(
            variable => (this.variable = variable)
        );
        this.betAmmountSub = this.core.betAmmount.subscribe((bet: number) => {
            this.betAmmount = +bet.toFixed(2);
            this.betBtnText = 'cashout: ' + this.betAmmount + '$';
        });

        this.core.onLost.subscribe(() => {
            this.changeBtnContent();
        });
    }
    ngOnDestroy() {
        this.betAmmountSub.unsubscribe();
    }

    newVariable(variable) {
        this.core.changeMainVariable(variable);
    }

    onSubmitBet() {
        if (!this.betStage) {
            this.changeBtnContent();
            this.core.onCashOut.next();
        } else {
            if (this.betInput.nativeElement.valueAsNumber) {
                if (this.betInput.nativeElement.valueAsNumber <= 0) {
                    this.warningText = 'not correct format';
                } else {
                    if (
                        this.core.clientBalance -
                            this.betInput.nativeElement.valueAsNumber <
                        0
                    ) {
                        this.warningText = 'not enough money';
                    } else {
                        this.core.onBet.next();
                        this.core.betAmmount.next(
                            this.betInput.nativeElement.valueAsNumber
                        );
                        this.core.gameBalance += this.betInput.nativeElement.valueAsNumber;
                        this.changeBtnContent();
                        this.warningText = '';
                        this.money.balance.next(this.core.clientBalance);
                    }
                }
            } else {
                this.warningText = 'not correct format';
            }
        }
        // console.log(this.betInput.nativeElement.valueAsNumber)
    }
    changeBtnContent() {
        if (this.betStage) {
            this.core.clientBalance = +(
                this.core.clientBalance -
                this.betInput.nativeElement.valueAsNumber
            ).toFixed(2);
            this.betStage = false;
            this.betBtnText = 'cashout: ' + this.betAmmount + '$';
        } else {
            this.betStage = true;
            this.betBtnText = 'bet';
        }
    }

    addBet(bet) {
        new Audio('../../assets/goal/sounds/button_click.mp3').play();
        if (this.betValue === bet) {
            this.betInput.nativeElement.valueAsNumber += this.betValue;
        } else {
            this.betValue = bet;
            this.betInput.nativeElement.valueAsNumber = bet;
        }
    }

    addBetPlus() {
        new Audio('../../assets/goal/sounds/button_click.mp3').play();
        if (this.betInput.nativeElement.valueAsNumber < 0.1) {
            this.betInput.nativeElement.valueAsNumber = 0.1;
        }
        this.betInput.nativeElement.valueAsNumber += 0.1;
        this.betInput.nativeElement.value = Number(
            this.betInput.nativeElement.value
        ).toFixed(2);
        // console.log(this.betInput.nativeElement.valueAsNumber);
    }

    minusBet() {
        new Audio('../../assets/goal/sounds/button_click.mp3').play();
        if (this.betInput.nativeElement.valueAsNumber > 0.1) {
            this.betInput.nativeElement.valueAsNumber -= 0.1;
            this.betInput.nativeElement.value = Number(
                this.betInput.nativeElement.value
            ).toFixed(2);
            // console.log(this.betInput.nativeElement.valueAsNumber);
        }
    }
}
