import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistCounterComponent } from './playlist-counter.component';

describe('PlaylistCounterComponent', () => {
  let component: PlaylistCounterComponent;
  let fixture: ComponentFixture<PlaylistCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistCounterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaylistCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
