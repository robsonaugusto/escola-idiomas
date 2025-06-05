import { TestBed } from '@angular/core/testing';

import { Professores } from './professores';

describe('Professores', () => {
  let service: Professores;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Professores);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
