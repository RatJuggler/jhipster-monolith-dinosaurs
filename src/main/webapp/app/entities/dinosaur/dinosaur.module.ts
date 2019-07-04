import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DinosaursSharedModule } from 'app/shared';
import {
    DinosaurComponent,
    DinosaurDetailComponent,
    DinosaurUpdateComponent,
    DinosaurDeletePopupComponent,
    DinosaurDeleteDialogComponent,
    dinosaurRoute,
    dinosaurPopupRoute
} from './';

const ENTITY_STATES = [...dinosaurRoute, ...dinosaurPopupRoute];

@NgModule({
    imports: [DinosaursSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DinosaurComponent,
        DinosaurDetailComponent,
        DinosaurUpdateComponent,
        DinosaurDeleteDialogComponent,
        DinosaurDeletePopupComponent
    ],
    entryComponents: [DinosaurComponent, DinosaurUpdateComponent, DinosaurDeleteDialogComponent, DinosaurDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DinosaursDinosaurModule {}
