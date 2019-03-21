import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEra } from 'app/shared/model/era.model';
import { EraService } from './era.service';

@Component({
    selector: 'jhi-era-delete-dialog',
    templateUrl: './era-delete-dialog.component.html'
})
export class EraDeleteDialogComponent {
    era: IEra;

    constructor(protected eraService: EraService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.eraService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'eraListModification',
                content: 'Deleted an era'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-era-delete-popup',
    template: ''
})
export class EraDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ era }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(EraDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.era = era;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/era', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/era', { outlets: { popup: null } }]);
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
