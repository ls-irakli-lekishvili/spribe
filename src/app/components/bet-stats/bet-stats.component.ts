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
    interval: any;

    constructor(
        public winData: TopWinsService,
        public betData: CurrentBetsService
    ) {
    }

    ngOnInit(): void {
        this.topWins = this.winData.topWins;
        this.currentBets = this.betData.currentBets;
        this.getLastElement();
    }

    activeTab(firstTab: boolean) {
        this.currentPage = firstTab;
        if (!firstTab) {
            clearInterval(this.interval);
        } else {
            this.getLastElement();
        }
    }

    getLastElement() {
            // this.interval = setInterval(() => {
            //         this.currentBets.unshift(this.currentBets[(Math.random() * 10) << 0]);
            //         this.currentBets = this.currentBets.splice(0, 10);
            //         this.test = true;
            //     },
            //     1000);
    }

}
