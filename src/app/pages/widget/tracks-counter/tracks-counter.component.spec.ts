import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TracksCounterComponent } from './tracks-counter.component';

describe('TracksCounterComponent', () => {
  let component: TracksCounterComponent;
  let fixture: ComponentFixture<TracksCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TracksCounterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TracksCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
