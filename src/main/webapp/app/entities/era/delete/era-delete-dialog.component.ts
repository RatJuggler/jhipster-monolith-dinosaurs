import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IEra } from '../era.model';
import { EraService } from '../service/era.service';

@Component({
  templateUrl: './era-delete-dialog.component.html',
})
export class EraDeleteDialogComponent {
  era?: IEra;

  constructor(protected eraService: EraService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.eraService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
