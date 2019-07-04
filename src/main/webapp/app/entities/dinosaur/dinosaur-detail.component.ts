import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDinosaur } from 'app/shared/model/dinosaur.model';

@Component({
    selector: 'jhi-dinosaur-detail',
    templateUrl: './dinosaur-detail.component.html'
})
export class DinosaurDetailComponent implements OnInit {
    dinosaur: IDinosaur;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ dinosaur }) => {
            this.dinosaur = dinosaur;
        });
    }

    previousState() {
        window.history.back();
    }
}
