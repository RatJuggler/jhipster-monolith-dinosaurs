/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DinosaursTestModule } from '../../../test.module';
import { EraUpdateComponent } from 'app/entities/era/era-update.component';
import { EraService } from 'app/entities/era/era.service';
import { Era } from 'app/shared/model/era.model';

describe('Component Tests', () => {
    describe('Era Management Update Component', () => {
        let comp: EraUpdateComponent;
        let fixture: ComponentFixture<EraUpdateComponent>;
        let service: EraService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DinosaursTestModule],
                declarations: [EraUpdateComponent]
            })
                .overrideTemplate(EraUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EraUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EraService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Era(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.era = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Era();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.era = entity;
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
