import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IDinosaur } from 'app/shared/model/dinosaur.model';
import { DinosaurService } from './dinosaur.service';
import { IEra } from 'app/shared/model/era.model';
import { EraService } from 'app/entities/era';
import { IClade } from 'app/shared/model/clade.model';
import { CladeService } from 'app/entities/clade';

@Component({
    selector: 'jhi-dinosaur-update',
    templateUrl: './dinosaur-update.component.html'
})
export class DinosaurUpdateComponent implements OnInit {
    dinosaur: IDinosaur;
    isSaving: boolean;

    eras: IEra[];

    clades: IClade[];
    insertDt: string;
    modifiedDt: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected dinosaurService: DinosaurService,
        protected eraService: EraService,
        protected cladeService: CladeService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ dinosaur }) => {
            this.dinosaur = dinosaur;
            this.insertDt = this.dinosaur.insertDt != null ? this.dinosaur.insertDt.format(DATE_TIME_FORMAT) : null;
            this.modifiedDt = this.dinosaur.modifiedDt != null ? this.dinosaur.modifiedDt.format(DATE_TIME_FORMAT) : null;
        });
        this.eraService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IEra[]>) => mayBeOk.ok),
                map((response: HttpResponse<IEra[]>) => response.body)
            )
            .subscribe((res: IEra[]) => (this.eras = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.cladeService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IClade[]>) => mayBeOk.ok),
                map((response: HttpResponse<IClade[]>) => response.body)
            )
            .subscribe((res: IClade[]) => (this.clades = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.dinosaur.insertDt = this.insertDt != null ? moment(this.insertDt, DATE_TIME_FORMAT) : null;
        this.dinosaur.modifiedDt = this.modifiedDt != null ? moment(this.modifiedDt, DATE_TIME_FORMAT) : null;
        if (this.dinosaur.id !== undefined) {
            this.subscribeToSaveResponse(this.dinosaurService.update(this.dinosaur));
        } else {
            this.subscribeToSaveResponse(this.dinosaurService.create(this.dinosaur));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IDinosaur>>) {
        result.subscribe((res: HttpResponse<IDinosaur>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackEraById(index: number, item: IEra) {
        return item.id;
    }

    trackCladeById(index: number, item: IClade) {
        return item.id;
    }
}
