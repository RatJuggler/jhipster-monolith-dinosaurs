import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IClade } from 'app/shared/model/clade.model';
import { CladeService } from './clade.service';

@Component({
  templateUrl: './clade-delete-dialog.component.html'
})
export class CladeDeleteDialogComponent {
  clade?: IClade;

  constructor(protected cladeService: CladeService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cladeService.delete(id).subscribe(() => {
      this.eventManager.broadcast('cladeListModification');
      this.activeModal.close();
    });
  }
}
