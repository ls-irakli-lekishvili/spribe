import { Component, OnInit } from '@angular/core';
import { Game } from '../../interfaces/game'
import { HeaderGameDataService } from 'src/app/services/header-game-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  games: Game[];
  balance: number;


  constructor(public data: HeaderGameDataService) { }

  ngOnInit(): void {
    this.games = this.data.games;
    this.balance = 10000;
  }

}
