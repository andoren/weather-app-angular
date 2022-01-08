import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MindailyweatherComponent } from './mindailyweather.component';

describe('MindailyweatherComponent', () => {
  let component: MindailyweatherComponent;
  let fixture: ComponentFixture<MindailyweatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MindailyweatherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MindailyweatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
