import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEra } from 'app/shared/model/era.model';

@Component({
  selector: 'jhi-era-detail',
  templateUrl: './era-detail.component.html'
})
export class EraDetailComponent implements OnInit {
  era: IEra;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ era }) => {
      this.era = era;
    });
  }

  previousState() {
    window.history.back();
  }
}
