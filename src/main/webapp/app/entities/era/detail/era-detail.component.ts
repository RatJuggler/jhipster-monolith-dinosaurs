import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEra } from '../era.model';

@Component({
  selector: 'jhi-era-detail',
  templateUrl: './era-detail.component.html',
})
export class EraDetailComponent implements OnInit {
  era: IEra | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ era }) => {
      this.era = era;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
