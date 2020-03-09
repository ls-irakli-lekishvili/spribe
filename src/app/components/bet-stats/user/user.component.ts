import {Component, AfterViewInit, Input, OnInit} from '@angular/core';
import {TopWins} from '../../../interfaces/top-wins';
import {Game} from '../../../interfaces/game';
import {HeaderGameDataService} from '../../../services/header-game-data.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input() data: TopWins;
  game: Game[];

  constructor(public gameData: HeaderGameDataService) {}

  ngOnInit(): void {
    this.game = this.gameData.games;
    this.addIndexes();
  }

  // adds indexes to find pictures of game easily
  addIndexes() {
    this.data['index'] = this.game
      .findIndex(el => el.name === this.data.game);
    this.data['color'] = this.game[this.data.index].color;
    this.data.result = Number(this.data.result);
  }

}
