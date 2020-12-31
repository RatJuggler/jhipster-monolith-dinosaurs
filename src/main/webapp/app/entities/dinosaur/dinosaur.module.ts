import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DinosaursSharedModule } from 'app/shared/shared.module';
import { DinosaurComponent } from './dinosaur.component';
import { DinosaurDetailComponent } from './dinosaur-detail.component';
import { DinosaurUpdateComponent } from './dinosaur-update.component';
import { DinosaurDeleteDialogComponent } from './dinosaur-delete-dialog.component';
import { dinosaurRoute } from './dinosaur.route';

@NgModule({
  imports: [DinosaursSharedModule, RouterModule.forChild(dinosaurRoute)],
  declarations: [DinosaurComponent, DinosaurDetailComponent, DinosaurUpdateComponent, DinosaurDeleteDialogComponent],
  entryComponents: [DinosaurDeleteDialogComponent],
})
export class DinosaursDinosaurModule {}
