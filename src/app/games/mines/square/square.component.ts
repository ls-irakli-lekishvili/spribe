import { Component, Input } from '@angular/core';
import {Square} from '../../../interfaces/square';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss']
})
export class SquareComponent {
  @Input() square: Square;
}
