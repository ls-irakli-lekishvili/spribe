import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoneyService {
  public balance = new BehaviorSubject(1000);
}
