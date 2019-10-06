import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { DinosaursTestModule } from '../../../test.module';
import { CladeUpdateComponent } from 'app/entities/clade/clade-update.component';
import { CladeService } from 'app/entities/clade/clade.service';
import { Clade } from 'app/shared/model/clade.model';

describe('Component Tests', () => {
  describe('Clade Management Update Component', () => {
    let comp: CladeUpdateComponent;
    let fixture: ComponentFixture<CladeUpdateComponent>;
    let service: CladeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DinosaursTestModule],
        declarations: [CladeUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CladeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CladeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CladeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Clade(123);
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
        const entity = new Clade();
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
