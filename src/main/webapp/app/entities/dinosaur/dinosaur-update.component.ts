import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IDinosaur, Dinosaur } from 'app/shared/model/dinosaur.model';
import { DinosaurService } from './dinosaur.service';
import { IEra } from 'app/shared/model/era.model';
import { EraService } from 'app/entities/era/era.service';
import { IClade } from 'app/shared/model/clade.model';
import { CladeService } from 'app/entities/clade/clade.service';

type SelectableEntity = IEra | IClade;

@Component({
  selector: 'jhi-dinosaur-update',
  templateUrl: './dinosaur-update.component.html'
})
export class DinosaurUpdateComponent implements OnInit {
  isSaving = false;
  eras: IEra[] = [];
  clades: IClade[] = [];

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
    protected dinosaurService: DinosaurService,
    protected eraService: EraService,
    protected cladeService: CladeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ dinosaur }) => {
      if (!dinosaur.id) {
        const today = moment().startOf('day');
        dinosaur.insertDt = today;
        dinosaur.modifiedDt = today;
      }

      this.updateForm(dinosaur);

      this.eraService.query().subscribe((res: HttpResponse<IEra[]>) => (this.eras = res.body || []));

      this.cladeService.query().subscribe((res: HttpResponse<IClade[]>) => (this.clades = res.body || []));
    });
  }

  updateForm(dinosaur: IDinosaur): void {
    this.editForm.patchValue({
      id: dinosaur.id,
      name: dinosaur.name,
      weight: dinosaur.weight,
      length: dinosaur.length,
      diet: dinosaur.diet,
      insertDt: dinosaur.insertDt ? dinosaur.insertDt.format(DATE_TIME_FORMAT) : null,
      modifiedDt: dinosaur.modifiedDt ? dinosaur.modifiedDt.format(DATE_TIME_FORMAT) : null,
      eraId: dinosaur.eraId,
      cladeId: dinosaur.cladeId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
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
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      weight: this.editForm.get(['weight'])!.value,
      length: this.editForm.get(['length'])!.value,
      diet: this.editForm.get(['diet'])!.value,
      insertDt: this.editForm.get(['insertDt'])!.value ? moment(this.editForm.get(['insertDt'])!.value, DATE_TIME_FORMAT) : undefined,
      modifiedDt: this.editForm.get(['modifiedDt'])!.value ? moment(this.editForm.get(['modifiedDt'])!.value, DATE_TIME_FORMAT) : undefined,
      eraId: this.editForm.get(['eraId'])!.value,
      cladeId: this.editForm.get(['cladeId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDinosaur>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
