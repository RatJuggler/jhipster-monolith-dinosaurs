import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { DinosaurComponent } from './list/dinosaur.component';
import { DinosaurDetailComponent } from './detail/dinosaur-detail.component';
import { DinosaurUpdateComponent } from './update/dinosaur-update.component';
import { DinosaurDeleteDialogComponent } from './delete/dinosaur-delete-dialog.component';
import { DinosaurRoutingModule } from './route/dinosaur-routing.module';

@NgModule({
  imports: [SharedModule, DinosaurRoutingModule],
  declarations: [DinosaurComponent, DinosaurDetailComponent, DinosaurUpdateComponent, DinosaurDeleteDialogComponent],
  entryComponents: [DinosaurDeleteDialogComponent],
})
export class DinosaurModule {}
