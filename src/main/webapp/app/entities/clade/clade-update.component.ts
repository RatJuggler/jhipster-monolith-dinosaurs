import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IClade, Clade } from 'app/shared/model/clade.model';
import { CladeService } from './clade.service';

@Component({
  selector: 'jhi-clade-update',
  templateUrl: './clade-update.component.html'
})
export class CladeUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    description: [null, [Validators.required, Validators.maxLength(64)]]
  });

  constructor(protected cladeService: CladeService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ clade }) => {
      this.updateForm(clade);
    });
  }

  updateForm(clade: IClade) {
    this.editForm.patchValue({
      id: clade.id,
      description: clade.description
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
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
      id: this.editForm.get(['id']).value,
      description: this.editForm.get(['description']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IClade>>) {
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
