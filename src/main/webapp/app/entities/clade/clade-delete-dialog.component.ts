import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IClade } from 'app/shared/model/clade.model';
import { CladeService } from './clade.service';

@Component({
  selector: 'jhi-clade-delete-dialog',
  templateUrl: './clade-delete-dialog.component.html'
})
export class CladeDeleteDialogComponent {
  clade: IClade;

  constructor(protected cladeService: CladeService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.cladeService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'cladeListModification',
        content: 'Deleted an clade'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-clade-delete-popup',
  template: ''
})
export class CladeDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ clade }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(CladeDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.clade = clade;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/clade', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/clade', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
