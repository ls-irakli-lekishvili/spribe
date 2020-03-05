import {Component, OnInit} from '@angular/core';
import {TopWinsService} from 'src/app/services/top-wins.service';
import {TopWins} from 'src/app/interfaces/top-wins';
import {CurrentBetsService} from '../../services/current-bets.service';

@Component({
  selector: 'app-bet-stats',
  templateUrl: './bet-stats.component.html',
  styleUrls: ['./bet-stats.component.css'],
})

export class BetStatsComponent implements OnInit {

  currentBets: TopWins[];
  topWins: TopWins[];
  currentPage: boolean = true;
  interval;

  constructor(
    public winData: TopWinsService,
    public betData: CurrentBetsService
  ) {
  }

  ngOnInit(): void {
    this.topWins = this.winData.topWins;
    this.currentBets = this.betData.currentBets;
    this.adding();
  }

  activeTab(firstTab: boolean) {
    this.currentPage = firstTab;
    if (!firstTab) {
      clearInterval(this.interval);
    } else {
      this.adding();
    }
  }

// will be replaced with service
  adding() {
    this.interval = setInterval(() => {
      this.addElement();
    }, 1500);
  }

  addElement() {
    this.currentBets.unshift(this.currentBets[this.currentBets.length - 1]);
    this.currentBets.pop();
    this.addClass();
    setTimeout(() => this.removeClass(), 1000);
  }

  addClass() {
    const element = document.getElementById('container');
    if (element) {
      element.style.animation = 'move 1100ms';
    }
  }

  removeClass() {
    const element = document.getElementById('container');
    if (element) {
      element.style.animation = null;
    }
  }
}
