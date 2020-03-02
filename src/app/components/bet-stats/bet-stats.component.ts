import { Component, OnInit } from '@angular/core';
import { TopWinsService } from 'src/app/services/top-wins.service';
import { TopWins } from 'src/app/interfaces/top-wins';

@Component({
  selector: 'app-bet-stats',
  templateUrl: './bet-stats.component.html',
  styleUrls: ['./bet-stats.component.css']
})
export class BetStatsComponent implements OnInit {

  topWins: TopWins[];

  constructor(public data: TopWinsService) { }

  ngOnInit(): void {
    this.topWins = this.data.topWins;
  }

}
