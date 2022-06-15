import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCarteirinhaComponent } from './formulario-carteirinhas.component';

describe('FormularioCarteirinhaComponent', () => {
  let component: FormularioCarteirinhaComponent;
  let fixture: ComponentFixture<FormularioCarteirinhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioCarteirinhaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioCarteirinhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
