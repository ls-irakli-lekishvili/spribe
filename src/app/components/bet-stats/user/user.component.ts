import { Component, OnInit, Input} from '@angular/core';
import {TopWins} from '../../../interfaces/top-wins';
import {Game} from '../../../interfaces/game';
import {HeaderGameDataService} from '../../../services/header-game-data.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input() topWin: TopWins;
  game: Game[];
  constructor(public gameData: HeaderGameDataService) { }

  ngOnInit(): void {
    this.game = this.gameData.games;
    this.addIndexes();
  }

  // adds indexes to find pictures of game easily
  addIndexes() {
    this.topWin['index'] = this.game
        .findIndex(el => el.name === this.topWin.game);
  }

}
