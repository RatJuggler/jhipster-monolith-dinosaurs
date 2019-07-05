import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IDinosaur, Dinosaur } from 'app/shared/model/dinosaur.model';
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
  isSaving: boolean;

  eras: IEra[];

  clades: IClade[];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required, Validators.maxLength(64)]],
    weight: [null, [Validators.min(0), Validators.max(999)]],
    length: [null, [Validators.min(0), Validators.max(999)]],
    diet: [],
    insertDt: [null, [Validators.required]],
    modifiedDt: [null, [Validators.required]],
    eraId: [],
    cladeId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected dinosaurService: DinosaurService,
    protected eraService: EraService,
    protected cladeService: CladeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ dinosaur }) => {
      this.updateForm(dinosaur);
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

  updateForm(dinosaur: IDinosaur) {
    this.editForm.patchValue({
      id: dinosaur.id,
      name: dinosaur.name,
      weight: dinosaur.weight,
      length: dinosaur.length,
      diet: dinosaur.diet,
      insertDt: dinosaur.insertDt != null ? dinosaur.insertDt.format(DATE_TIME_FORMAT) : null,
      modifiedDt: dinosaur.modifiedDt != null ? dinosaur.modifiedDt.format(DATE_TIME_FORMAT) : null,
      eraId: dinosaur.eraId,
      cladeId: dinosaur.cladeId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const dinosaur = this.createFromForm();
    if (dinosaur.id !== undefined) {
      this.subscribeToSaveResponse(this.dinosaurService.update(dinosaur));
    } else {
      this.subscribeToSaveResponse(this.dinosaurService.create(dinosaur));
    }
  }

  private createFromForm(): IDinosaur {
    return {
      ...new Dinosaur(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      weight: this.editForm.get(['weight']).value,
      length: this.editForm.get(['length']).value,
      diet: this.editForm.get(['diet']).value,
      insertDt: this.editForm.get(['insertDt']).value != null ? moment(this.editForm.get(['insertDt']).value, DATE_TIME_FORMAT) : undefined,
      modifiedDt:
        this.editForm.get(['modifiedDt']).value != null ? moment(this.editForm.get(['modifiedDt']).value, DATE_TIME_FORMAT) : undefined,
      eraId: this.editForm.get(['eraId']).value,
      cladeId: this.editForm.get(['cladeId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDinosaur>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
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
