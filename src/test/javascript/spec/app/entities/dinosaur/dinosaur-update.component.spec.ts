import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { DinosaursTestModule } from '../../../test.module';
import { DinosaurUpdateComponent } from 'app/entities/dinosaur/dinosaur-update.component';
import { DinosaurService } from 'app/entities/dinosaur/dinosaur.service';
import { Dinosaur } from 'app/shared/model/dinosaur.model';

describe('Component Tests', () => {
  describe('Dinosaur Management Update Component', () => {
    let comp: DinosaurUpdateComponent;
    let fixture: ComponentFixture<DinosaurUpdateComponent>;
    let service: DinosaurService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DinosaursTestModule],
        declarations: [DinosaurUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(DinosaurUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DinosaurUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DinosaurService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Dinosaur(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Dinosaur();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
