import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecksessionComponent } from './checksession.component';

describe('ChecksessionComponent', () => {
  let component: ChecksessionComponent;
  let fixture: ComponentFixture<ChecksessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChecksessionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChecksessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
