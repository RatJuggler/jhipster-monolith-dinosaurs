import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DinosaursSharedModule } from 'app/shared/shared.module';
import { DinosaurComponent } from './dinosaur.component';
import { DinosaurDetailComponent } from './dinosaur-detail.component';
import { DinosaurUpdateComponent } from './dinosaur-update.component';
import { DinosaurDeletePopupComponent, DinosaurDeleteDialogComponent } from './dinosaur-delete-dialog.component';
import { dinosaurRoute, dinosaurPopupRoute } from './dinosaur.route';

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
  entryComponents: [DinosaurDeleteDialogComponent]
})
export class DinosaursDinosaurModule {}
