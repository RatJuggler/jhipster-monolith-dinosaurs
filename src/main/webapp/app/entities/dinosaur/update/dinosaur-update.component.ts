import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import * as dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IDinosaur, Dinosaur } from '../dinosaur.model';
import { DinosaurService } from '../service/dinosaur.service';
import { IEra } from 'app/entities/era/era.model';
import { EraService } from 'app/entities/era/service/era.service';
import { IClade } from 'app/entities/clade/clade.model';
import { CladeService } from 'app/entities/clade/service/clade.service';

@Component({
  selector: 'jhi-dinosaur-update',
  templateUrl: './dinosaur-update.component.html',
})
export class DinosaurUpdateComponent implements OnInit {
  isSaving = false;

  erasSharedCollection: IEra[] = [];
  cladesSharedCollection: IClade[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required, Validators.maxLength(64)]],
    weight: [null, [Validators.min(0), Validators.max(999)]],
    length: [null, [Validators.min(0), Validators.max(999)]],
    diet: [],
    insertDt: [null, [Validators.required]],
    modifiedDt: [null, [Validators.required]],
    era: [],
    clade: [],
  });

  constructor(
    protected dinosaurService: DinosaurService,
    protected eraService: EraService,
    protected cladeService: CladeService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ dinosaur }) => {
      if (dinosaur.id === undefined) {
        const today = dayjs().startOf('day');
        dinosaur.insertDt = today;
        dinosaur.modifiedDt = today;
      }

      this.updateForm(dinosaur);

      this.loadRelationshipsOptions();
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

  trackEraById(index: number, item: IEra): number {
    return item.id!;
  }

  trackCladeById(index: number, item: IClade): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDinosaur>>): void {
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

  protected updateForm(dinosaur: IDinosaur): void {
    this.editForm.patchValue({
      id: dinosaur.id,
      name: dinosaur.name,
      weight: dinosaur.weight,
      length: dinosaur.length,
      diet: dinosaur.diet,
      insertDt: dinosaur.insertDt ? dinosaur.insertDt.format(DATE_TIME_FORMAT) : null,
      modifiedDt: dinosaur.modifiedDt ? dinosaur.modifiedDt.format(DATE_TIME_FORMAT) : null,
      era: dinosaur.era,
      clade: dinosaur.clade,
    });

    this.erasSharedCollection = this.eraService.addEraToCollectionIfMissing(this.erasSharedCollection, dinosaur.era);
    this.cladesSharedCollection = this.cladeService.addCladeToCollectionIfMissing(this.cladesSharedCollection, dinosaur.clade);
  }

  protected loadRelationshipsOptions(): void {
    this.eraService
      .query()
      .pipe(map((res: HttpResponse<IEra[]>) => res.body ?? []))
      .pipe(map((eras: IEra[]) => this.eraService.addEraToCollectionIfMissing(eras, this.editForm.get('era')!.value)))
      .subscribe((eras: IEra[]) => (this.erasSharedCollection = eras));

    this.cladeService
      .query()
      .pipe(map((res: HttpResponse<IClade[]>) => res.body ?? []))
      .pipe(map((clades: IClade[]) => this.cladeService.addCladeToCollectionIfMissing(clades, this.editForm.get('clade')!.value)))
      .subscribe((clades: IClade[]) => (this.cladesSharedCollection = clades));
  }

  protected createFromForm(): IDinosaur {
    return {
      ...new Dinosaur(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      weight: this.editForm.get(['weight'])!.value,
      length: this.editForm.get(['length'])!.value,
      diet: this.editForm.get(['diet'])!.value,
      insertDt: this.editForm.get(['insertDt'])!.value ? dayjs(this.editForm.get(['insertDt'])!.value, DATE_TIME_FORMAT) : undefined,
      modifiedDt: this.editForm.get(['modifiedDt'])!.value ? dayjs(this.editForm.get(['modifiedDt'])!.value, DATE_TIME_FORMAT) : undefined,
      era: this.editForm.get(['era'])!.value,
      clade: this.editForm.get(['clade'])!.value,
    };
  }
}
