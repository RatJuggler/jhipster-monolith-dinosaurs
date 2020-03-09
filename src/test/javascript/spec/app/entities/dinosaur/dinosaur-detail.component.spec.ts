import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DinosaursTestModule } from '../../../test.module';
import { DinosaurDetailComponent } from 'app/entities/dinosaur/dinosaur-detail.component';
import { Dinosaur } from 'app/shared/model/dinosaur.model';

describe('Component Tests', () => {
  describe('Dinosaur Management Detail Component', () => {
    let comp: DinosaurDetailComponent;
    let fixture: ComponentFixture<DinosaurDetailComponent>;
    const route = ({ data: of({ dinosaur: new Dinosaur(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DinosaursTestModule],
        declarations: [DinosaurDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
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
