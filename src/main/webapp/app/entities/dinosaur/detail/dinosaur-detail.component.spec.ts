import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DinosaurDetailComponent } from './dinosaur-detail.component';

describe('Component Tests', () => {
  describe('Dinosaur Management Detail Component', () => {
    let comp: DinosaurDetailComponent;
    let fixture: ComponentFixture<DinosaurDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [DinosaurDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ dinosaur: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(DinosaurDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DinosaurDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load dinosaur on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.dinosaur).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
