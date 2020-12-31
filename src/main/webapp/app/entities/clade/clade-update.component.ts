import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IClade, Clade } from 'app/shared/model/clade.model';
import { CladeService } from './clade.service';

@Component({
  selector: 'jhi-clade-update',
  templateUrl: './clade-update.component.html',
})
export class CladeUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    description: [null, [Validators.required, Validators.maxLength(64)]],
  });

  constructor(protected cladeService: CladeService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ clade }) => {
      this.updateForm(clade);
    });
  }

  updateForm(clade: IClade): void {
    this.editForm.patchValue({
      id: clade.id,
      description: clade.description,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const clade = this.createFromForm();
    if (clade.id !== undefined) {
      this.subscribeToSaveResponse(this.cladeService.update(clade));
    } else {
      this.subscribeToSaveResponse(this.cladeService.create(clade));
    }
  }

  private createFromForm(): IClade {
    return {
      ...new Clade(),
      id: this.editForm.get(['id'])!.value,
      description: this.editForm.get(['description'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IClade>>): void {
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
}
