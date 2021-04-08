import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EraDetailComponent } from './era-detail.component';

describe('Component Tests', () => {
  describe('Era Management Detail Component', () => {
    let comp: EraDetailComponent;
    let fixture: ComponentFixture<EraDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [EraDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ era: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(EraDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EraDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load era on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.era).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
