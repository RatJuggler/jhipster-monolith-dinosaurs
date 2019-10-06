import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DinosaursSharedModule } from 'app/shared/shared.module';
import { EraComponent } from './era.component';
import { EraDetailComponent } from './era-detail.component';
import { EraUpdateComponent } from './era-update.component';
import { EraDeletePopupComponent, EraDeleteDialogComponent } from './era-delete-dialog.component';
import { eraRoute, eraPopupRoute } from './era.route';

const ENTITY_STATES = [...eraRoute, ...eraPopupRoute];

@NgModule({
  imports: [DinosaursSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [EraComponent, EraDetailComponent, EraUpdateComponent, EraDeleteDialogComponent, EraDeletePopupComponent],
  entryComponents: [EraDeleteDialogComponent]
})
export class DinosaursEraModule {}
