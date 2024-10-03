import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalSendComponent } from './local-send.component';

describe('LocalSendComponent', () => {
  let component: LocalSendComponent;
  let fixture: ComponentFixture<LocalSendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalSendComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
