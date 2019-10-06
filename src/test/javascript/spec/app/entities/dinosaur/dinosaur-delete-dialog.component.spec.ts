import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DinosaursTestModule } from '../../../test.module';
import { DinosaurDeleteDialogComponent } from 'app/entities/dinosaur/dinosaur-delete-dialog.component';
import { DinosaurService } from 'app/entities/dinosaur/dinosaur.service';

describe('Component Tests', () => {
  describe('Dinosaur Management Delete Component', () => {
    let comp: DinosaurDeleteDialogComponent;
    let fixture: ComponentFixture<DinosaurDeleteDialogComponent>;
    let service: DinosaurService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DinosaursTestModule],
        declarations: [DinosaurDeleteDialogComponent]
      })
        .overrideTemplate(DinosaurDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DinosaurDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DinosaurService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
