import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MorseCodeTranslatorComponent } from './morse-code-translator.component';

describe('MorseCodeTranslatorComponent', () => {
  let component: MorseCodeTranslatorComponent;
  let fixture: ComponentFixture<MorseCodeTranslatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MorseCodeTranslatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MorseCodeTranslatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
