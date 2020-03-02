import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetStatsComponent } from './bet-stats.component';

describe('BetStatsComponent', () => {
  let component: BetStatsComponent;
  let fixture: ComponentFixture<BetStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BetStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
