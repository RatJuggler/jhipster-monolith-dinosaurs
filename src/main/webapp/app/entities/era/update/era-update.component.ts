import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IEra, Era } from '../era.model';
import { EraService } from '../service/era.service';

@Component({
  selector: 'jhi-era-update',
  templateUrl: './era-update.component.html',
})
export class EraUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required, Validators.maxLength(64)]],
    fromMa: [null, [Validators.min(0), Validators.max(999)]],
    toMa: [null, [Validators.min(0), Validators.max(999)]],
  });

  constructor(protected eraService: EraService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ era }) => {
      this.updateForm(era);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const era = this.createFromForm();
    if (era.id !== undefined) {
      this.subscribeToSaveResponse(this.eraService.update(era));
    } else {
      this.subscribeToSaveResponse(this.eraService.create(era));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEra>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(era: IEra): void {
    this.editForm.patchValue({
      id: era.id,
      name: era.name,
      fromMa: era.fromMa,
      toMa: era.toMa,
    });
  }

  protected createFromForm(): IEra {
    return {
      ...new Era(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      fromMa: this.editForm.get(['fromMa'])!.value,
      toMa: this.editForm.get(['toMa'])!.value,
    };
  }
}
