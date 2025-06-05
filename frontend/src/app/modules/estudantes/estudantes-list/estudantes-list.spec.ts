import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudantesList } from './estudantes-list';

describe('EstudantesList', () => {
  let component: EstudantesList;
  let fixture: ComponentFixture<EstudantesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstudantesList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstudantesList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
