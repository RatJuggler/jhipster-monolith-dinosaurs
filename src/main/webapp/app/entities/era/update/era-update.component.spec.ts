jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { EraService } from '../service/era.service';
import { IEra, Era } from '../era.model';

import { EraUpdateComponent } from './era-update.component';

describe('Component Tests', () => {
  describe('Era Management Update Component', () => {
    let comp: EraUpdateComponent;
    let fixture: ComponentFixture<EraUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let eraService: EraService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [EraUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(EraUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EraUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      eraService = TestBed.inject(EraService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const era: IEra = { id: 456 };

        activatedRoute.data = of({ era });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(era));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const era = { id: 123 };
        spyOn(eraService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ era });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: era }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(eraService.update).toHaveBeenCalledWith(era);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const era = new Era();
        spyOn(eraService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ era });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: era }));
        saveSubject.complete();

        // THEN
        expect(eraService.create).toHaveBeenCalledWith(era);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const era = { id: 123 };
        spyOn(eraService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ era });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(eraService.update).toHaveBeenCalledWith(era);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
