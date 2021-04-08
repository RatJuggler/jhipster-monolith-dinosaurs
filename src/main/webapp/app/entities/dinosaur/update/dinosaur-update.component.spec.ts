jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { DinosaurService } from '../service/dinosaur.service';
import { IDinosaur, Dinosaur } from '../dinosaur.model';
import { IEra } from 'app/entities/era/era.model';
import { EraService } from 'app/entities/era/service/era.service';
import { IClade } from 'app/entities/clade/clade.model';
import { CladeService } from 'app/entities/clade/service/clade.service';

import { DinosaurUpdateComponent } from './dinosaur-update.component';

describe('Component Tests', () => {
  describe('Dinosaur Management Update Component', () => {
    let comp: DinosaurUpdateComponent;
    let fixture: ComponentFixture<DinosaurUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let dinosaurService: DinosaurService;
    let eraService: EraService;
    let cladeService: CladeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [DinosaurUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(DinosaurUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DinosaurUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      dinosaurService = TestBed.inject(DinosaurService);
      eraService = TestBed.inject(EraService);
      cladeService = TestBed.inject(CladeService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call Era query and add missing value', () => {
        const dinosaur: IDinosaur = { id: 456 };
        const era: IEra = { id: 21586 };
        dinosaur.era = era;

        const eraCollection: IEra[] = [{ id: 44896 }];
        spyOn(eraService, 'query').and.returnValue(of(new HttpResponse({ body: eraCollection })));
        const additionalEras = [era];
        const expectedCollection: IEra[] = [...additionalEras, ...eraCollection];
        spyOn(eraService, 'addEraToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ dinosaur });
        comp.ngOnInit();

        expect(eraService.query).toHaveBeenCalled();
        expect(eraService.addEraToCollectionIfMissing).toHaveBeenCalledWith(eraCollection, ...additionalEras);
        expect(comp.erasSharedCollection).toEqual(expectedCollection);
      });

      it('Should call Clade query and add missing value', () => {
        const dinosaur: IDinosaur = { id: 456 };
        const clade: IClade = { id: 24111 };
        dinosaur.clade = clade;

        const cladeCollection: IClade[] = [{ id: 19083 }];
        spyOn(cladeService, 'query').and.returnValue(of(new HttpResponse({ body: cladeCollection })));
        const additionalClades = [clade];
        const expectedCollection: IClade[] = [...additionalClades, ...cladeCollection];
        spyOn(cladeService, 'addCladeToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ dinosaur });
        comp.ngOnInit();

        expect(cladeService.query).toHaveBeenCalled();
        expect(cladeService.addCladeToCollectionIfMissing).toHaveBeenCalledWith(cladeCollection, ...additionalClades);
        expect(comp.cladesSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const dinosaur: IDinosaur = { id: 456 };
        const era: IEra = { id: 80609 };
        dinosaur.era = era;
        const clade: IClade = { id: 77304 };
        dinosaur.clade = clade;

        activatedRoute.data = of({ dinosaur });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(dinosaur));
        expect(comp.erasSharedCollection).toContain(era);
        expect(comp.cladesSharedCollection).toContain(clade);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const dinosaur = { id: 123 };
        spyOn(dinosaurService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ dinosaur });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: dinosaur }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(dinosaurService.update).toHaveBeenCalledWith(dinosaur);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const dinosaur = new Dinosaur();
        spyOn(dinosaurService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ dinosaur });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: dinosaur }));
        saveSubject.complete();

        // THEN
        expect(dinosaurService.create).toHaveBeenCalledWith(dinosaur);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const dinosaur = { id: 123 };
        spyOn(dinosaurService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ dinosaur });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(dinosaurService.update).toHaveBeenCalledWith(dinosaur);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackEraById', () => {
        it('Should return tracked Era primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackEraById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackCladeById', () => {
        it('Should return tracked Clade primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackCladeById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
