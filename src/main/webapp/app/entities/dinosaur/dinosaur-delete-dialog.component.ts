import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDinosaur } from 'app/shared/model/dinosaur.model';
import { DinosaurService } from './dinosaur.service';

@Component({
  templateUrl: './dinosaur-delete-dialog.component.html',
})
export class DinosaurDeleteDialogComponent {
  dinosaur?: IDinosaur;

  constructor(protected dinosaurService: DinosaurService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.dinosaurService.delete(id).subscribe(() => {
      this.eventManager.broadcast('dinosaurListModification');
      this.activeModal.close();
    });
  }
}
