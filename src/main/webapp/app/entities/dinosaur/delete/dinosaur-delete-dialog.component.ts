import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IDinosaur } from '../dinosaur.model';
import { DinosaurService } from '../service/dinosaur.service';

@Component({
  templateUrl: './dinosaur-delete-dialog.component.html',
})
export class DinosaurDeleteDialogComponent {
  dinosaur?: IDinosaur;

  constructor(protected dinosaurService: DinosaurService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.dinosaurService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
