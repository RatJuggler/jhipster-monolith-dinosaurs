import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DinosaursSharedModule } from 'app/shared/shared.module';
import { CladeComponent } from './clade.component';
import { CladeDetailComponent } from './clade-detail.component';
import { CladeUpdateComponent } from './clade-update.component';
import { CladeDeletePopupComponent, CladeDeleteDialogComponent } from './clade-delete-dialog.component';
import { cladeRoute, cladePopupRoute } from './clade.route';

const ENTITY_STATES = [...cladeRoute, ...cladePopupRoute];

@NgModule({
  imports: [DinosaursSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [CladeComponent, CladeDetailComponent, CladeUpdateComponent, CladeDeleteDialogComponent, CladeDeletePopupComponent],
  entryComponents: [CladeDeleteDialogComponent]
})
export class DinosaursCladeModule {}
