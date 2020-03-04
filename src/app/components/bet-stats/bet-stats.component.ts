import {Component, OnInit} from '@angular/core';
import {TopWinsService} from 'src/app/services/top-wins.service';
import {TopWins} from 'src/app/interfaces/top-wins';
import {CurrentBetsService} from '../../services/current-bets.service';

@Component({
    selector: 'app-bet-stats',
    templateUrl: './bet-stats.component.html',
    styleUrls: ['./bet-stats.component.css']
})
export class BetStatsComponent implements OnInit {

    currentBets: TopWins[];
    topWins: TopWins[];
    test: boolean = true;
    currentPage: boolean = true;

    constructor(
        public winData: TopWinsService,
        public betData: CurrentBetsService
    ) {
    }

    ngOnInit(): void {
        this.topWins = this.winData.topWins;
        this.currentBets = this.betData.currentBets;
        // this.addElement();
    }

    activeTab(firstTab: boolean) {
        this.currentPage = firstTab;
    }

    // getS() {
    // }

    addElement() {
    //   setInterval(() => {
        this.currentBets.unshift(this.currentBets[this.currentBets.length - 1]);
        this.currentBets.pop();
    //     this.addClass();
    //   }, 1000);
    }

    // addClass() {
    //   document.getElementById('container').style.animation = 'move 1s infinite';
    //   document.getElementById('container').style.animationFillMode = 'infinite';
    // }
}
