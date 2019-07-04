import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DinosaursSharedModule } from 'app/shared';
import {
    EraComponent,
    EraDetailComponent,
    EraUpdateComponent,
    EraDeletePopupComponent,
    EraDeleteDialogComponent,
    eraRoute,
    eraPopupRoute
} from './';

const ENTITY_STATES = [...eraRoute, ...eraPopupRoute];

@NgModule({
    imports: [DinosaursSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [EraComponent, EraDetailComponent, EraUpdateComponent, EraDeleteDialogComponent, EraDeletePopupComponent],
    entryComponents: [EraComponent, EraUpdateComponent, EraDeleteDialogComponent, EraDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DinosaursEraModule {}
