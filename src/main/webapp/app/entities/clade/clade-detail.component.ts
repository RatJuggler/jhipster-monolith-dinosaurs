import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IClade } from 'app/shared/model/clade.model';

@Component({
  selector: 'jhi-clade-detail',
  templateUrl: './clade-detail.component.html'
})
export class CladeDetailComponent implements OnInit {
  clade: IClade;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ clade }) => {
      this.clade = clade;
    });
  }

  previousState() {
    window.history.back();
  }
}
