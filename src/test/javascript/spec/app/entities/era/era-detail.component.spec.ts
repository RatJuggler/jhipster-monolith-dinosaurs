import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DinosaursTestModule } from '../../../test.module';
import { EraDetailComponent } from 'app/entities/era/era-detail.component';
import { Era } from 'app/shared/model/era.model';

describe('Component Tests', () => {
  describe('Era Management Detail Component', () => {
    let comp: EraDetailComponent;
    let fixture: ComponentFixture<EraDetailComponent>;
    const route = ({ data: of({ era: new Era(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DinosaursTestModule],
        declarations: [EraDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
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
