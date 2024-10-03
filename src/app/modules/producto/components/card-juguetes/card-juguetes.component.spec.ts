import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardJuguetesComponent } from './card-juguetes.component';

describe('CardJuguetesComponent', () => {
  let component: CardJuguetesComponent;
  let fixture: ComponentFixture<CardJuguetesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardJuguetesComponent]
    });
    fixture = TestBed.createComponent(CardJuguetesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
