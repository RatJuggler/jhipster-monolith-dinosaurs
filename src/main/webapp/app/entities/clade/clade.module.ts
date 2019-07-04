import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DinosaursSharedModule } from 'app/shared';
import {
    CladeComponent,
    CladeDetailComponent,
    CladeUpdateComponent,
    CladeDeletePopupComponent,
    CladeDeleteDialogComponent,
    cladeRoute,
    cladePopupRoute
} from './';

const ENTITY_STATES = [...cladeRoute, ...cladePopupRoute];

@NgModule({
    imports: [DinosaursSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [CladeComponent, CladeDetailComponent, CladeUpdateComponent, CladeDeleteDialogComponent, CladeDeletePopupComponent],
    entryComponents: [CladeComponent, CladeUpdateComponent, CladeDeleteDialogComponent, CladeDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DinosaursCladeModule {}
