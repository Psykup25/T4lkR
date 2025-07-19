import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Talkzone } from './talkzone';

describe('Talkzone', () => {
  let component: Talkzone;
  let fixture: ComponentFixture<Talkzone>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Talkzone]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Talkzone);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
