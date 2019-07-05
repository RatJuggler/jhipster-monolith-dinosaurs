import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IEra, Era } from 'app/shared/model/era.model';
import { EraService } from './era.service';

@Component({
  selector: 'jhi-era-update',
  templateUrl: './era-update.component.html'
})
export class EraUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required, Validators.maxLength(64)]],
    fromMa: [null, [Validators.min(0), Validators.max(999)]],
    toMa: [null, [Validators.min(0), Validators.max(999)]]
  });

  constructor(protected eraService: EraService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ era }) => {
      this.updateForm(era);
    });
  }

  updateForm(era: IEra) {
    this.editForm.patchValue({
      id: era.id,
      name: era.name,
      fromMa: era.fromMa,
      toMa: era.toMa
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const era = this.createFromForm();
    if (era.id !== undefined) {
      this.subscribeToSaveResponse(this.eraService.update(era));
    } else {
      this.subscribeToSaveResponse(this.eraService.create(era));
    }
  }

  private createFromForm(): IEra {
    return {
      ...new Era(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      fromMa: this.editForm.get(['fromMa']).value,
      toMa: this.editForm.get(['toMa']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEra>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
