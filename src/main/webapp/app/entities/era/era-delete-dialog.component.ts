import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEra } from 'app/shared/model/era.model';
import { EraService } from './era.service';

@Component({
  templateUrl: './era-delete-dialog.component.html',
})
export class EraDeleteDialogComponent {
  era?: IEra;

  constructor(protected eraService: EraService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.eraService.delete(id).subscribe(() => {
      this.eventManager.broadcast('eraListModification');
      this.activeModal.close();
    });
  }
}
