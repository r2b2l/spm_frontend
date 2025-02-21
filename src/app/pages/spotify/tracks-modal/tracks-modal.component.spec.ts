import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TracksModalComponent } from './tracks-modal.component';

describe('TracksModalComponent', () => {
  let component: TracksModalComponent;
  let fixture: ComponentFixture<TracksModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TracksModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TracksModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
